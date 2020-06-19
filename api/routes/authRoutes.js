import express from 'express'
import authController from '../controllers/authController'
import { authenticateToken } from '../middleware/authenticateToken'

const authRoutes = express.Router()

authRoutes.post('/login', authController.login)

authRoutes.get('/me', authenticateToken, authController.me)

export default authRoutes
