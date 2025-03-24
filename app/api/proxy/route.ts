import { type NextRequest, NextResponse } from "next/server"

// This is a proxy to avoid CORS issues when calling your C# API
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const url = searchParams.toString()

    try {
        const response = await fetch(`http://localhost:5241/api/destination/random/filtered?${url}`)
        const data = await response.json()

        return NextResponse.json(data)
    } catch (error) {
        console.error("Error proxying to C# API:", error)
        return NextResponse.json({ error: "Failed to fetch from API" }, { status: 500 })
    }
}

