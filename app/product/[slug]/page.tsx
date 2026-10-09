// app/product/[slug]/page.tsx
"use client";
import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

function ProductContent() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch("https://api.api-store.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        // slug অথবা id দিয়ে প্রোডাক্টটি খুঁজে বের করা
        const found = data.find((p: any) => p.slug === slug || p.id.toString() === slug);
        setProduct(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 min-h-[60vh] flex flex-col gap-6">
        <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">পণ্যটি পাওয়া যায়নি!</h2>
        <Link href="/" className="px-6 py-3 bg-[#10B981] text-white rounded-md hover:bg-[#059669]">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  // ইউনিট কনভার্শন
  const unitTranslate: Record<string, string> = { kg: "কেজি", liter: "লিটার", dozen: "ডজন", piece: "পিস", gm: "গ্রাম" };
  const displayUnit = unitTranslate[product.unit] || product.unit;

  // দামের হিসাব (সর্বনিম্ন, সর্বাধিক, গড়)
  let overallMin = product.today;
  let overallMax = product.today;
  let overallAvg = product.today;

  if (product.markets && product.markets.length > 0) {
    const mins = product.markets.map((m: any) => m.min);
    const maxs = product.markets.map((m: any) => m.max);
    overallMin = Math.min(...mins);
    overallMax = Math.max(...maxs);
    overallAvg = Math.round((overallMin + overallMax) / 2);
  }

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#10B981]">হোম</Link>
        <span>/</span>
        <Link href={`/category/${product.category}`} className="hover:text-[#10B981]">{product.categoryNameBn}</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product.nameBn}</span>
      </div>

      {/* Product Header */}
      <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm mb-8 flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="text-5xl bg-gray-50 p-4 rounded-xl border border-gray-100">{product.image || product.categoryIcon}</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{product.nameBn}</h1>
            <p className="text-gray-500">প্রতি {displayUnit} {product.categoryNameBn}</p>
            {isUp && <p className="text-red-500 text-sm mt-2 font-medium">গতকালের তুলনায় আজ দাম বেড়েছে</p>}
            {isDown && <p className="text-[#10B981] text-sm mt-2 font-medium">গতকালের তুলনায় আজ দাম কমেছে</p>}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-right min-w-[200px]">
          <p className="text-sm text-gray-500 mb-1">আজকের দাম</p>
          <p className="text-3xl font-bold text-[#10B981]">{product.today} <span className="text-base text-gray-600 font-normal">টাকা/{displayUnit}</span></p>
        </div>
      </div>

      {/* Price Summary Cards */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">দামের সারসংক্ষেপ</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col justify-center shadow-sm">
          <p className="text-sm text-gray-500 mb-2">সর্বনিম্ন দাম</p>
          <p className="text-2xl font-bold text-gray-900">{overallMin} টাকা</p>
          <p className="text-xs text-gray-400 mt-1">সবচেয়ে কম দামের বাজার</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col justify-center shadow-sm">
          <p className="text-sm text-gray-500 mb-2">সর্বাধিক দাম</p>
          <p className="text-2xl font-bold text-gray-900">{overallMax} টাকা</p>
          <p className="text-xs text-gray-400 mt-1">সবচেয়ে বেশি দামের বাজার</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col justify-center shadow-sm">
          <p className="text-sm text-gray-500 mb-2">গড় দাম</p>
          <p className="text-2xl font-bold text-gray-900">{overallAvg} টাকা</p>
          <p className="text-xs text-gray-400 mt-1">প্রতি {displayUnit}-এর হিসাবে</p>
        </div>
      </div>

      {/* Market Prices Table */}
      {product.markets && product.markets.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-gray-900 mb-4">বাজারভিত্তিক আজকের দাম</h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
                    <th className="py-4 px-6">বাজার</th>
                    <th className="py-4 px-6">বিভাগ</th>
                    <th className="py-4 px-6">সর্বনিম্ন</th>
                    <th className="py-4 px-6">সর্বাধিক</th>
                    <th className="py-4 px-6">গড়</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                  {product.markets.map((m: any, idx: number) => {
                    const avg = Math.round((m.min + m.max) / 2);
                    return (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 font-medium">{m.market}</td>
                        <td className="py-4 px-6 text-gray-500">{m.division}</td>
                        <td className="py-4 px-6">{m.min} টাকা</td>
                        <td className="py-4 px-6">{m.max} টাকা</td>
                        <td className="py-4 px-6 font-semibold">{avg} টাকা</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function ProductDetails() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto px-4 py-20 text-center font-semibold text-gray-500">
        লোড হচ্ছে...
      </div>
    }>
      <ProductContent />
    </Suspense>
  );
}