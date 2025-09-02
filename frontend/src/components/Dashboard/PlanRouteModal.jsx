import { useState, useEffect } from "react"
import { X, MapPin, Calendar, Car, Bike, Train, Footprints } from "lucide-react"
import axios from 'axios';

// Map
import { MapContainer, TileLayer, useMap, Marker, useMapEvents, Polyline } from 'react-leaflet';
import { Toaster } from "@/components/ui/sonner";


export default function PlanRouteModal({ isOpen, onClose }) {
    const [startCoords, setStartCoords] = useState(null);
    const [endCoords, setEndCoords] = useState(null);

    const [formData, setFormData] = useState({
        startLocation: "",
        destination: "",
        transportMode: "walk",
        tripDate: "",
        notes: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Transport mode options with icons
    const transportModes = [
        { value: "walk", label: "Walk", icon: Footprints },
        { value: "cycle", label: "Cycle", icon: Bike },
        { value: "two-wheeler", label: "Bike/Scooter", icon: Bike },
        { value: "public", label: "Public Transport", icon: Train },
        { value: "car", label: "Car", icon: Car },
    ]

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
            document.body.style.overflow = "hidden"
        }

        return () => {
            document.removeEventListener("keydown", handleEscape)
            document.body.style.overflow = "unset"
        }
    }, [isOpen, onClose])

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData({
                startLocation: "",
                destination: "",
                transportMode: "walk",
                tripDate: "",
                notes: "",
            })
            setErrors({})
            setIsSubmitting(false)
        }
    }, [isOpen])

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.startLocation.trim()) {
            newErrors.startLocation = "Start location is required"
        }

        if (!formData.destination.trim()) {
            newErrors.destination = "Destination is required"
        }

        if (!formData.tripDate) {
            newErrors.tripDate = "Trip date is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        try {
            // Send form data to backend
            const res = await axios.post("http://localhost:8080/geocode/forward", {
                start: formData.startLocation,
                destination: formData.destination,
                mode: formData.transportMode,
                tripDate: formData.tripDate,
                notes: formData.notes,
            },
                {
                    withCredentials: true, // 👈 This is required so cookies (JWT) are sent
                }
            );

            const data = res.data;
            console.log("✅ Route saved:", data);

            // // Example: Show real distance + duration + CO2 in preview
            // if (onSubmit) {
            //     onSubmit(data);
            // }

            onClose();
        } catch (error) {
            console.error("❌ Error submitting route:", error);
            // optional: toast.error(error.response?.data?.error || "Error planning route");
        } finally {
            setIsSubmitting(false);
        }
    }

    const getTransportIcon = (mode) => {
        const transport = transportModes.find((t) => t.value === mode)
        return transport ? transport.icon : User
    }

    if (!isOpen) return null


    // 1. Map is displayed with a center location.

    // 2. User clicks somewhere on the map.

    // 3. LocationPicker catches the click and gets latlng through the event 'e'.

    // 4. setCoordinates updates the parent component’s state.



    const LocationPicker = ({ setStart, setEnd, startCoords, endCoords }) => {

        // This useMapEvents function listens for map events like when it will be clicked on map and all
        useMapEvents({
            // This click is triggered when the map is being clicked, and the event 'e' contains the latitude longitude
            // It's an object like { lat: 19.07, lng: 72.88 }
            click(e) {
                const clicked = e.latlng;
                if (!startCoords) {
                    setStart(clicked);
                    setStart(clicked);
                    toast.success("Start point selected. Now click to choose destination.");
                } else if (!endCoords) {
                    setEnd(clicked);
                    toast.success("Destination selected.");
                }
            }
        });
        return null;
    };

    const handleResetMarkers = () => {
        setStartCoords(null);
        setEndCoords(null);
        setStep("start");
        toast.info("Click on map to select starting point");
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div className="absolute inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm transition-opacity" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Plan New Route</h2>
                        <p className="text-gray-600 mt-1">Create your eco-friendly journey</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white hover:bg-opacity-80 rounded-full transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Form Section */}
                                <div className="lg:col-span-2 space-y-6">
                                    {/* Location Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Start Location */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">Start Location *</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    placeholder="Enter starting point"
                                                    value={formData.startLocation}
                                                    onChange={(e) => handleInputChange("startLocation", e.target.value)}
                                                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${errors.startLocation ? "border-red-300 bg-red-50" : "border-gray-300"
                                                        }`}
                                                />
                                            </div>
                                            {errors.startLocation && <p className="text-sm text-red-600">{errors.startLocation}</p>}
                                        </div>

                                        {/* Destination */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">Destination *</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400" />
                                                <input
                                                    type="text"
                                                    placeholder="Enter destination"
                                                    value={formData.destination}
                                                    onChange={(e) => handleInputChange("destination", e.target.value)}
                                                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${errors.destination ? "border-red-300 bg-red-50" : "border-gray-300"
                                                        }`}
                                                />
                                            </div>
                                            {errors.destination && <p className="text-sm text-red-600">{errors.destination}</p>}
                                        </div>
                                    </div>

                                    {/* Transport Mode and Date */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Transport Mode */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">Preferred Mode of Transport</label>
                                            <div className="relative">
                                                <select
                                                    value={formData.transportMode}
                                                    onChange={(e) => handleInputChange("transportMode", e.target.value)}
                                                    className="w-full pl-8 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors appearance-none bg-white"
                                                >
                                                    {transportModes.map((mode) => (
                                                        <option key={mode.value} value={mode.value}>
                                                            {mode.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                                    {(() => {
                                                        const IconComponent = getTransportIcon(formData.transportMode)
                                                        return <IconComponent className="w-5 h-5 text-gray-400" />
                                                    })()}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Date Picker */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">Date of Trip *</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="date"
                                                    value={formData.tripDate}
                                                    onChange={(e) => handleInputChange("tripDate", e.target.value)}
                                                    min={new Date().toISOString().split("T")[0]}
                                                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${errors.tripDate ? "border-red-300 bg-red-50" : "border-gray-300"
                                                        }`}
                                                />
                                            </div>
                                            {errors.tripDate && <p className="text-sm text-red-600">{errors.tripDate}</p>}
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">Notes</label>
                                        <textarea
                                            placeholder="Add any notes about the trip"
                                            value={formData.notes}
                                            onChange={(e) => handleInputChange("notes", e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                                        />
                                    </div>
                                </div>

                                {/* Route Preview Section */}
                                <div className="lg:col-span-1">
                                    <div className="bg-gray-50 rounded-xl p-6 h-full min-h-[300px]">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Preview</h3>

                                        {/* Map Placeholder */}
                                        <div
                                            className="bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-4"
                                            style={{ height: "200px" }}
                                        >

                                            <MapContainer center={[19.47, 72.81]} zoom={14} style={{ height: '100%', width: '100%' }}>
                                                <TileLayer
                                                    attribution='&copy; OpenStreetMap contributors'
                                                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                                />
                                                <LocationPicker
                                                    setStart={setStartCoords}
                                                    setEnd={setEndCoords}
                                                    startCoords={startCoords}
                                                    endCoords={endCoords}
                                                />
                                                {startCoords && <Marker position={startCoords} />}
                                                {endCoords && <Marker position={endCoords} />}
                                                {startCoords && endCoords && (
                                                    <Polyline positions={[startCoords, endCoords]} color="blue" />
                                                )}
                                            </MapContainer>


                                            <div className="hidden flex-col items-center justify-center text-gray-400">
                                                <MapPin className="w-12 h-12 mb-2" />
                                                <p className="text-sm text-center">Route map will appear here</p>
                                            </div>
                                        </div>

                                        {/* Route Summary */}
                                        {(formData.startLocation || formData.destination) && (
                                            <div className="space-y-3">
                                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                                    <h4 className="font-medium text-gray-900 mb-2">Trip Summary</h4>
                                                    <div className="space-y-2 text-sm">
                                                        {formData.startLocation && (
                                                            <div className="flex items-center space-x-2">
                                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                                <span className="text-gray-600">From: {formData.startLocation}</span>
                                                            </div>
                                                        )}
                                                        {formData.destination && (
                                                            <div className="flex items-center space-x-2">
                                                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                                <span className="text-gray-600">To: {formData.destination}</span>
                                                            </div>
                                                        )}
                                                        {formData.transportMode && (
                                                            <div className="flex items-center space-x-2">
                                                                {(() => {
                                                                    const IconComponent = getTransportIcon(formData.transportMode)
                                                                    return <IconComponent className="w-4 h-4 text-gray-500" />
                                                                })()}
                                                                <span className="text-gray-600">
                                                                    Mode: {transportModes.find((m) => m.value === formData.transportMode)?.label}
                                                                </span>
                                                            </div>
                                                        )}
                                                        {formData.tripDate && (
                                                            <div className="flex items-center space-x-2">
                                                                <Calendar className="w-4 h-4 text-gray-500" />
                                                                <span className="text-gray-600">Date: {formData.tripDate}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Estimated Impact */}
                                                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                                    <h4 className="font-medium text-green-900 mb-2">Estimated Impact</h4>
                                                    <div className="text-sm text-green-700">
                                                        <p>CO₂ Savings: ~2.5kg</p>
                                                        <p>Distance: ~8.5km</p>
                                                        <p>Duration: ~25 min</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 sm:flex-none px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-xl transition-colors font-medium flex items-center justify-center space-x-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Planning Route...</span>
                                        </>
                                    ) : (
                                        <span>Submit Route</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}