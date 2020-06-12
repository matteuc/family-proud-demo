import { Router } from 'express'

// Import Routes
import userRoutes from "./user.routes"

const router = Router()

// All API Routes
router.use('/users', userRoutes)

export default router;