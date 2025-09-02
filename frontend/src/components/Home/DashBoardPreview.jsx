import { Button } from "@/components/ui/button"
import {
    CheckCircle,
} from "lucide-react"

function DashBoardPreview() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Track Your Impact</h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Monitor your environmental contributions with our comprehensive dashboard. See your CO₂ savings, track
                            monthly trips, and watch your positive impact grow.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span className="text-gray-700">Real-time CO₂ savings tracking</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span className="text-gray-700">Monthly and yearly progress reports</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span className="text-gray-700">Points and achievement system</span>
                            </div>
                        </div>

                        <Button className="bg-green-600 hover:bg-green-700">View Demo Dashboard</Button>
                    </div>

                    <div className="relative">
                        <img
                            src="/dashPreview.png?height=600&width=800"
                            alt="Dashboard preview"
                            width={800}
                            height={600}
                            className="rounded-lg shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DashBoardPreview;