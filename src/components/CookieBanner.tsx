
import React, { useState, useEffect } from 'react';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-800 text-white p-4 shadow-lg z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm mb-4 md:mb-0">
          We use cookies to enhance your experience and for analytics. By continuing to visit this site you agree to our use of cookies.
          <a href="#" className="underline ml-2 hover:text-levita-blue-light">Learn more</a>.
        </p>
        <button
          onClick={handleAccept}
          className="bg-levita-blue-light text-white font-bold py-2 px-6 rounded-full hover:bg-levita-blue-dark transition-colors flex-shrink-0"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
