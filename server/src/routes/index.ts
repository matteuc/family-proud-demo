import { Router } from 'express'

// Import Routes
import careGiverRoutes from "./careGiver.routes"
import careReceiverRoutes from "./careReceiver.routes"

const router = Router()

// All API Routes
router.use('/care-giver', careGiverRoutes)

router.use('/care-receiver', careReceiverRoutes)

export default router;