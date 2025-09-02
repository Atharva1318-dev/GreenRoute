import { Card, CardContent } from "@/components/ui/card"
import {
    Star,
} from "lucide-react"

function Testimonials() {
    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Daily Commuter",
            content:
                "GreenRoute helped me reduce my commute emissions by 40% while discovering beautiful bike paths I never knew existed.",
            rating: 5,
        },
        {
            name: "Mike Rodriguez",
            role: "Business Traveler",
            content:
                "The CO₂ tracking feature motivated me to choose greener options. I've saved over 200kg of emissions this year!",
            rating: 5,
        },
        {
            name: "Emma Thompson",
            role: "Environmental Advocate",
            content:
                "Finally, an app that makes sustainable travel choices easy and rewarding. The gamification keeps me engaged.",
            rating: 5,
        },
    ]
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Thousands of Eco-Travelers</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        See what our community is saying about their sustainable journey
                    </p>
                </div>

                {/* Impact Numbers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">15,000+</div>
                        <div className="text-gray-600">Trips Planned</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">8,500 kg</div>
                        <div className="text-gray-600">CO₂ Saved</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">2,300+</div>
                        <div className="text-gray-600">Active Users</div>
                    </div>
                </div>

                {/* Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="border-0 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                                <div>
                                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;