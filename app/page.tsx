"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DestinationResult from "@/components/destination-result"
import { Sun, Cloud } from "lucide-react"

interface Destination {
  id: number
  name: string
  price: number
  environment: string
  temperature: number
  description: string
  imageUrl: string
}

export default function Home() {
  const [environment, setEnvironment] = useState<string | null>(null)
  const [maxPrice, setMaxPrice] = useState<string>("750")
  const [destination, setDestination] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [detailedError, setDetailedError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!environment) {
      setError("Please select an environment (Sunny or Snowy)")
      return
    }

    setLoading(true)
    setError(null)
    setDetailedError(null)

    try {
      // Use direct API call to the C# backend
      const apiUrl = `/api/destination/random/filtered?environment=${environment}&maxPrice=${maxPrice}`
      console.log(`Calling API at: ${apiUrl}`)

      const response = await fetch(apiUrl)

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        console.error("API error response:", errorData)
        throw new Error(errorData?.error || `API responded with status: ${response.status}`)
      }

      const data = await response.json()
      console.log("API response data:", data)
      setDestination(data)
    } catch (err) {
      console.error("Error in handleSearch:", err)
      setError("Error fetching destination. Please try again.")

      // Provide more detailed error information for debugging
      if (err instanceof Error) {
        setDetailedError(`Details: ${err.message}`)
      }

      // For demo purposes, create a mock destination if API fails
      if (process.env.NODE_ENV === "development") {
        console.log("Creating mock destination for development")
        setDestination({
          id: 1,
          name: "Rio de Janeiro",
          price: 750,
          environment: environment || "sunny",
          temperature: 25,
          description:
              "Rio de Janeiro is a huge seaside city in Brazil, famed for its Copacabana and Ipanema beaches, 38m Christ the Redeemer statue atop Mount Corcovado and for Sugarloaf Mountain, a granite peak with cable cars to its summit.",
          imageUrl: "/placeholder.svg?height=400&width=600",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setDestination(null)
    setEnvironment(null)
  }

  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
        {!destination ? (
            <div className="w-full max-w-md space-y-8">
              <h1 className="text-3xl font-bold text-center">Where to?</h1>

              <div className="flex justify-center gap-4">
                <Button
                    variant={environment === "sunny" ? "default" : "outline"}
                    className="w-16 h-16 rounded-md"
                    onClick={() => setEnvironment("sunny")}
                >
                  <Sun className="h-8 w-8" />
                  <span className="sr-only">Sunny</span>
                </Button>

                <Button
                    variant={environment === "snowy" ? "default" : "outline"}
                    className="w-16 h-16 rounded-md"
                    onClick={() => setEnvironment("snowy")}
                >
                  <Cloud className="h-8 w-8" />
                  <span className="sr-only">Snowy</span>
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="text-center"

                />
                <Button onClick={handleSearch} disabled={loading}>
                  {loading ? "Searching..." : "Submit"}
                </Button>
              </div>

              {error && (
                  <div className="text-red-500 text-center">
                    <p>{error}</p>
                    {detailedError && <p className="text-xs mt-1">{detailedError}</p>}
                    <p className="text-xs mt-2">Make sure your C# API is running on http://localhost:5241</p>
                  </div>
              )}
            </div>
        ) : (
            <DestinationResult destination={destination} onAnother={handleReset} />
        )}
      </main>
  )
}

