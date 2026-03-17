import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";
import targetGif from "../../assets/c.gif";

// 🎥 Videos
import sportsVideo from "../../assets/sports.mp4";
import artsVideo from "../../assets/Visual.mp4";
import funVideo from "../../assets/Visual.mp4";

type Event = {
  id: number;
  name: string;
  type: string;
  age_group: string;
  image: string;
};

type Category = {
  id: number;
  name: string;
  description: string;
  image: string;
  events: Event[];
};

export default function EventsByCategory() {
  const { id } = useParams();
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    api
      .get(`/categories/${id}`)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // 🎯 Video Mapping
  const videoMap: { [key: string]: string } = {
    sports: sportsVideo,
    visual: artsVideo,
    arts: artsVideo,
    fun: funVideo,
    misc: funVideo,
  };

  // 🔥 Dynamic Video Selector
  const getVideoByCategory = (name: string) => {
    const key = name.toLowerCase();

    const matchedKey = Object.keys(videoMap).find((k) =>
      key.includes(k)
    );

    return matchedKey ? videoMap[matchedKey] : sportsVideo;
  };

  // ⏳ Loading State
  if (!category)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 font-medium animate-pulse">
          Loading events...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🎥 VIDEO BANNER */}
      <div className="relative h-64 md:h-[350px] w-full overflow-hidden shadow-lg">
        <video
          key={category.name} // 🔥 important for reload
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src={getVideoByCategory(category.name)}
            type="video/mp4"
          />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl text-white font-black uppercase tracking-widest drop-shadow-md">
            {category.name}
          </h1>
        </div>
      </div>

      {/* 📦 EVENTS SECTION */}
      <div className="max-w-7xl mx-auto p-6 md:p-8">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <img
              src={targetGif}
              className="w-10 h-10 rounded-full border-2 border-blue-500"
              alt="icon"
            />
            Events in this Category
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.events.map((event) => (
            <div
              key={event.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col overflow-hidden border border-gray-100"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-52">
                {event.image && (
                  <img
                    src={`http://127.0.0.1:8000/storage/${event.image}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={event.name}
                  />
                )}

                <div className="absolute top-3 right-3 bg-white/90 px-3 py-0.5 rounded-full text-[10px] font-bold text-blue-600 uppercase">
                  {event.type}
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex-grow flex flex-col items-center justify-center text-center">
                <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {event.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  Age:{" "}
                  <span className="font-semibold text-gray-700">
                    {event.age_group}
                  </span>
                </p>
              </div>

              {/* Link */}
              <div className="px-6 py-4 flex justify-end items-center bg-gray-50/30 border-t border-gray-50">
                <Link
                  to={`/event-details/${event.id}`}
                  className="group/link flex items-center text-blue-600 font-bold text-xs tracking-widest hover:text-blue-800"
                >
                  VIEW DETAILS
                  <span className="ml-1.5 transform transition-transform duration-300 group-hover/link:translate-x-1.5">
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}