// app/(auth)/signup/page.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("অ্যাকাউন্ট তৈরি সফল হয়েছে!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4 mb-20">
      <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="text-sm text-gray-500">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">নাম</label>
            <input 
              type="text" 
              required
              placeholder="যেমন: রহিম উদ্দিন" 
              className="w-full border border-gray-200 bg-gray-50 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-[#10B981] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">ইমেইল</label>
            <input 
              type="email" 
              required
              placeholder="you@example.com" 
              className="w-full border border-gray-200 bg-gray-50 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-[#10B981] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">পাসওয়ার্ড</label>
            <input 
              type="password" 
              required
              placeholder="কমপক্ষে ৮ অক্ষর" 
              className="w-full border border-gray-200 bg-gray-50 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-[#10B981] transition-colors"
            />
          </div>
          
          {/* Missing Confirm Password Field Added */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">পাসওয়ার্ড নিশ্চিত করুন</label>
            <input 
              type="password" 
              required
              placeholder="আবার লিখুন" 
              className="w-full border border-gray-200 bg-gray-50 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-[#10B981] transition-colors"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#10B981] text-white font-bold py-2.5 rounded-md hover:bg-[#059669] transition-colors mt-2"
          >
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <hr className="w-full border-gray-200" />
          <span className="px-3 text-xs font-medium text-gray-500">অথবা</span>
          <hr className="w-full border-gray-200" />
        </div>

        {/* Social Buttons - Now Side by Side */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button className="w-full sm:w-1/2 border border-gray-200 bg-white text-gray-700 py-2 rounded-md hover:bg-gray-50 flex items-center justify-center gap-2 text-sm font-medium transition-colors">
            <span className="text-lg font-bold text-blue-500">G</span> Google দিয়ে চালিয়ে যান
          </button>
          <button className="w-full sm:w-1/2 border border-gray-200 bg-white text-gray-700 py-2 rounded-md hover:bg-gray-50 flex items-center justify-center gap-2 text-sm font-medium transition-colors">
            <span className="text-lg font-bold">🐙</span> GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          অ্যাকাউন্ট আছে? <Link href="/signin" className="text-[#10B981] font-bold hover:underline">সাইন ইন করুন</Link>
        </p>
      </div>
    </div>
  );
}