

import { AlertCircle, CheckCircle } from "lucide-react"


export default function FormInput({
    label,
    type,
    placeholder,
    value,
    onChange,
    error,
    success,
    icon,
    disabled = false,
}) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="relative">
                {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    className={`w-full ${icon ? "pl-10" : "pl-4"} pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 ${error
                        ? "border-red-300 bg-red-50"
                        : success
                            ? "border-green-300 bg-green-50"
                            : "border-gray-300 bg-white hover:border-gray-400"
                        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                />
                {(error || success) && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        {error ? (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                        ) : (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                    </div>
                )}
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
