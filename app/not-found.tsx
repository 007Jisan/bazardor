// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-bold text-gray-200 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">পেজটি খুঁজে পাওয়া যায়নি!</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        আপনি যে পেজটি খুঁজছেন তা হয়তো ডিলিট হয়ে গেছে বা লিংকটি ভুল। দয়া করে সঠিক লিংক চেক করুন।
      </p>
      <Link href="/" className="px-6 py-3 bg-[#10B981] text-white font-semibold rounded-md hover:bg-[#059669] transition-colors">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}