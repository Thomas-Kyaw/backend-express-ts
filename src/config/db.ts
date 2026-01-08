import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const connectDB = async () => {
    try {
        await prisma.$connect()
        await prisma.$queryRaw`SELECT 1`;
        console.log("DB connected successfully");
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Database connection error: ${error.message}`);
        } else {
            console.error("Database connection error:", error);
        }
        process.exit(1);
    }
}

const disconnectDB = async () => {
    await prisma.$disconnect();
}

export {prisma, connectDB, disconnectDB}
