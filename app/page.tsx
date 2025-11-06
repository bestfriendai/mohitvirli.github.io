'use client';

import AppDownloadBar from "./components/apps/AppDownloadBar";
import MobileApps from "./components/apps/MobileApps";
import CanvasLoader from "./components/common/CanvasLoader";
import ScrollWrapper from "./components/common/ScrollWrapper";
import Footer from "./components/footer";
import Hero from "./components/hero";
import PortfolioContent from "./components/portfolio/PortfolioContent";

const Home = () => {
  return (
    <div className="relative">
      {/* 3D Canvas Section with Hero, Stars, Portfolio, Mobile Apps, and Footer */}
      <div className="relative">
        <CanvasLoader>
          <ScrollWrapper>
            <Hero/>
            <PortfolioContent/>
            <MobileApps/>
            <Footer/>
          </ScrollWrapper>
        </CanvasLoader>
      </div>

      {/* App Download Bar (HTML Overlay) */}
      <AppDownloadBar />
    </div>
  );
};
export default Home;
