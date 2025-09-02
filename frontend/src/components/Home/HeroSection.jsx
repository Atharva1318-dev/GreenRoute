import { useState } from "react"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
    MapPin,
    Car,
    Bike,
    Footprints,
    Navigation,
    ArrowRight,
} from "lucide-react"

function HeroSection() {
    const [fromLocation, setFromLocation] = useState("")
    const [toLocation, setToLocation] = useState("")
    const [selectedMode, setSelectedMode] = useState("car")

    const transportModes = [
        { id: "car", icon: Car, label: "Car" },
        { id: "bike", icon: Bike, label: "Bike" },
        { id: "walk", icon: Footprints, label: "Walk" },
    ]

    return (
        < section className="relative min-h-screen flex justify-center bg-gradient-to-br from-green-50/90 to-emerald-50/90 overflow-hidden py-4" >
            {/* Background Map */}
            < div className="absolute inset-0 z-0" >
                <img
                    src="/Firefly_An isometric illustration of a sustainable smart city with roads, EVs, greenery, sola 530595.jpg?height=1080&width=1920"
                    alt="Interactive map background"
                    fill
                    className="object-cover opacity-50"
                />
            </div >

            {/* Hero Content */}
            <div className="relative z-10 container mx-auto px-4 mt-24 text-center">
                <div className="max-w-4xl mx-auto">
                    <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
                        🌱 Sustainable Travel Made Simple
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-2">
                        Plan Your <span className="text-green-600">Greener</span> Route
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-2 max-w-2xl mx-auto">
                        Compare fastest vs. eco-friendly routes and see your CO₂ savings in real-time
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="md" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                            Get Started
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Link to="/auth">
                            <Button
                                size="md"
                                variant="outline"
                                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 bg-transparent"
                            >
                                Sign Up / Log In
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quick Route Input Overlay */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-2 z-20">
                <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    placeholder="From"
                                    value={fromLocation}
                                    onChange={(e) => setFromLocation(e.target.value)}
                                    className="pl-10 h-12"
                                />
                            </div>
                            <div className="relative">
                                <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    placeholder="To"
                                    value={toLocation}
                                    onChange={(e) => setToLocation(e.target.value)}
                                    className="pl-10 h-10"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center gap-2 mb-4">
                            {transportModes.map((mode) => (
                                <Button
                                    key={mode.id}
                                    variant={selectedMode === mode.id ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedMode(mode.id)}
                                    className={selectedMode === mode.id ? "bg-green-600 hover:bg-green-700" : ""}
                                >
                                    <mode.icon className="h-4 w-4 mr-2" />
                                    {mode.label}
                                </Button>
                            ))}
                        </div>
                        <Button className="w-full bg-green-600 hover:bg-green-700 h-8">Show Routes</Button>
                    </CardContent>
                </Card>
            </div>
        </section >
    )
}

export default HeroSection;