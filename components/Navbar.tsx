"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [currentDate, setCurrentDate] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    setCurrentDate(new Intl.DateTimeFormat('bn-BD', options).format(new Date()));

    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left: Logo & Date */}
        <div className="flex flex-col">
          <Link href="/" className="text-2xl font-bold text-[#10B981] flex items-center gap-2">
            <img src="/logo-icon.png" alt="Bazar Dor Logo" className="w-8 h-8 object-contain" />
            বাজার দর
          </Link>
          <span className="text-xs text-gray-500 mt-0.5 min-h-[16px] font-medium">
            {currentDate}
          </span>
        </div>

        {/* Middle: Category Links */}
        <div className="hidden md:flex gap-6 font-medium text-gray-600">
          <Link href="/category/chal" className="hover:text-[#10B981] transition-colors">চাল</Link>
          <Link href="/category/dal" className="hover:text-[#10B981] transition-colors">ডাল</Link>
          <Link href="/category/tel" className="hover:text-[#10B981] transition-colors">তেল</Link>
          <Link href="/category/sobji" className="hover:text-[#10B981] transition-colors">সবজি</Link>
          <Link href="/category/mach" className="hover:text-[#10B981] transition-colors">মাছ</Link>
          <Link href="/category/mangsho" className="hover:text-[#10B981] transition-colors">মাংস</Link>
        </div>

        {/* Right: Auth Buttons or Profile */}
        <div className="flex gap-3">
          {isLoggedIn ? (
            <Link href="/profile" className="px-5 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2">
              <span className="text-lg">👤</span> প্রোফাইল
            </Link>
          ) : (
            <>
              <Link href="/signin" className="px-5 py-2 text-sm font-semibold text-[#10B981] border border-[#10B981] rounded-md hover:bg-green-50 transition-colors">
                সাইন ইন
              </Link>
              <Link href="/signup" className="px-5 py-2 text-sm font-semibold text-white bg-[#10B981] rounded-md hover:bg-[#059669] transition-colors">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
        
      </div>
    </nav>
  );
}