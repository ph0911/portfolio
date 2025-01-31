import { auth } from "@/app/api/auth/[...nextauth]/route"; 

export default auth(async (req) => {
  try {
    const isAdmin = req.nextUrl.pathname.startsWith("/admin");
    const isLogin = req.nextUrl.pathname.startsWith("/admin/login");

    console.log("Middleware request:", req.nextUrl.pathname);

    if (isAdmin && !isLogin && !req.auth) {
      console.log("Unauthorized access attempt to admin area.");

      // Stelle sicher, dass die URL absolut ist
      const redirectUrl = new URL("/admin/login", req.nextUrl.origin);
      return Response.redirect(redirectUrl.toString(), 302);
    }

    return;
  } catch (error) {
    console.error("Middleware error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});

export const config = {
  matcher: ["/admin/:path*"], 
};