import React from 'react';
import './App.css';
import API from './services/api';
import { List, ListSubheader, ListItem, ListItemIcon, ListItemText, Typography, Slide, Dialog, AppBar, Toolbar, IconButton, Button, Divider, Card, TextField, Checkbox } from "@material-ui/core"
import { TransitionProps } from '@material-ui/core/transitions';

import { AssignmentInd as CareReceiverIcon, SupervisedUserCircle as CareGiverIcon, Close as CloseIcon, DeleteOutlineOutlined, DeleteForeverOutlined, DeleteOutlined } from "@material-ui/icons";
import { makeStyles, Theme, createStyles, useTheme } from "@material-ui/core/styles"
import { SpeedDialIcon, SpeedDialAction, SpeedDial, Alert } from "@material-ui/lab"

import { TCareGiver, TCareReceiver, UpsertEntity, UpsertType, SpeedDialActions, APIResult } from './global/types';

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
      backgroundColor: theme.palette.background.default,
      height: "fit-content",
      minHeight: "100vh",
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
    }
  }),
);

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
  const [currentAction, setCurrentAction] = React.useState<UpsertType>(UpsertType.Create)

  // Holds all current API results
  const [results, setResults] = React.useState<Array<APIResult>>([])

  // Indicates if the upsert form is complete
  const [complete, setComplete] = React.useState(false)

  const classes = useStyles();
  const theme = useTheme();

  // Handles the error of an API call 
  const handleError = (
    ad: string, // Action Description
  ) => {

    results.push({
      id: (new Date()).toDateString(),
      message: ad
    })

    setResults([...results])

  }

  // Handles removing an error from the results list
  const removeError = (
    id: string, // Action ID
  ) => {
    setResults([...results.filter((r) => r.id !== id)])

  }

  // Opens the update modal when an entity is clicked
  const openUpsertDialog = (
    ue: UpsertEntity, // Entity that is getting upserted
    ut: UpsertType, // Action Type
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
  const getAction = (
    ut: UpsertType, // Action Type
    ue: UpsertEntity, // Entity that is getting upserted
  ) => {



  }

  // Speed Dial Actions
  const actions: Array<SpeedDialActions> = [
    {
      icon: <CareReceiverIcon />,
      name: 'Add a New Care Receiver',
      onClick: () => openUpsertDialog(UpsertEntity.CareReceiver, UpsertType.Create)
    },
    {
      icon: <CareGiverIcon />,
      name: 'Add a New Care Giver',
      onClick: () => openUpsertDialog(UpsertEntity.CareGiver, UpsertType.Create)
    }
  ];

  React.useEffect(() => {
    const fetch = async () => {
      const gData = await cgApi.getAll();

      if (!gData) handleError("An error occurred when retrieving care givers")
      else setGivers(gData)

      const rData = await crApi.getAll();

      if (!rData) handleError("An error occurred when retrieving care receivers")
      else setReceivers(rData)


    }

    fetch()
  }, [])

  const NoResultsBlock: React.FC<{
    message: string,
    icon: React.ReactElement
  }> = ({ message, icon }) => (
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

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <div className={classes.root}>
      <div className={classes.content}>

        {
          results.map((r) => (
            <Alert
              onClose={() => removeError(r.id)}
              style={{ margin: "1rem 0" }}
              key={r.id}
              severity="error"
            >
              {r.message}
            </Alert>
          ))
        }

        <Card elevation={5} className={classes.card}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
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
                    onClick={() => openUpsertDialog(UpsertEntity.CareGiver, UpsertType.Update, g._id)}
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

        <Card elevation={5} className={classes.card}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
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
                    onClick={() => openUpsertDialog(UpsertEntity.CareReceiver, UpsertType.Update, r._id)}
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
          style={{
            // Fix strange overlay issue with MUI dialogs
            display: !dialogOpen ? "none" : ""
          }}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={closeUpsertDialog} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography
                variant="h6"
                className={classes.title}
              >
                {currentAction} {currentEntity}
              </Typography>
              <Button color="inherit" onClick={
                complete ?
                  () => getAction(currentAction, currentEntity)
                  : () => { }
              }>
                {currentAction}
              </Button>
            </Toolbar>
          </AppBar>

          <div className={classes.flexParent} style={{ padding: theme.spacing(3) }}>
            <div className={classes.content} >

              <TextField
                className={classes.textField}
                fullWidth
                label="First Name"
                defaultValue="foo"
              />

              <TextField
                className={classes.textField}
                fullWidth
                label="Last Name"
                defaultValue="foo"
              />
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    {currentEntity === UpsertEntity.CareReceiver ?"Care Givers" : "Care Receivers"}
              </ListSubheader>
                }
              >

                {
                  currentEntity === UpsertEntity.CareReceiver ?
                    <>
                      {
                        givers.length ?
                          givers.map((g, idx) => (
                            <ListItem
                              button
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
                                  checked={g.receivers.includes(currentId)}
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
                                  checked={r.givers.includes(currentId)}
                                  tabIndex={-1}
                                  disableRipple
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

              <Button
                style={{ 
                  width: "100%", 
                  margin: `${theme.spacing(3)}px 0`,
                  color: "white",
                  backgroundColor: "#909090" 
                
                }}
                color="default"
                onClick={() => console.log(currentId)}
              >
                <DeleteOutlined /> Delete
              </Button>

            </div>
          </div>

        </Dialog>
      </div>

    </div>
  );
}

export default App;
