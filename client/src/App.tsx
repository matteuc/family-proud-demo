import React from 'react';
import './App.css';
import API from './services/api';
import { List, ListSubheader, ListItem, ListItemIcon, ListItemText, Typography, Slide, Dialog, AppBar, Toolbar, IconButton, Button, Card, TextField, Checkbox } from "@material-ui/core"
import { TransitionProps } from '@material-ui/core/transitions';
import { AssignmentInd as CareReceiverIcon, SupervisedUserCircle as CareGiverIcon, Close as CloseIcon, DeleteOutlined } from "@material-ui/icons";
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles"
import { SpeedDialIcon, SpeedDialAction, SpeedDial } from "@material-ui/lab"
import { useSnackbar } from 'notistack';
import GithubCorner from 'react-github-corner';

import { TCareGiver, TCareReceiver, UpsertEntity, ActionType, SpeedDialActions } from './global/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexChild: {
      margin: "auto",
      color: "grey"
    },
    flexParent: {
      display: "flex",
      margin: theme.spacing(2),
    },
    iconContainer: {
      padding: theme.spacing(2),
      display: "block"
    },
    speedDial: {
      position: 'absolute',
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(5),
        right: theme.spacing(5),
      }
    },
    appBar: {
      position: 'relative',
      backgroundColor: "#003a77"
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    card: {
      margin: `${theme.spacing(5)}px 0`
    },
    root: {
      padding: "4rem 0",
      backgroundColor: theme.palette.background.default,
      height: "fit-content",
      minHeight: "calc(100vh - 8rem)",
      display: "flex"
    },
    content: {
      margin: "0 auto",
      width: "90%",
      maxWidth: "800px"
    },
    speedDialFab: {
      backgroundColor: "#003a77"
    },
    textField: {
      margin: `${theme.spacing(3)}px 0`
    },
    deleteBtn: {
      width: "100%",
      margin: `${theme.spacing(3)}px 0`,
      color: "white",
      backgroundColor: theme.palette.error.main,
      "&:hover": {
        backgroundColor: theme.palette.error.dark,

      }
    },
  }));

