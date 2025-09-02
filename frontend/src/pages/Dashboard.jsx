import GreetHeader from "../components/Dashboard/GreetHeader";
import StatCards from "../components/Dashboard/StatCards";
import MainContent from "../components/Dashboard/MainContent";


function Dashboard() {

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 p-4 md:p-6 overflow-x-hidden">
            <div className="max-w-7xl mx-auto space-y-6">
                <GreetHeader></GreetHeader>
                <StatCards></StatCards>
                <MainContent></MainContent>
            </div>
        </div>
    );
}

export default Dashboard;