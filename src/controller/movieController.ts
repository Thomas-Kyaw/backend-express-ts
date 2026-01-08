import { type Request, type Response } from "express";
import { prisma } from "../config/db.js";

const createMovie = async (req: Request, res: Response) => {
    const { title, overview, releaseYear, genres, runtime, posterUrl } = req.body;

    const movie = await prisma.movie.create({
        data: {
            title,
            overview,
            releaseYear,
            genres,
            runtime,
            posterUrl,
            createdBy: req.user!.id
        }
    });

    res.status(201).json({ data: { movie } });
}

const updateMovie = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, overview, releaseYear, genres, runtime, posterUrl } = req.body;

    const movie = await prisma.movie.update({
        where: { id },
        data: {
            title,
            overview,
            releaseYear,
            genres,
            runtime,
            posterUrl
        }
    });

    res.status(200).json({ data: { movie } });
}

export { createMovie, updateMovie };
