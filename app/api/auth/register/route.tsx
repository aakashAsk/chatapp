import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST (request: Request) {
    try {
        let body = await request.json();
        let { email, password, name } = body;

        if(!email || !password || !name) {
            return new NextResponse('Missing Infor', { status: 404 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
           data: { email, name, hashedPassword}
        });

        return NextResponse.json(user);
    }
    catch (err: any) {
        return new NextResponse("Inter Server Error", { status:500});
    }
}