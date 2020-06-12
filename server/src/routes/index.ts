import { Router } from 'express'

// Import Routes
import userRoutes from "./careGiver.routes"

const router = Router()

// All API Routes
router.use('/users', userRoutes)

export default router;