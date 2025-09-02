"use client"

import { useState } from "react"
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"


export default function PasswordInput({
    label,
    placeholder,
    value,
    onChange,
    error,
    success,
    disabled = false,
}) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    className={`w-full pl-10 pr-20 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 ${error
                        ? "border-red-300 bg-red-50"
                        : success
                            ? "border-green-300 bg-green-50"
                            : "border-gray-300 bg-white hover:border-gray-400"
                        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-3">
                    {(error || success) && (
                        <div>
                            {error ? (
                                <AlertCircle className="w-5 h-5 text-red-500" />
                            ) : (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={disabled}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
            </div>
            {error && (
                <p className="text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </p>
            )}
        </div>
    )
}
