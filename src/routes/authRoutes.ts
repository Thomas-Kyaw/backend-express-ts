import express, { type Router, type Request, type Response } from 'express'
import { login, logout, register } from '../controller/authController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { registerSchema, loginSchema } from '../validators/authValidators.js'

const router : Router = express.Router()

router.post("/register", validateRequest(registerSchema), register)
router.post("/login", validateRequest(loginSchema), login)
router.post("/logout", authMiddleware, logout)

export default router
