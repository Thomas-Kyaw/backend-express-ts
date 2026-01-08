import express, { type Router, type Request, type Response } from 'express'

import { createMovie, updateMovie } from '../controller/movieController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { movieSchema } from '../validators/movieValidators.js'

const router : Router = express.Router()

router.post('/', authMiddleware, validateRequest(movieSchema), createMovie)
router.put('/:id', authMiddleware, validateRequest(movieSchema), updateMovie)

export default router
