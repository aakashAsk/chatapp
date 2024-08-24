import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

const client = globalThis.prisms || new PrismaClient();
if(process.env.NODE_ENV !== 'production') globalThis.prisms = client;

export default client;