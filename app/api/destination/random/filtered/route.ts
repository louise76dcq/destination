import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const environment = searchParams.get("environment")
    const maxPrice = searchParams.get("maxPrice")

    // Log the request parameters for debugging
    console.log(`Fetching destination with environment: ${environment}, maxPrice: ${maxPrice}`)

    try {
        // Use the API URL from your appsettings.json
        const apiUrl = `http://localhost:5241/api/destination/random/filtered?environment=${environment}&maxPrice=${maxPrice}`
        console.log(`Calling API at: ${apiUrl}`)

        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            // Add a timeout to prevent hanging requests
            signal: AbortSignal.timeout(10000), // 10 second timeout
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error(`API responded with status: ${response.status}, message: ${errorText}`)
            throw new Error(`API responded with status: ${response.status}`)
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error fetching from C# API:", error)

        // Return a more detailed error response
        return NextResponse.json(
            {
                error: "Failed to fetch from API",
                details: error instanceof Error ? error.message : "Unknown error",
                tip: "Make sure your C# API is running on http://localhost:5241",
            },
            { status: 500 },
        )
    }
}

