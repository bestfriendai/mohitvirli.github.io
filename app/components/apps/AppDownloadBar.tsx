'use client';

import { useEffect, useState } from 'react';
import { MOBILE_APPS } from '../../constants/apps';

const AppDownloadBar = () => {
  const [visible, setVisible] = useState(false);
  const [selectedApp, setSelectedApp] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Show download bar when scrolled 65% or more
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(scrollPercent >= 0.65);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentApp = MOBILE_APPS[selectedApp];

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.8))',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* App Selector */}
        <div className="flex justify-center gap-3 mb-4">
          {MOBILE_APPS.map((app, index) => (
            <button
              key={index}
              onClick={() => setSelectedApp(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedApp === index
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {app.name}
            </button>
          ))}
        </div>

        {/* Download Buttons */}
        <div className="flex justify-center items-center gap-4">
          <div className="text-center flex-1 max-w-xs">
            <p className="text-white text-lg font-semibold mb-2">{currentApp.name}</p>
            <p className="text-gray-400 text-sm mb-3">{currentApp.description}</p>
          </div>

          <div className="flex gap-3">
            {currentApp.appStoreUrl && (
              <a
                href={currentApp.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
            )}

            {currentApp.playStoreUrl && (
              <a
                href={currentApp.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownloadBar;
