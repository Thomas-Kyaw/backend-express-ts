import express, { type Request, type Response } from 'express';
import { connectDB, disconnectDB } from './config/db.js';
import { setupGracefulShutdown } from './utils/shutdown.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Import Routes
import movieRoutes from "./routes/movieRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import watchlistRoutes from "./routes/watchlistRoutes.js"
import { errorMiddleware } from './middleware/errorMiddleware.js';

dotenv.config();
await connectDB();

const app = express();

// Body Parsing Middlewares
app.use(express.json())
app.use(cookieParser())
// app.use(express.urlencoded({ extended: true }))

// API Routes
app.use('/movies', movieRoutes)
app.use('/auth', authRoutes)
app.use('/watchlist', watchlistRoutes)

app.get('/', (req: Request, res: Response) => {
  res.json({message: 'Konnichiwa from my backend server'});
});

// Start the Server
const port = process.env.PORT || 5001;
const server = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// Global Error Handling
app.use(errorMiddleware);
setupGracefulShutdown(server);
