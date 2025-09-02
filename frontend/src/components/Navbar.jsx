import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Leaf, Menu, X } from "lucide-react"
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";



export default function Navbar() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    //console.log("In navbar isLoggedIn: ", isLoggedIn);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();


    // Authentication handlers
    const handleLogin = () => {
        //console.log("Login clicked");
        navigate("/auth");
    }

    const handleSignUp = () => {
        //console.log("Sign up clicked");
        navigate("/auth");
    }

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8080/auth/logout", {}, {
                withCredentials: true
            });

            setIsLoggedIn(false);
            navigate("/auth");
        } catch (err) {
            console.log("Logout error", err);
        }
    };

    // Handle scroll effect for shadow
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Close mobile menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <header
            className={`sticky top-0 left-0 right-0 z-50 bg-white transition-shadow rounded-xl mt-1 duration-300 ${scrolled ? "shadow-md" : "shadow-sm"
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <Leaf className="w-5 h-5 text-green-700" />
                            </div>
                            <span className="text-lg font-bold text-gray-800">GreenRoute</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-green-700 transition-colors font-medium">
                            Home
                        </Link>
                        <Link to="/features" className="text-gray-600 hover:text-green-700 transition-colors font-medium">
                            Features
                        </Link>
                        <Link to="/about" className="text-gray-600 hover:text-green-700 transition-colors font-medium">
                            About
                        </Link>
                        <Link to="/dashboard" className="text-gray-600 hover:text-green-700 transition-colors font-medium">
                            Dashboard
                        </Link>
                    </nav>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-3">
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition-colors font-medium"
                            >
                                Log Out
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleLogin}
                                    className="text-green-700 hover:text-green-800 px-4 py-2 rounded-lg transition-colors font-medium border border-green-700 hover:bg-green-50"
                                >
                                    Log In
                                </button>
                                <button
                                    onClick={handleSignUp}
                                    className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg transition-colors font-medium"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-600 hover:text-green-700 focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <div
                className={`fixed inset-0 z-40 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out md:hidden`}
            >
                {/* Overlay */}
                <div
                    className={`absolute inset-0 backdrop-blur-sm bg-black bg-opacity-50 ${isOpen ? "opacity-100" : "opacity-0"
                        } transition-opacity duration-300`}
                    onClick={() => setIsOpen(false)}
                />

                {/* Drawer */}
                <div className="absolute top-0 left-0 w-3/4 max-w-xs h-full bg-white shadow-xl flex flex-col">
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <Leaf className="w-5 h-5 text-green-700" />
                            </div>
                            <span className="text-lg font-bold text-gray-800">GreenRoute</span>
                        </Link>
                        <button
                            className="text-gray-600 hover:text-green-700 focus:outline-none"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close menu"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Drawer Content */}
                    <nav className="flex flex-col p-4 space-y-4">
                        <Link
                            to="/"
                            className="text-gray-600 hover:text-green-700 transition-colors font-medium py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/features"
                            className="text-gray-600 hover:text-green-700 transition-colors font-medium py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            to="/about"
                            className="text-gray-600 hover:text-green-700 transition-colors font-medium py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            to="/dashboard"
                            className="text-gray-600 hover:text-green-700 transition-colors font-medium py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Dashboard
                        </Link>

                        {/* Mobile Auth Buttons */}
                        <div className="pt-4 mt-4 border-t">
                            {isLoggedIn ? (
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsOpen(false);
                                    }}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition-colors font-medium"
                                >
                                    Log Out
                                </button>
                            ) : (
                                <div className="space-y-3">
                                    <button
                                        onClick={() => {
                                            handleLogin();
                                            setIsOpen(false);
                                        }}
                                        className="w-full text-green-700 hover:text-green-800 px-4 py-2 rounded-lg transition-colors font-medium border border-green-700 hover:bg-green-50"
                                    >
                                        Log In
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleSignUp();
                                            setIsOpen(false);
                                        }}
                                        className="w-full bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg transition-colors font-medium"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}