import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1523580494863-6f3031224f94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Event background: stage with speakers and audience"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
          Where Talent Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Opportunity</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto">
          Join the premier platform connecting visionary talent with industry leaders. Showcase your skills, discover groundbreaking events, and take the next step in your career.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold text-xl sm:text-2xl py-5 px-12 rounded-lg shadow-2xl transform transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300">
            Register Now
          </button>
          <button className="w-full sm:w-auto border-2 border-white text-white font-semibold text-xl sm:text-2xl py-5 px-12 rounded-lg hover:bg-white/10 backdrop-blur-sm transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50">
            Explore Events
          </button>
        </div>
      </div>

      {/* Optional subtle bottom gradient for depth */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent z-5"></div>
    </section>
  );
};

export default HeroSection;