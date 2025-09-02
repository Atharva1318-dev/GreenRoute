import { useState, useEffect } from "react";
import axios from "axios";
import { TrendingUp, Route, Leaf, Calendar, } from "lucide-react"

function StatCards() {
    const [stats, setStats] = useState({
        totalCO2Saved: 0,
        totalTrips: 0,
        totalDistance: 0,
        thisMonthCO2: 0,
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await axios.get("http://localhost:8080/dashboard/dashboard-stats", {
                    withCredentials: true,
                });

                setStats({
                    // parseFloat aur parseInt string to int/float convert karnekeliye
                    totalCO2Saved: parseFloat(response.data.totalCO2Saved) || 0,
                    totalTrips: parseInt(response.data.totalTrips, 10) || 0,
                    totalDistance: parseFloat(response.data.totalDistanceKm) || 0,
                    thisMonthCO2: parseFloat(response.data.co2SavedThisMonth) || 0,
                });
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            }
        }

        fetchStats();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Total CO₂ Saved</p>
                        <p className="text-2xl font-bold text-green-600">{stats.totalCO2Saved}kg</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-green-600" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Total Trips</p>
                        <p className="text-2xl font-bold text-blue-600">{stats.totalTrips}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Route className="w-6 h-6 text-blue-600" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Distance Traveled</p>
                        <p className="text-2xl font-bold text-purple-600">{stats.totalDistance}km</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">This Month</p>
                        <p className="text-2xl font-bold text-emerald-600">{stats.thisMonthCO2}kg CO₂</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-emerald-600" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatCards;