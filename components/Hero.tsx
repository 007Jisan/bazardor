import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white py-12 md:py-20 mb-8 border-b">
      <div className="max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
        <div className="w-full md:w-1/2 flex flex-col items-start gap-4">
          <span className="text-sm font-semibold text-[#10B981] bg-green-50 px-3 py-1 rounded-full">
            বাজার আপডেট
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-600 text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#all-products" className="mt-4 px-6 py-3 bg-[#10B981] text-white font-semibold rounded-md hover:bg-[#059669] transition-colors shadow-lg">
            সব পণ্য দেখুন
          </a>
        </div>
        
        {/* Hero Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img 
            src="/bazar-hero.png" 
            alt="Bazar Dor Hero" 
            className="w-full max-w-md object-contain drop-shadow-md" 
          />
        </div>
      </div>
    </section>
  );
}