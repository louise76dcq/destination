"use client"

import { Button } from "@/components/ui/button"
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

interface DestinationResultProps {
    destination: Destination
    onAnother: () => void
}

export default function DestinationResult({ destination, onAnother }: DestinationResultProps) {
    return (
        <div className="w-full max-w-md bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-64 w-full">
                <img
                    src={destination.imageUrl || "/placeholder.svg?height=400&width=600"}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold">{destination.name}</h2>
                    <p className="text-sm text-gray-600">For: {destination.price} euros</p>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    {destination.environment === "sunny" ? <Sun className="h-6 w-6" /> : <Cloud className="h-6 w-6" />}
                    <span className="text-xl">{destination.temperature}°</span>
                </div>

                <p className="text-gray-700 mb-6">{destination.description}</p>

                <div className="flex justify-between">
                    <Button variant="outline" onClick={onAnother}>
                        Another?
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600">Book</Button>
                </div>
            </div>
        </div>
    )
}

