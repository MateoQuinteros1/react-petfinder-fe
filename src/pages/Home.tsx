import HowWorksSection from "../components/home/HowWorksSection";
import Welcome from "../components/home/Welcome";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Welcome />
      <HowWorksSection />
    </div>
  );
};

export default Home;
