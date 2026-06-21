import HeroSection from "./HeroSection";
import NewReleasesSection from "./NewReleasesSection";

const HomePage = () => {
    return (
        <div className="px-8">
            <HeroSection></HeroSection>
            <NewReleasesSection></NewReleasesSection>
        </div>
    );
};

export default HomePage;