import prisma from '../libs/prismadb';
import getSession from './getSession';

const getUsers = async () => {
    const session = await getSession();
    if(!session?.user?.email) {
        return [];
    }
    

    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            where: {
                NOT: { email: session.user.email as string}
            }
        });
        
        if(!users) {
            return null;
        }
        return users;
    }
    catch (err) {
        return [];
    }
};

export default getUsers;