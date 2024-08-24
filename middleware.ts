import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: '/'
    }
});

export const config = {
    matcher: [
        "/users/:path*",
        "/conversations/:path*"
    ]
}; // this will protect all the nested routes inside users/*** 