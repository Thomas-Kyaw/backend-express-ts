import express, { type Router, type Request, type Response } from 'express'
import { addToWatchList, removeMovieFromWatchList, updateWatchlistItem } from '../controller/watchlistController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { addToWatchListSchema, updateWatchListSchema } from '../validators/watchlistValidators.js'

const router : Router = express.Router()

router.use(authMiddleware)

router.post("/", validateRequest(addToWatchListSchema), addToWatchList)
router.delete("/movie/:movieId", removeMovieFromWatchList)
router.put("/movie/:movieId", validateRequest(updateWatchListSchema), updateWatchlistItem)

export default router
