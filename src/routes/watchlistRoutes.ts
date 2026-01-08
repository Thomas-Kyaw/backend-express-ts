import express, { type Router, type Request, type Response } from 'express'
import { addToWatchList } from '../controller/watchlistController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router : Router = express.Router()

router.use(authMiddleware)

router.post("/", addToWatchList)

export default router
