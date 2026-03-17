// CompetitionCards.tsx
import React from 'react';
import { IconType } from 'react-icons';
import { 
  MdOutlineMusicNote, 
  MdOutlineSportsBasketball, 
  MdOutlineScience,
  MdOutlineArtTrack,
  MdOutlineCode,
  MdOutlineRestaurantMenu,
  MdOutlineTheaterComedy,
  MdOutlineEmojiEvents 
} from 'react-icons/md';

interface CompetitionCardProps {
  icon: React.ElementType; // ✅ Use ElementType instead of IconType
  title: string;
  slotStatus: { available: number; total: number };
  category: string;
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({ icon: Icon, title, slotStatus, category }) => {
  const spotsLeft = slotStatus.available;
  const isLowStock = spotsLeft <= 5 && spotsLeft > 0;
  const isSoldOut = spotsLeft === 0;

  return (
    <div className="group relative animate-fadeInUp">
      {/* Glassmorphism Card */}
      <div className={`
        relative backdrop-blur-md bg-black/30 
        border ${isSoldOut ? 'border-red-500/30' : 'border-yellow-500/30'} 
        rounded-2xl p-6 
        shadow-xl shadow-black/50
        transition-all duration-500 ease-out
        hover:shadow-2xl hover:shadow-yellow-500/20
        hover:scale-105 hover:-translate-y-2
        cursor-pointer
        overflow-hidden
      `}>
        {/* Animated gradient border effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 animate-gradient-x"></div>
        </div>

        {/* Card Content */}
        <div className="relative z-10">
          {/* Icon with animated glow */}
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 group-hover:scale-150"></div>
            <div className="relative text-yellow-400 text-5xl transform group-hover:rotate-12 transition-transform duration-500">
              {Icon ? <Icon /> : null}
            </div>
          </div>

          {/* Category Badge */}
          <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-yellow-400 bg-yellow-400/10 rounded-full border border-yellow-500/30">
            {category}
          </span>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-500 transition-all duration-300">
            {title}
          </h3>

          {/* Slot Status */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Available Slots</span>
              <span className={`
                font-semibold
                ${isSoldOut ? 'text-red-400' : isLowStock ? 'text-orange-400' : 'text-green-400'}
              `}>
                {spotsLeft} / {slotStatus.total}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`
                  h-full rounded-full transition-all duration-1000 ease-out
                  ${isSoldOut ? 'bg-red-500' : isLowStock ? 'bg-orange-500' : 'bg-gradient-to-r from-yellow-400 to-orange-500'}
                `}
                style={{ 
                  width: `${(spotsLeft / slotStatus.total) * 100}%`
                }}
              ></div>
            </div>

            {/* Status Message */}
            <div className="mt-3">
              {isSoldOut ? (
                <span className="inline-flex items-center gap-1 text-sm text-red-400 animate-pulse">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Sold Out
                </span>
              ) : isLowStock ? (
                <span className="inline-flex items-center gap-1 text-sm text-orange-400 animate-bounce">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Only {spotsLeft} {spotsLeft === 1 ? 'Spot' : 'Spots'} Left!
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-sm text-green-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {spotsLeft} Spots Available
                </span>
              )}
            </div>
          </div>

          {/* Register Button */}
          <button 
            disabled={isSoldOut}
            className={`
              w-full mt-6 py-3 px-4 rounded-lg font-semibold
              transition-all duration-300 transform
              ${isSoldOut 
                ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/30 active:scale-95'
              }
            `}
          >
            {isSoldOut ? 'Sold Out' : 'Register Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

const CompetitionCards: React.FC = () => {
  // Define the competitions array with proper typing
  const competitions: {
    icon: IconType;
    title: string;
    category: string;
    slotStatus: {
      available: number;
      total: number;
    };
  }[] = [
    {
      icon: MdOutlineMusicNote,
      title: "Battle of Bands",
      category: "Music",
      slotStatus: { available: 3, total: 15 }
    },
    {
      icon: MdOutlineSportsBasketball,
      title: "3x3 Basketball",
      category: "Sports",
      slotStatus: { available: 8, total: 20 }
    },
    {
      icon: MdOutlineCode,
      title: "Hackathon 2026",
      category: "Technology",
      slotStatus: { available: 2, total: 25 }
    },
    {
      icon: MdOutlineArtTrack,
      title: "Art Exhibition",
      category: "Fine Arts",
      slotStatus: { available: 0, total: 30 }
    },
    {
      icon: MdOutlineScience,
      title: "Science Fair",
      category: "Science",
      slotStatus: { available: 12, total: 40 }
    },
    {
      icon: MdOutlineRestaurantMenu,
      title: "Culinary Clash",
      category: "Food",
      slotStatus: { available: 4, total: 16 }
    },
    {
      icon: MdOutlineTheaterComedy,
      title: "Drama Festival",
      category: "Theatre",
      slotStatus: { available: 6, total: 25 }
    },
    {
      icon: MdOutlineEmojiEvents,
      title: "Talent Hunt",
      category: "General",
      slotStatus: { available: 15, total: 50 }
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background with gradient orbs */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Competitions</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Discover your passion and compete with the best. Secure your spot before they're gone!
        </p>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {competitions.map((competition, index) => (
            <CompetitionCard 
              key={index}
              icon={competition.icon as React.ElementType}
              title={competition.title}
              category={competition.category}
              slotStatus={competition.slotStatus}
            />
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="relative z-10 text-center mt-12">
        <button className="group inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-yellow-500/50 text-yellow-400 font-semibold rounded-full hover:bg-yellow-500/10 transition-all duration-300 hover:scale-105 hover:border-yellow-400">
          <span>View All Competitions</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient-x {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default CompetitionCards;