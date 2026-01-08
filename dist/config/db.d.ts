import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
declare const prisma: PrismaClient<{
    adapter: PrismaPg;
}, never, import("@prisma/client/runtime/client").DefaultArgs>;
declare const connectDB: () => Promise<void>;
declare const disconnectDB: () => Promise<void>;
export { prisma, connectDB, disconnectDB };
//# sourceMappingURL=db.d.ts.map