import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUser } from "react-icons/hi2";

import { signOut } from "next-auth/react";
import useConversation from "./useConversation";



const useRoutes = () => {
    const pathName = usePathname();
    const { conversationId } = useConversation();
    const routes = useMemo(() => [
        {
            label: "Char",
            href: "/conversations",
            icon: HiChat,
            active: pathName === "/conversations" || !!conversationId
        },
        {
            label: "Users",
            href: "/users",
            icon: HiUser,
            active: pathName === "/users"
        },
        {
            label: "Logout",
            href: "#",
            onClick: () => {signOut()},
            icon: HiArrowLeftOnRectangle
        }
    ], [pathName, conversationId]);

    return routes;
}

export default useRoutes;

