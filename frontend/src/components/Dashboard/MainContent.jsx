import { useState, useEffect } from "react";
import { Car, Bike, MapPin, Award, Users, Route, BarChart3, Plus } from "lucide-react"
import {
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import PlanRouteModal from "./PlanRouteModal";
import axios from "axios";

function MainContent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState("month");

    // MOCK SAMPLE DATA
    // const chartData = [
    //     { month: "Jan", co2Saved: 15.2, trips: 8 },
    //     { month: "Feb", co2Saved: 22.1, trips: 12 },
    //     { month: "Mar", co2Saved: 18.7, trips: 10 },
    //     { month: "Apr", co2Saved: 25.3, trips: 14 },
    //     { month: "May", co2Saved: 28.9, trips: 16 },
    //     { month: "Jun", co2Saved: 31.2, trips: 18 },
    // ]

    // const leaderboardData = [
    //     {
    //         id: "1",
    //         name: "Sarthak Aggrawal",
    //         avatar: "/placeholder.svg?height=32&width=32",
    //         co2Saved: 245.8,
    //         rank: 1,
    //         isCurrentUser: false,
    //     },
    //     {
    //         id: "2",
    //         name: "Atharva Jadhav",
    //         avatar: "/placeholder.svg?height=32&width=32",
    //         co2Saved: 127.5,
    //         rank: 2,
    //         isCurrentUser: true,
    //     },
    //     {
    //         id: "3",
    //         name: "Saish Dhuri",
    //         avatar: "/placeholder.svg?height=32&width=32",
    //         co2Saved: 98.2,
    //         rank: 3,
    //         isCurrentUser: false,
    //     },
    //     {
    //         id: "4",
    //         name: "Aarjav Jain",
    //         avatar: "/placeholder.svg?height=32&width=32",
    //         co2Saved: 87.4,
    //         rank: 4,
    //         isCurrentUser: false,
    //     },
    //     {
    //         id: "5",
    //         name: "Rishabh Jain",
    //         avatar: "/placeholder.svg?height=32&width=32",
    //         co2Saved: 76.9,
    //         rank: 5,
    //         isCurrentUser: false,
    //     },
    // ]

    // // Mock transport mode distribution data
    // const transportModeData = [
    //     { mode: "Bike", value: 45, color: "#22c55e" },
    //     { mode: "Walk", value: 30, color: "#10b981" },
    //     { mode: "Car (Eco)", value: 20, color: "#3b82f6" },
    //     { mode: "Public Transport", value: 5, color: "#8b5cf6" },
    // ]

    // const getModeIcon = (mode) => {
    //     switch (mode) {
    //         case "car":
    //             return <Car className="w-4 h-4" />
    //         case "bike":
    //             return <Bike className="w-4 h-4" />
    //         case "walk":
    //             return <MapPin className="w-4 h-4" />
    //         default:
    //             return <Route className="w-4 h-4" />
    //     }
    // }

    // const getModeColor = (mode) => {
    //     switch (mode) {
    //         case "car":
    //             return "text-blue-600 bg-blue-50"
    //         case "bike":
    //             return "text-green-600 bg-green-50"
    //         case "walk":
    //             return "text-emerald-600 bg-emerald-50"
    //         default:
    //             return "text-gray-600 bg-gray-50"
    //     }
    // }

    // // Mock recent trips
    // const recentTrips = [
    //     {
    //         id: "1",
    //         from: "Home",
    //         to: "Downtown Office",
    //         mode: "bike",
    //         distance: 8.5,
    //         co2Saved: 2.1,
    //         date: "2024-01-15",
    //     },
    //     {
    //         id: "2",
    //         from: "Coffee Shop",
    //         to: "Central Park",
    //         mode: "walk",
    //         distance: 1.2,
    //         co2Saved: 0.3,
    //         date: "2024-01-14",
    //     },
    //     {
    //         id: "3",
    //         from: "Airport",
    //         to: "Hotel",
    //         mode: "car",
    //         distance: 25.0,
    //         co2Saved: 1.8,
    //         date: "2024-01-13",
    //     },
    // ]

    // // Mock achievements
    // const achievements = [
    //     {
    //         id: "1",
    //         title: "Green Pioneer",
    //         description: "Saved 100kg CO₂",
    //         icon: "🌱",
    //         earned: true,
    //     },
    //     {
    //         id: "2",
    //         title: "Bike Enthusiast",
    //         description: "50 bike trips completed",
    //         icon: "🚴",
    //         earned: true,
    //     },
    //     {
    //         id: "3",
    //         title: "Walking Champion",
    //         description: "100km walked",
    //         icon: "🚶",
    //         earned: false,
    //     },
    //     {
    //         id: "4",
    //         title: "Eco Warrior",
    //         description: "500kg CO₂ saved",
    //         icon: "🏆",
    //         earned: false,
    //     },
    // ]

    // State for real data
    const [chartData, setChartData] = useState([]);
    const [transportModeData, setTransportModeData] = useState([]);
    const [recentTrips, setRecentTrips] = useState([]);
    const [achievements, setAchievements] = useState([
        // keep static for now or fetch later
        { id: "1", title: "Green Pioneer", description: "Saved 100kg CO₂", icon: "🌱", earned: true },
        { id: "2", title: "Bike Enthusiast", description: "50 bike trips completed", icon: "🚴", earned: true },
        { id: "3", title: "Walking Champion", description: "100km walked", icon: "🚶", earned: false },
        { id: "4", title: "Eco Warrior", description: "500kg CO₂ saved", icon: "🏆", earned: false },
    ]);

    const leaderboardData = [
        {
            id: "1",
            name: "Sarthak Aggrawal",
            avatar: "/placeholder.svg?height=32&width=32",
            co2Saved: 245.8,
            rank: 1,
            isCurrentUser: false,
        },
        {
            id: "2",
            name: "Atharva Jadhav",
            avatar: "/placeholder.svg?height=32&width=32",
            co2Saved: 127.5,
            rank: 2,
            isCurrentUser: true,
        },
        {
            id: "3",
            name: "Saish Dhuri",
            avatar: "/placeholder.svg?height=32&width=32",
            co2Saved: 98.2,
            rank: 3,
            isCurrentUser: false,
        },
        {
            id: "4",
            name: "Aarjav Jain",
            avatar: "/placeholder.svg?height=32&width=32",
            co2Saved: 87.4,
            rank: 4,
            isCurrentUser: false,
        },
        {
            id: "5",
            name: "Rishabh Jain",
            avatar: "/placeholder.svg?height=32&width=32",
            co2Saved: 76.9,
            rank: 5,
            isCurrentUser: false,
        },
    ]

    const getModeIcon = (mode) => {
        switch (mode) {
            case "car":
                return <Car className="w-4 h-4" />
            case "bike":
                return <Bike className="w-4 h-4" />
            case "walk":
                return <MapPin className="w-4 h-4" />
            default:
                return <Route className="w-4 h-4" />
        }
    }

    const getModeColor = (mode) => {
        switch (mode) {
            case "car":
                return "text-blue-600 bg-blue-50"
            case "bike":
                return "text-green-600 bg-green-50"
            case "walk":
                return "text-emerald-600 bg-emerald-50"
            default:
                return "text-gray-600 bg-gray-50"
        }
    }


    useEffect(() => {
        // API base URL, adjust as needed
        const baseUrl = "http://localhost:8080/dashboard";

        // Fetch monthly CO2 savings for chart
        const fetchChartData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/monthly-co2`, {
                    withCredentials: true,
                });
                setChartData(res.data);
            } catch (err) {
                console.error("Failed to fetch monthly CO2 data:", err);
            }
        };

        // Fetch transport mode distribution
        const fetchTransportModeData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/transport-modes`, {
                    withCredentials: true
                });
                // Reshape for your chart usage, e.g., assign colors manually
                const colorMap = {
                    bike: "#22c55e",
                    walk: "#10b981",
                    car: "#3b82f6",
                    "public-transport": "#8b5cf6",
                };

                const transformed = res.data.map(item => ({
                    mode: item.mode.charAt(0).toUpperCase() + item.mode.slice(1).replace("-", " "),
                    value: item.value,
                    color: colorMap[item.mode] || "#999999"
                }));

                setTransportModeData(transformed);
            } catch (err) {
                console.error("Failed to fetch transport mode data:", err);
            }
        };

        // Fetch recent trips
        const fetchRecentTrips = async () => {
            try {
                const res = await axios.get(`${baseUrl}/recent-trips`,
                    {
                        withCredentials: true
                    }
                );
                setRecentTrips(res.data);
            } catch (err) {
                console.error("Failed to fetch recent trips:", err);
            }
        };

        fetchChartData();
        fetchTransportModeData();
        fetchRecentTrips();
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
                {/* CO₂ Savings Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">CO₂ Savings Over Time</h2>
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            {["week", "month", "year"].map((period) => (
                                <button
                                    key={period}
                                    onClick={() => setSelectedPeriod(period)}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${selectedPeriod === period
                                        ? "bg-white text-green-600 shadow-sm"
                                        : "text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    {period.charAt(0).toUpperCase() + period.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <ChartContainer
                        config={{
                            co2Saved: {
                                label: "CO₂ Saved (kg)",
                                color: "#22c55e",
                            },
                        }}
                        className="h-[300px]"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis
                                    stroke="#6b7280"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}kg`}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} cursor={{ stroke: "#22c55e", strokeWidth: 1 }} />
                                <Line
                                    type="monotone"
                                    dataKey="co2Saved"
                                    stroke="#22c55e"
                                    strokeWidth={3}
                                    dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, stroke: "#22c55e", strokeWidth: 2, fill: "#fff" }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>

                {/* Plan New Route Button */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-lg">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Ready for your next eco-trip?</h3>
                            <p className="text-green-100">Plan a new route and continue making a positive impact</p>
                        </div>
                        <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors flex items-center space-x-2 whitespace-nowrap" onClick={() => setIsModalOpen(true)}>
                            <Plus className="w-5 h-5" />
                            <span>Plan New Route</span>
                        </button>
                    </div>
                </div>

                {/* Recent Trips */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Trips</h2>
                    <div className="space-y-4">
                        {recentTrips.map((trip) => (
                            <div key={trip.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center space-x-4">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${getModeColor(trip.mode)}`}
                                    >
                                        {getModeIcon(trip.mode)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {trip.from} → {trip.to}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {trip.distance}km • {trip.date}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-green-600">{trip.co2Saved}kg CO₂</p>
                                    <p className="text-xs text-gray-500">saved</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Eco Leaders */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Eco Leaders</h2>
                        <div className="text-xs text-gray-500 bg-green-50 px-2 py-1 rounded-full">This Month</div>
                    </div>

                    <div className="space-y-3">
                        {leaderboardData.map((user, index) => (
                            <div
                                key={user.id}
                                className={`flex items-center justify-between p-3 rounded-xl transition-all ${user.isCurrentUser ? "bg-green-50 border-2 border-green-200" : "bg-gray-50 hover:bg-gray-100"
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${index === 0
                                                ? "bg-yellow-100 text-yellow-700"
                                                : index === 1
                                                    ? "bg-gray-100 text-gray-700"
                                                    : index === 2
                                                        ? "bg-orange-100 text-orange-700"
                                                        : "bg-blue-50 text-blue-600"
                                                }`}
                                        >
                                            {user.rank}
                                        </div>
                                        {index < 3 && (
                                            <div className="absolute -top-1 -right-1 text-xs">
                                                {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                                            </div>
                                        )}
                                    </div>

                                    <img
                                        src={user.avatar || "/placeholder.svg"}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "/placeholder.svg?height=32&width=32"
                                        }}
                                    />

                                    <div>
                                        <p className={`text-sm font-medium ${user.isCurrentUser ? "text-green-700" : "text-gray-900"}`}>
                                            {user.name} {user.isCurrentUser && "(You)"}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm font-semibold text-green-600">{user.co2Saved}kg</p>
                                    <p className="text-xs text-gray-500">CO₂ saved</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <button className="w-full text-center text-sm text-green-600 hover:text-green-700 font-medium transition-colors">
                            View Full Leaderboard
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
                {/* Transport Mode Distribution */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Transport Mode Distribution</h2>

                    <ChartContainer
                        config={{
                            bike: { label: "Bike", color: "#22c55e" },
                            walk: { label: "Walk", color: "#10b981" },
                            car: { label: "Car (Eco)", color: "#3b82f6" },
                            public: { label: "Public Transport", color: "#8b5cf6" },
                        }}
                        className="h-[250px]"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={transportModeData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {transportModeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <ChartTooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const data = payload[0].payload
                                            return (
                                                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                                                    <p className="font-medium text-gray-900">{data.mode}</p>
                                                    <p className="text-sm text-gray-600">{data.value}% of trips</p>
                                                </div>
                                            )
                                        }
                                        return null
                                    }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    formatter={(value, entry) => (
                                        <span style={{ color: entry.color, fontSize: "14px" }}>{value}</span>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>

                    {/* Transport Mode Stats */}
                    <div className="mt-4 space-y-2">
                        {transportModeData.map((mode, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: mode.color }} />
                                    <span className="text-sm text-gray-600">{mode.mode}</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{mode.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Achievements */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {achievements.map((achievement) => (
                            <div
                                key={achievement.id}
                                className={`p-4 rounded-xl border-2 transition-all ${achievement.earned ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50 opacity-60"
                                    }`}
                            >
                                <div className="text-2xl mb-2">{achievement.icon}</div>
                                <h3 className="font-semibold text-sm text-gray-900 mb-1">{achievement.title}</h3>
                                <p className="text-xs text-gray-600">{achievement.description}</p>
                                {achievement.earned && (
                                    <div className="mt-2">
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            <Award className="w-3 h-3 mr-1" />
                                            Earned
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Community Stats */}
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Community Impact</h3>
                            <p className="text-blue-100 text-sm">Together we're making a difference</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-blue-100">Total Eco-Trips</span>
                            <span className="font-bold text-xl">15,247+</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-blue-100">CO₂ Saved Globally</span>
                            <span className="font-bold text-xl">8,500kg</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-blue-100">Active Eco-Travelers</span>
                            <span className="font-bold text-xl">2,300+</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        <button className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors">
                            <BarChart3 className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-green-700">View Detailed Stats</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                            <Route className="w-5 h-5 text-blue-600" />
                            <span className="font-medium text-blue-700">Route History</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors">
                            <Award className="w-5 h-5 text-purple-600" />
                            <span className="font-medium text-purple-700">View All Badges</span>
                        </button>
                    </div>
                </div>

                {/* Plan Route Modal */}
                <PlanRouteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </div>
    );
}

export default MainContent;