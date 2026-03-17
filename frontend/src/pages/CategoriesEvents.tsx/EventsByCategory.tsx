import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";
import targetGif from "../../assets/c.gif";

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
    api.get(`/categories/${id}`)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!category) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🎥 VIDEO BANNER */}
      <div className="relative h-72 overflow-hidden">

        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/banner.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl text-white font-black uppercase tracking-widest">
            {category.name}
          </h1>
        </div>
      </div>

      {/* 📦 EVENTS SECTION */}
      <div className="max-w-7xl mx-auto p-8">

        {/* 🔥 HEADING WITH ROUND GIF */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
            
            <img
              src={targetGif}
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
            />

            Events in this Category
          </h2>

          <div className="w-20 h-1 bg-blue-600 mx-auto mt-3 rounded"></div>
        </div>

        {/* 🎴 EVENTS GRID */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.events.map((event) => (
            <div
              key={event.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 flex flex-col overflow-hidden border border-gray-100"
            >

              {/* 🖼️ IMAGE */}
              <div className="relative overflow-hidden h-52">
                {event.image && (
                  <img
                    src={`http://127.0.0.1:8000/storage/${event.image}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={event.name}
                  />
                )}

                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-blue-600">
                  {event.type}
                </div>
              </div>

              {/* 📌 DETAILS */}
              <div className="p-6 text-center">
                <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-600">
                  {event.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  Target Group: 
                  <span className="text-gray-800"> {event.age_group}</span>
                </p>
              </div>

              {/* 🔗 LINK */}
              <div className="px-6 py-4 flex justify-end">
                <Link
                  to={`/event-details/${event.id}`}
                  className="text-blue-600 font-bold text-sm hover:text-blue-800"
                >
                  VIEW DETAILS →
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}