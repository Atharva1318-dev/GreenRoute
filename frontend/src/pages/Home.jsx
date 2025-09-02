import HeroSection from '../components/Home/HeroSection';
import HowItWorks from "../components/Home/HowItWorks";
import Benefits from "../components/Home/Benefits";
import DashboardPreview from "../components/Home/DashBoardPreview";
import Testimonials from "../components/Home/Testimonials";

const Home = () => {
    return (
        <div className='min-h-screen bg-white'>
            <HeroSection />
            <HowItWorks />
            <Benefits />
            <DashboardPreview />
            <Testimonials />
        </div>
    );
};

export default Home;
