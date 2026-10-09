// app/profile/page.tsx
"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [name, setName] = useState("Rezwan Ahmed");
  const [loading, setLoading] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("তথ্য আপডেট সফল হয়েছে!");
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("সাইন আউট সফল হয়েছে!");
    window.location.href = "/signin"; // Sign out kore sign in page e pathiye dibe
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-[60vh]">
      
      {/* Top Profile Card */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rezwan" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{name}</h2>
            <p className="text-gray-500 text-sm mt-0.5">rezwanahmed@gmail.com</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 bg-red-50 rounded-md hover:bg-red-100 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          সাইন আউট
        </button>
      </div>

      {/* Update Info Form */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
        <h3 className="text-lg font-bold text-gray-900 mb-6">তথ্য</h3>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">নাম</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-200 bg-gray-50 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-[#10B981] transition-colors"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#10B981] text-white font-bold py-2.5 rounded-md hover:bg-[#059669] transition-colors mt-2"
          >
            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </div>
    </div>
  );
}