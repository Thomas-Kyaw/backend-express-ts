import express, { type Router, type Request, type Response } from 'express'
import { addToWatchList, removeMovieFromWatchList, updateWatchlistItem } from '../controller/watchlistController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router : Router = express.Router()

router.use(authMiddleware)

router.post("/", addToWatchList)
router.delete("/movie/:movieId", removeMovieFromWatchList)
router.put("/movie/:movieId", updateWatchlistItem)

export default router
