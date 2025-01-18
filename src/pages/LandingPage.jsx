import React from 'react';
import { DollarSign } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      title: "25+ Global Currencies",
      description: "Access real-time exchange rates for major world currencies"
    },
    {
      title: "Easy Conversion",
      description: "Convert currencies with just a few clicks"
    },
    {
      title: "Secure Account",
      description: "Save your conversion history and preferences"
    }
  ];

  const handleNavigation = (path) => {
    // In a real app, you'd use React Router here
    window.location.href = path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex justify-between h-16 items-center">
      <div className="flex items-center gap-2">
        <DollarSign className="h-8 w-8 text-blue-600" />
        <span className="text-xl font-bold text-gray-900">CurrencyPro</span>
      </div>
      
      {/* Dynamic button based on page */}
      {window.location.pathname === '/' ? (
        <button 
          onClick={() => window.location.href = '/login'}
          className="bg-white px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          Sign In
        </button>
      ) : (
        <button 
          onClick={() => window.location.href = '/'}
          className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          Logout
        </button>
      )}
    </div>
  </div>
</nav>
      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Welcome to Currency Exchange Pro
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your trusted platform for seamless currency exchange and real-time rates
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <button 
              onClick={() => handleNavigation('/register')}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500">
            © 2025 CurrencyPro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;