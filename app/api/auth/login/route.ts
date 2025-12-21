import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const body = await request.json()
    const { email, password } = body

    // Mock validation - accept any valid email with password "demo"
    // or just general "demo" / "demo"
    if (email && password) {
        // In a real app, verify credentials here

        // Create the response
        const response = NextResponse.json(
            { success: true, user: { email, name: "Dr. User" } },
            { status: 200 }
        )

        // Set a mock session cookie
        // Expire in 1 day
        const oneDay = 24 * 60 * 60 * 1000
        response.cookies.set("auth-token", "mock-jwt-token-" + Date.now(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: oneDay,
            path: "/",
        })

        return response
    }

    return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
    )
}
