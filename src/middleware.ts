import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/dashboard/:path*"],
};
