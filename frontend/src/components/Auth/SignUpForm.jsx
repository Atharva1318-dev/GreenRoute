import React, { useState } from "react"
import { Mail, User, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom";
import GoogleButton from "./GoogleButton"
import FormInput from "./FormInput"
import PasswordInput from "./PasswordInput"

import axios from 'axios';


export default function SignUpForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters"
        }

        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters"
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password"
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsLoading(true)
        setErrors({})

        try {
            // Simulate API call
            const res = await axios.post("http://localhost:8080/auth/register", formData, {
                withCredentials: true,
            });

            console.log("Sign up successful:", res.data);
            // Handle successful sign up
            navigate("/dashboard"); // Redirect
        } catch (error) {
            console.error("Signup error:", error);
            setErrors(error.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const handleGoogleSignUp = async () => {
        setIsLoading(true)
        try {
            // Simulate Google OAuth
            await new Promise((resolve) => setTimeout(resolve, 1000))
            console.log("Google sign up successful")
        } catch (error) {
            setErrors({ general: "Google sign up failed. Please try again." })
        } finally {
            setIsLoading(false)
        }
    }

    const getPasswordStrength = (password) => {
        if (password.length === 0) return { strength: 0, text: "" }
        if (password.length < 6) return { strength: 1, text: "Weak", color: "text-red-500" }
        if (password.length < 10) return { strength: 2, text: "Fair", color: "text-yellow-500" }
        if (password.length >= 10 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            return { strength: 3, text: "Strong", color: "text-green-500" }
        }
        return { strength: 2, text: "Good", color: "text-blue-500" }
    }

    const passwordStrength = getPasswordStrength(formData.password)

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
                <p className="text-gray-600">Join the eco-friendly travel community</p>
            </div>

            {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{errors.general}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <FormInput
                    label="Full Name"
                    type="text"
                    placeholder="Atharva Jadhav"
                    value={formData.name}
                    onChange={(value) => handleInputChange("name", value)}
                    error={errors.name}
                    icon={<User className="w-5 h-5 text-gray-400" />}
                    disabled={isLoading}
                />

                <FormInput
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(value) => handleInputChange("email", value)}
                    error={errors.email}
                    icon={<Mail className="w-5 h-5 text-gray-400" />}
                    disabled={isLoading}
                />

                <div className="space-y-2">
                    <PasswordInput
                        label="Password"
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(value) => handleInputChange("password", value)}
                        error={errors.password}
                        disabled={isLoading}
                    />
                    {formData.password && (
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.strength === 1
                                        ? "bg-red-500 w-1/3"
                                        : passwordStrength.strength === 2
                                            ? "bg-yellow-500 w-2/3"
                                            : passwordStrength.strength === 3
                                                ? "bg-green-500 w-full"
                                                : "w-0"
                                        }`}
                                />
                            </div>
                            <span className={`text-xs font-medium ${passwordStrength.color}`}>{passwordStrength.text}</span>
                        </div>
                    )}
                </div>

                <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(value) => handleInputChange("confirmPassword", value)}
                    error={errors.confirmPassword}
                    disabled={isLoading}
                    success={formData.confirmPassword && formData.password === formData.confirmPassword}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <span>Create Account</span>
                    )}
                </button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">or</span>
                </div>
            </div>

            <GoogleButton onClick={handleGoogleSignUp} disabled={isLoading} text="Sign up with Google" />

            <p className="text-xs text-gray-500 text-center leading-relaxed">
                By creating an account, you agree to our{" "}
                <button className="text-green-600 hover:text-green-700 underline">Terms of Service</button> and{" "}
                <button className="text-green-600 hover:text-green-700 underline">Privacy Policy</button>
            </p>
        </div>
    )
}