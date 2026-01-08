import type { NextFunction, Request, Response } from "express";
import { type ZodObject } from "zod";

export const validateRequest = (schema: ZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
        const errorMessages = result.error.issues.map((err) => err.message);
        return res.status(400).json({ errors: errorMessages });
        }

        next();
    };
};