const NoResultsBlock: React.FC<{
  message: string,
  icon: React.ReactElement
}> = ({ message, icon }) => {

  const classes = useStyles();

  return (
    <div className={classes.flexParent}>
      <div className={classes.flexChild}>
        <Typography>
          {message}
        </Typography>
        <div className={classes.flexParent}>
          <div className={classes.flexChild}>
            <span className={classes.iconContainer}>
              {icon}

            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

const initialForm = {
  firstName: "",
  lastName: "",
  entityIds: [] as string[]
}
type FormData = typeof initialForm;

const initialErrors = {
  firstName: "",
  lastName: ""
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpsertDialogContent: React.FC<{
  open: boolean,
  onClose: Function,
  onSubmit: (action: ActionType, entity: UpsertEntity, form: FormData, id?: string) => void,
  onDelete: (entity: UpsertEntity, id: string) => void,
  action: ActionType,
  entity: UpsertEntity,
  id: string,
  givers: Array<TCareGiver>,
  receivers: Array<TCareReceiver>
}> = ({
  onClose,
  action,
  entity,
  id,
  onSubmit,
  onDelete,
  givers,
  receivers
}) => {

    const theme = useTheme();
    const classes = useStyles();

    const [form, setForm] = React.useState<FormData>(initialForm)

    // Form errors
    const [errors, setErrors] = React.useState<typeof initialErrors>(initialErrors)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, data: FormData) => {
      const { name, value } = e.target;

      if (name === "firstName" || name === "lastName") {
        data[name] = value;
        errors[name] = ""
        setForm({ ...data })
      }

    }

    const handleSubmit = (action: ActionType, entity: UpsertEntity, form: FormData, id: string) => {

      const validate = (form: FormData): boolean => {
        const newErrors = initialErrors;
        let errors = 0

        if (!form.firstName.length) {
          newErrors.firstName = "Please enter a first name";
          errors++
        }

        if (!form.lastName.length) {
          newErrors.lastName = "Please enter a last name";
          errors++
        }

        setErrors({ ...newErrors })

        if (errors) return false
        else return true

      }

      if (validate(form)) onSubmit(action, entity, form, id)
    }

    const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>, id: string, data: FormData) => {

      const { checked } = e.target;

      console.log(checked)
      if (!checked) {
        const idx = data.entityIds.indexOf(id);
        if (idx !== -1) data.entityIds.splice(idx, 1)
      }
      else data.entityIds.push(id)

      setForm({ ...data })
    }

    React.useEffect(() => {
      let currentEntity, entityIds

      if (UpsertEntity.CareGiver === entity) {
        currentEntity = givers.find((g) => g._id === id)
        entityIds = currentEntity?.receivers || []
      }
      else {
        currentEntity = receivers.find((g) => g._id === id)
        entityIds = currentEntity?.givers || []
      }

      const data = currentEntity ? { firstName: currentEntity.firstName, lastName: currentEntity.lastName, entityIds } : initialForm

      setForm({ ...data })
    }, [])

    return (
      <>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onClose ? () => onClose() : undefined} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h6"
              className={classes.title}
            >
              {action} {entity}
            </Typography>
            <Button color="inherit" onClick={
              () => handleSubmit(action, entity, form, id)
            }>
              {action}
            </Button>
          </Toolbar>
        </AppBar>

        <div className={classes.flexParent} style={{ padding: theme.spacing(3) }}>
          <div className={classes.content} >

            <TextField
              className={classes.textField}
              fullWidth
              autoComplete={"off"}
              label="First Name"
              name="firstName"
              onChange={(e) => handleInputChange(e, form)}
              value={form.firstName}
              error={Boolean(errors.firstName.length)}
              helperText={errors.firstName}
            />

            <TextField
              className={classes.textField}
              fullWidth
              autoComplete={"off"}
              label="Last Name"
              name="lastName"
              onChange={(e) => handleInputChange(e, form)}
              value={form.lastName}
              error={Boolean(errors.lastName.length)}
              helperText={errors.lastName}
            />
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  {entity === UpsertEntity.CareReceiver ? "Care Givers" : "Care Receivers"}
                </ListSubheader>
              }
            >

              {
                entity === UpsertEntity.CareReceiver ?
                  <>
                    {
                      givers.length ?
                        givers.map((g, idx) => (
                          <ListItem
                            key={g._id + idx}
                            onClick={() => { }}
                          >
                            <ListItemIcon>
                              <CareGiverIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={`${g.firstName} ${g.lastName}`}
                              secondary={`${g.receivers.length} receivers`}
                            />
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                color="default"
                                checked={form.entityIds.includes(g._id)}
                                onChange={(e) => handleCheckChange(e, g._id, form)}
                                tabIndex={-1}
                                disableRipple
                              />
                            </ListItemIcon>
                          </ListItem>

                        ))
                        :
                        <NoResultsBlock
                          icon={<CareGiverIcon style={{ fontSize: "xxx-large" }} />} message={"No Care Givers Found"}
                        />

                    }
                  </>

                  :

                  <>
                    {
                      receivers.length ?
                        receivers.map((r, idx) => (
                          <ListItem
                            key={r._id + idx}
                            onClick={() => { }}
                          >
                            <ListItemIcon>
                              <CareReceiverIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={`${r.firstName} ${r.lastName}`}
                              secondary={`${r.givers.length} givers`}
                            />
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={form.entityIds.includes(r._id)}
                                tabIndex={-1}
                                disableRipple
                                onChange={(e) => handleCheckChange(e, r._id, form)}
                                color="default"
                              />
                            </ListItemIcon>
                          </ListItem>

                        ))
                        :
                        <NoResultsBlock
                          icon={<CareGiverIcon style={{ fontSize: "xxx-large" }} />} message={"No Care Receivers Found"}
                        />

                    }
                  </>
              }

            </List>

            {
              action !== ActionType.Create ?
                <Button
                  className={
                    classes.deleteBtn
                  }
                  color="default"
                  onClick={() => onDelete(entity, id)}
                >
                  Delete&nbsp;<DeleteOutlined fontSize="small" />
                </Button>

                : ""
            }

          </div>
        </div>

      </>
    )

  }

