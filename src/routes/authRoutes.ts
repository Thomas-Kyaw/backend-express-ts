import express, { type Router, type Request, type Response } from 'express'
import { login, logout, register } from '../controller/authController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router : Router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", authMiddleware, logout)

export default router
