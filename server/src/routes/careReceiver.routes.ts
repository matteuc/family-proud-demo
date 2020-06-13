import { Router } from 'express'
import * as CareReceiverController from '../controllers/careReceiver.controller'

const router = Router();

// GET Routes
router.get('/', CareReceiverController.getHandler)
router.get('/:id', CareReceiverController.getHandler)


// POST Routes
router.post('/', CareReceiverController.postHandler)

// PUT Routes
router.put('/', CareReceiverController.putHandler)
router.put('/:id', CareReceiverController.putHandler)

// DELETE Routes
router.delete('/', CareReceiverController.deleteHandler)
router.delete('/:id', CareReceiverController.deleteHandler)

export default router