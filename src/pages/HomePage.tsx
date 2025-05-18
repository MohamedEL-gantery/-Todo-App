import Home from "../components/Home/Home";
import FeatureList from "../components/Home/FeatureList";

const HomePage = () => {
  return (
    <>
      <Home />
      <div className="mt-8">
        <FeatureList />
      </div>
    </>
  );
};

export default HomePage;
