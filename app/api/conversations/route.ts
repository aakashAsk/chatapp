import getCurrentUser from "../../actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '../../libs/prismadb';
import { connect } from "http2";
import { equal } from "assert";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    try {
        const { userId, isGroup, members, name } = body;
        if(isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse("Invalid data", {status: 400});
        }

        if(isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name, isGroup, users: {
                        connect: [
                            ...members.map((member: {value: string}) => {
                                id: member.value
                            }),
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                include : {
                    user: true
                }
            });
            return NextResponse.json(newConversation);
        }

        const existingConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.id]
                        }
                    }
                ]
            }
        });

        const singleConversation = existingConversations[0];
        if(singleConversation) {
            return NextResponse.json(singleConversation);
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        });
        return NextResponse.json(newConversation);

    }
    catch(error) {
        return new NextResponse("Internal Server Error", {status: 500});
    }
}