
function GreetHeader() {

    const user = {
        name: "Atharva Jadhav",
        avatar: "/placeholder.svg?height=40&width=40",
    }

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome back, {user.name}! 👋</h1>
                <p className="text-gray-600 mt-1">Your eco-friendly journey continues to make a difference</p>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <img
                        src="/placeholder.svg"
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=32&width=32"
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default GreetHeader;