const MemoDialogContent = React.memo(UpsertDialogContent, (p, n) => {
  if (p.open === n.open) return true
  return false
})

const App: React.FC = () => {
  // Instantiate instances of both APIs
  const cgApi = API.CareGiver();
  const crApi = API.CareReceiver();

  // Stores all caregiver entities
  const [givers, setGivers] = React.useState<Array<TCareGiver>>([])

  // Stores all care receiver entities
  const [receivers, setReceivers] = React.useState<Array<TCareReceiver>>([])

  // Indicates if speed dial is open
  const [dialOpen, setDialOpen] = React.useState(false);

  // Indicates if upsert dialog is open
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // Current upsert entity
  const [currentEntity, setCurrentEntity] = React.useState<UpsertEntity>(UpsertEntity.CareReceiver)

  // Current entity ID
  const [currentId, setCurrentId] = React.useState<string>("")

  // Current action type
  const [currentAction, setCurrentAction] = React.useState<ActionType>(ActionType.Create)

  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  // Handles the error of an API call 
  const handleError = (
    ad: string, // Action Description
  ) => {

    enqueueSnackbar(ad, {
      autoHideDuration: 3000,
      variant: "error"
    })

  }

  const handleSuccess = (
    ad: string, // Action Description
  ) => {

    enqueueSnackbar(ad, {
      autoHideDuration: 3000,
      variant: "success"
    })

  }

  // Opens the update modal when an entity is clicked
  const openUpsertDialog = (
    ue: UpsertEntity, // Entity that is getting upserted
    ut: ActionType, // Action Type
    id: string = "" // ID of the entity
  ) => {
    setDialOpen(false)
    setCurrentEntity(ue)
    setCurrentAction(ut)
    setCurrentId(id);

    setDialogOpen(true)
  }

  // Handles closing the update modal
  const closeUpsertDialog = () => {
    setDialogOpen(false);
  }

  // Return the corresponding action for the upsert dialog
  const handleSubmit = async (
    ut: ActionType, // Action Type
    ue: UpsertEntity, // Entity that is getting upserted
    data: FormData, // Form data
    id: string = ""
  ) => {

    if (ue !== UpsertEntity.CareGiver && ue !== UpsertEntity.CareReceiver) return;

    let f: Function;

    const { firstName, lastName, entityIds } = data;

    const cgPayload = {
      firstName,
      lastName,
      receivers: entityIds
    }

    const crPayload = {
      firstName,
      lastName,
      givers: entityIds
    }

    if (ut === ActionType.Create && ue === UpsertEntity.CareGiver)
      f = async () => {
        return await cgApi.create(cgPayload)
      }

    else if (ut === ActionType.Create && ue === UpsertEntity.CareReceiver)
      f = async () => {
        return await crApi.create(crPayload)
      }

    else if (ut === ActionType.Update && ue === UpsertEntity.CareGiver)
      f = async () => {
        return await cgApi.update(id, cgPayload)
      }

    else if (ut === ActionType.Update && ue === UpsertEntity.CareReceiver)
      f = async () => {
        return await crApi.update(id, crPayload)
      }
    else f = async () => { }

    closeUpsertDialog()

    const res = await f()

    if (!res) {
      handleError(`An error occurred when trying to ${ut.toLowerCase()} the ${ue}`)
      return;
    } else {
      handleSuccess(`The ${ue.toLowerCase()} was successfully ${ut.toLowerCase()}d`)
      reload()
    }

  }

  const handleDelete = async (
    ue: UpsertEntity, // Entity that is getting upserted
    id: string = ""
  ) => {

    closeUpsertDialog()

    let f: Function;

    if (ue === UpsertEntity.CareGiver) f = cgApi.delete
    else f = crApi.delete

    const res = await f(id)

    if (!res) {
      handleError(`An error occurred when trying to delete the ${ue}`)
    } else {
      handleSuccess(`The ${ue.toLowerCase()} was successfully deleted`)
      reload()
    }

  }

  // Speed Dial Actions
  const actions: Array<SpeedDialActions> = [
    {
      icon: <CareReceiverIcon />,
      name: 'Add a New Care Receiver',
      onClick: () => openUpsertDialog(UpsertEntity.CareReceiver, ActionType.Create)
    },
    {
      icon: <CareGiverIcon />,
      name: 'Add a New Care Giver',
      onClick: () => openUpsertDialog(UpsertEntity.CareGiver, ActionType.Create)
    }
  ];

  const fetch = async () => {
    const gData = await cgApi.getAll();

    if (!gData) handleError("An error occurred when retrieving care givers")
    else {
      handleSuccess("Care givers successfully retrieved!")
      setGivers(gData)
    }

    const rData = await crApi.getAll();

    if (!rData) handleError("An error occurred when retrieving care receivers")
    else {
      handleSuccess("Care receivers successfully retrieved!")
      setReceivers(rData)
    }


  }

  const reload = async () => {
    const gData = await cgApi.getAll();

    if (!gData) handleError("An error occurred when retrieving care givers")
    else {
      setGivers(gData)
    }

    const rData = await crApi.getAll();

    if (!rData) handleError("An error occurred when retrieving care receivers")
    else {
      setReceivers(rData)
    }


  }

  React.useEffect(() => {

    fetch()

  }, [])

  return (
    <div className={classes.root}>
      <GithubCorner bannerColor="#003a77" href="https://github.com/matteuc/family-proud-demo"/>
      
      <div className={classes.content}>
        {/* Care Givers Card */}
        <Card elevation={5} className={classes.card}>
          <List
            component="nav"
            subheader={
              <ListSubheader component="div">
                Care Givers
              </ListSubheader>
            }
          >
            {
              givers.length ?
                givers.map((g, idx) => (
                  <ListItem
                    key={g._id + idx}
                    button
                    onClick={() => openUpsertDialog(UpsertEntity.CareGiver, ActionType.Update, g._id)}
                  >
                    <ListItemIcon>
                      <CareGiverIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${g.firstName} ${g.lastName}`}
                      secondary={`${g.receivers.length} receivers`}
                    />
                  </ListItem>

                ))
                :
                <NoResultsBlock
                  icon={<CareGiverIcon style={{ fontSize: "xxx-large" }} />} message={"No Care Givers Found"}
                />

            }

          </List>
        </Card>

        {/* Care Receivers Card */}
        <Card elevation={5} className={classes.card}>
          <List
            component="nav"
            subheader={
              <ListSubheader component="div">
                Care Receivers
        </ListSubheader>
            }
          >
            {
              receivers.length ?
                receivers.map((r, idx) => (
                  <ListItem
                    key={r._id + idx}
                    button
                    onClick={() => openUpsertDialog(UpsertEntity.CareReceiver, ActionType.Update, r._id)}
                  >
                    <ListItemIcon>
                      <CareReceiverIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${r.firstName} ${r.lastName}`}
                      secondary={`${r.givers.length} givers`}

                    />
                  </ListItem>

                ))
                :
                <NoResultsBlock
                  icon={<CareReceiverIcon style={{ fontSize: "xxx-large" }} />} message={"No Care Receivers Found"}
                />
            }

          </List>
        </Card>

        {/* Create Entity Speed Dial */}
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          classes={{ fab: classes.speedDialFab }}
          onClose={() => setDialOpen(false)}
          onOpen={() => setDialOpen(true)}
          open={dialOpen}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick}
            />
          ))}
        </SpeedDial>

        <Dialog
          fullScreen
          open={dialogOpen}
          onClose={closeUpsertDialog}
          TransitionComponent={Transition}
        >
          {/* Upsert Dialog */}
          <MemoDialogContent
            onClose={closeUpsertDialog}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            open={dialogOpen}
            action={currentAction}
            entity={currentEntity}
            id={currentId}
            givers={givers}
            receivers={receivers}
          />
        </Dialog>
      </div>

    </div >
  );
}

export default App;
