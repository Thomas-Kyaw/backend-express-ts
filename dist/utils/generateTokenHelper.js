import jwt, {} from "jsonwebtoken";
export const generateToken = (userId) => {
    const payload = { id: userId };
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET environment variable is not defined");
    }
    const token = jwt.sign(payload, jwtSecret, { expiresIn: (process.env.JWT_EXPIRES_IN || "1d") });
    return token;
};
//# sourceMappingURL=generateTokenHelper.js.map