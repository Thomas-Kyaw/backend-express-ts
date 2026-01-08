import bcrypt from "bcryptjs";
import { type Request, type Response } from "express";
import { prisma } from "../config/db.js";
import { generateToken } from "../utils/generateTokenHelper.js";

const addToWatchList = async (req: Request, res: Response) => {
    const { movieId, status, rating, notes } = req.body

    // Verify movies exist
    const movie = await prisma.movie.findUnique({
        where: { id: movieId }
    })

    if (!movie) {
        return res.status(404).json({error: "Movie not found"})
    }

    // Check if already added
    const existingInWatchList = await prisma.watchlistItem.findUnique({
        where: { userId_movieId: {
            userId: req.user!.id, // Trust me, this exists
            movieId: movieId
        }}
    })

    if (existingInWatchList) {
        return res.status(400).json({error: "Movie already in watchlist"})
    }

    const watchlistItem = await prisma.watchlistItem.create({
        data: {
            userId: req.user!.id,
            movieId,
            status: status || "PLANNED",
            rating,
            notes
        }
    })

    res.status(200).json({
        data: {
            watchlistItem
        }
    })
}

const removeMovieFromWatchList = async (req: Request, res: Response) => {
    const { movieId } = req.params;

    if (!movieId) {
        return res.status(400).json({ error: "Movie ID is required" });
    }

    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    await prisma.watchlistItem.delete({
        where: {
            userId_movieId: {
                userId: req.user.id,
                movieId: movieId
            }
        }
    });

    res.status(200).json({ message: "Movie removed from watchlist" });
}

const updateWatchlistItem = async (req: Request, res: Response) => {
    const { movieId } = req.params;
    const { status, rating, notes } = req.body;

    if (!movieId) {
        return res.status(400).json({ error: "Movie ID is required" });
    }

    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    const watchlistItem = await prisma.watchlistItem.update({
        where: {
            userId_movieId: {
                userId: req.user.id,
                movieId: movieId
            }
        },
        data: {
            status,
            rating,
            notes
        }
    });

    res.status(200).json({ data: { watchlistItem } });
}

export { addToWatchList, removeMovieFromWatchList, updateWatchlistItem }
