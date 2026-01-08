import type { Response } from "express";
import jwt, { type SignOptions } from "jsonwebtoken";

export const generateToken = (userId: string, res: Response) => {
    const payload = {id: userId};
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET environment variable is not defined");
    }
    const token = jwt.sign(
        payload,
        jwtSecret,
        // Cast to Exclude undefined because 'exactOptionalPropertyTypes' is true in tsconfig.
        // This tells TS that the value is definitely a string/number and not undefined.
        { expiresIn: (process.env.JWT_EXPIRES_IN || "1d") as Exclude<SignOptions['expiresIn'], undefined> }
    )

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: (1000 * 60 * 60 * 24) * 1
    })
    return token
}
