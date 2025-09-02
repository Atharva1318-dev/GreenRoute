import {
    MapPin,
    Navigation,
    Award,
} from "lucide-react";


function HowItWorks() {

    const steps = [
        {
            icon: MapPin,
            title: "Enter Your Trip",
            description: "Input your starting point and destination to begin planning your route.",
        },
        {
            icon: Navigation,
            title: "Compare Route Options",
            description: "View fastest vs. greenest routes with detailed CO₂ emission comparisons.",
        },
        {
            icon: Award,
            title: "Save & Earn Points",
            description: "Track your green trips and earn points for choosing sustainable options.",
        },
    ]
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl text-gray-900 mb-4">
                        <b>How It Works</b></h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Three simple steps to start your sustainable journey
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <step.icon className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    );
}

export default HowItWorks;