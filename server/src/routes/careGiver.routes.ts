import { Router } from 'express'
import * as CareGiverController from '../controllers/careGiver.controller'

const router = Router();

// GET Routes
router.get('/', CareGiverController.getHandler)
router.get('/:id', CareGiverController.getHandler)


// POST Routes
router.post('/', CareGiverController.postHandler)

// PUT Routes
router.put('/:id', CareGiverController.putHandler)

// DELETE Routes
router.delete('/:id', CareGiverController.deleteHandler)

export default router