import bcrypt from "bcryptjs";
import {} from "express";
import { prisma } from "../config/db.js";
const register = async (req, res) => {
    const body = req.body;
    const { name, email, password } = req.body;
    // Check if user already exists
    const userExists = await prisma.user.findUnique({
        where: { email: email }
    });
    if (userExists) {
        return res.status(400).json({ "error": "User already exists with this email" });
    }
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create User
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    res.status(201).json({
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
    });
};
const login = async (req, res) => {
    const { email, password } = req.body;
    // Check if user already exists
    const user = await prisma.user.findUnique({
        where: { email: email }
    });
    if (!user) {
        return res.status(401).json({ "error": "Invalid email or password" });
    }
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ "error": "Invalid email or password" });
    }
};
export { register, login };
//# sourceMappingURL=authController.js.map