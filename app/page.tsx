'use client';

import CanvasLoader from "./components/common/CanvasLoader";
import ScrollWrapper from "./components/common/ScrollWrapper";
import Footer from "./components/footer";
import Hero from "./components/hero";
import PortfolioContent from "./components/portfolio/PortfolioContent";

const Home = () => {
  return (
    <div className="relative">
      {/* 3D Canvas Section with Hero, Stars, Portfolio, and Footer */}
      <div className="relative">
        <CanvasLoader>
          <ScrollWrapper>
            <Hero/>
            <PortfolioContent/>
            <Footer/>
          </ScrollWrapper>
        </CanvasLoader>
      </div>
    </div>
  );
};
export default Home;
