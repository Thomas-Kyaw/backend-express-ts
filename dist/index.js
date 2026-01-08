import express, {} from 'express';
import { connectDB, disconnectDB } from './config/db.js';
import { setupGracefulShutdown } from './utils/shutdown.js';
import dotenv from 'dotenv';
// Import Routes
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();
await connectDB();
const app = express();
// Body Parsing Middlewares
app.use(express.json());
// app.use(express.urlencoded({ extended: true }))
// API Routes
app.use('/movies', movieRoutes);
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
    res.json({ message: 'Konnichiwa from my backend server' });
});
// Start the Server
const port = process.env.PORT || 5001;
const server = app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
// Global Error Handling
setupGracefulShutdown(server);
//# sourceMappingURL=index.js.map