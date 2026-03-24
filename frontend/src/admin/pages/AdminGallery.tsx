import React, { useEffect, useState } from "react";
import api from "../../api";
import axios from "axios";
import { FaCloudUploadAlt, FaImages } from "react-icons/fa";

type Category = {
  id: number;
  name: string;
};

export default function AdminGallery() {
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleUpload = async () => {
    if (!image || !category) {
      return alert("Please select both an image and a category");
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("category", category);

    try {
      await api.post("/gallery", formData);
      alert("Gallery image uploaded successfully!");
      setImage(null);
      setCategory("");
    } catch (error) {
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 px-4 py-12">
      
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100 relative">
        
        {/* Top Glow Line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600"></div>

        <div className="p-8 md:p-10">
          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="bg-slate-950 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-amber-500/20">
              {/* Using createElement to bypass JSX component type errors */}
              {React.createElement(FaImages as any, { className: "text-amber-500 text-2xl" })}
            </div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              Upload Gallery <span className="text-amber-500">Image</span>
            </h2>
            <p className="text-slate-500 text-sm mt-1 font-medium">Add new memories to your event gallery</p>
          </div>

          <div className="space-y-6">
            {/* IMAGE UPLOAD AREA */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Step 1: Select Visual
              </label>
              <div className="relative group border-2 border-dashed border-slate-200 rounded-2xl p-8 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer text-center">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {/* Fixed Icon Rendering */}
                {React.createElement(FaCloudUploadAlt as any, { 
                  className: "mx-auto text-4xl text-slate-300 group-hover:text-amber-500 transition-colors mb-2" 
                })}
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
                  {image ? image.name : "Drag & Drop or Click to Browse"}
                </p>
                {image && (
                    <p className="mt-2 text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded-full inline-block">
                        Ready to upload
                    </p>
                )}
              </div>
            </div>

            {/* CATEGORY SELECT */}
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Step 2: Assign Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-4 text-sm font-bold text-slate-700 outline-none focus:border-amber-500 transition-all appearance-none cursor-pointer"
              >
                <option value="">Choose category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* ACTION BUTTON */}
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className={`w-full py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] transition-all duration-300 shadow-xl flex items-center justify-center gap-3 ${
                isUploading 
                ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                : "bg-slate-950 text-amber-500 border border-amber-500/30 hover:bg-slate-900 shadow-amber-500/10 active:scale-95"
              }`}
            >
              {isUploading ? "Uploading..." : "Start Upload"}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50 text-center">
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">
              Max file size: 5MB • Supported: JPG, PNG, WEBP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}