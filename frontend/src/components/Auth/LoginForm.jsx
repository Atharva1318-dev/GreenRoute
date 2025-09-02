import { useState, useContext } from "react"
import { Mail, AlertCircle } from "lucide-react"
import GoogleButton from "./GoogleButton"
import FormInput from "./FormInput"
import PasswordInput from "./PasswordInput"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext";

import axios from 'axios';


export default function LoginForm() {
    const { setIsLoggedIn } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {}

        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
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
            const res = await axios.post("http://localhost:8080/auth/login", formData, {
                withCredentials: true,
            });

            //console.log("Login successful:", res.data);
            // Handle successful login
            //console.log("navigating to dashboard");
            if (res.data?.success) {
                setIsLoggedIn(true);
                navigate("/dashboard");
            } else {
                setErrors({ general: "Invalid email or password. Please try again." });
            }
        } catch (error) {
            setErrors({ general: "Invalid email or password. Please try again." });
            //navigate("/login");
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const handleGoogleLogin = async () => {
        setIsLoading(true)
        try {
            // Simulate Google OAuth
            await new Promise((resolve) => setTimeout(resolve, 1000))
            console.log("Google login successful")
        } catch (error) {
            setErrors({ general: "Google login failed. Please try again." })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to your account to continue</p>
            </div>

            {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{errors.general}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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

                <PasswordInput
                    label="Password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(value) => handleInputChange("password", value)}
                    error={errors.password}
                    disabled={isLoading}
                />

                <div className="flex justify-end">
                    <button type="button" className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors">
                        Forgot password?
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <span>Log In</span>
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

            <GoogleButton onClick={handleGoogleLogin} disabled={isLoading} text="Log in with Google" />
        </div>
    )
}