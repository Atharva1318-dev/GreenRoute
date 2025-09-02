import { Card, CardContent } from "@/components/ui/card"
import {
    Leaf,
    Clock,
    BarChart3,
    Users,
} from "lucide-react"

function Benefits() {

    const benefits = [
        {
            icon: Leaf,
            title: "Reduce Your Carbon Footprint",
            description: "Choose eco-friendly routes and see real-time CO₂ savings for every trip you take.",
        },
        {
            icon: Clock,
            title: "Save Time & Money",
            description: "Find efficient routes that balance speed with sustainability, optimizing both time and fuel costs.",
        },
        {
            icon: BarChart3,
            title: "Track Your Impact",
            description: "Monitor your environmental contributions with detailed analytics and progress tracking.",
        },
        {
            icon: Users,
            title: "Join a Community",
            description: "Connect with eco-conscious travelers and compete on global sustainability leaderboards.",
        },
    ]
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl text-gray-900 mb-4">
                        <b>Why Choose GreenRoute?</b></h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover the benefits of sustainable travel planning
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                            <CardContent className="p-6 text-center">
                                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <benefit.icon className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                                <p className="text-gray-600 text-sm">{benefit.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Benefits;