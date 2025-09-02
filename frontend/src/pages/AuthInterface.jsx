"use client";

import { useState } from "react";
import { Leaf, MapPin } from "lucide-react";
import SignUpForm from "../components/Auth/SignUpForm";
import LogInForm from "../components/Auth/LoginForm";

export default function AuthInterface({ isLoggedIn, setIsLoggedIn }) {
    const [activeTab, setActiveTab] = useState("login");

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Side - Branding (Hidden on mobile) */}
                    <div className="hidden lg:flex flex-col items-center justify-center space-y-8 p-8">
                        <div className="relative">
                            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                                <Leaf className="w-16 h-16 text-green-600" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center shadow-md">
                                <MapPin className="w-6 h-6 text-emerald-600" />
                            </div>
                        </div>

                        <div className="text-center space-y-4">
                            <h1 className="text-4xl font-bold text-green-800">Welcome to GreenRoute</h1>
                            <p className="text-lg text-green-700 max-w-md">
                                Join thousands of eco-conscious travelers making a positive impact on our planet
                            </p>
                        </div>

                        <div className="flex space-x-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                                    <MapPin className="w-8 h-8 text-green-600" />
                                </div>
                                <p className="text-sm text-green-700 font-medium">Smart Routes</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                                    <Leaf className="w-8 h-8 text-green-600" />
                                </div>
                                <p className="text-sm text-green-700 font-medium">CO₂ Tracking</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Authentication Forms */}
                    <div className="w-full max-w-md mx-auto lg:mx-0">
                        {/* Mobile Branding */}
                        <div className="lg:hidden text-center mb-8">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <Leaf className="w-6 h-6 text-green-600" />
                                </div>
                                <h1 className="text-2xl font-bold text-green-800">GreenRoute</h1>
                            </div>
                            <p className="text-green-700">Your eco-friendly travel companion</p>
                        </div>

                        {/* Auth Card */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 p-8">
                            {/* Tab Navigation */}
                            <div className="flex bg-green-50 rounded-xl p-1 mb-8">
                                <button
                                    onClick={() => setActiveTab("login")}
                                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${activeTab === "login"
                                        ? "bg-white text-green-700 shadow-sm"
                                        : "text-green-600 hover:text-green-700"
                                        }`}
                                >
                                    Log In
                                </button>
                                <button
                                    onClick={() => setActiveTab("signup")}
                                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${activeTab === "signup"
                                        ? "bg-white text-green-700 shadow-sm"
                                        : "text-green-600 hover:text-green-700"
                                        }`}
                                >
                                    Sign Up
                                </button>
                            </div>

                            {/* Form Content */}
                            <div className="transition-all duration-300">
                                {activeTab === "login" ? <LogInForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> : <SignUpForm />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}