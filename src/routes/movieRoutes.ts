import express, { type Router, type Request, type Response } from 'express'

const router : Router = express.Router()

router.get('/', (req: Request, res: Response) => {
    res.json()
})

export default router
