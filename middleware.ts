import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get("auth-token")
    const { pathname } = request.nextUrl

    // Protected routes
    const protectedRoutes = ["/dashboard", "/simulator"]
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

    // If trying to access a protected route without a token
    if (isProtectedRoute && !authToken) {
        const url = request.nextUrl.clone()
        url.pathname = "/"
        url.searchParams.set("login", "required") // Optional: To show login modal automatically
        return NextResponse.redirect(url)
    }

    // If already logged in and visiting home, maybe redirect to dashboard?
    // User asked: "if user log in then only show him the alll the other features"
    // But usually landing page is accessible. Let's keep landing page accessible.

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
