"use client";
import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

// মেইন কনটেন্ট আলাদা কম্পোনেন্টে রাখা হলো
function CategoryContent() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    if (!slug) return;
    // API Link Updated Below
    fetch("https://openapi.programming-hero.com/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((p: any) => p.category === slug);
        setProducts(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "asc") return a.today - b.today;
    if (sortOrder === "desc") return b.today - a.today;
    return 0; 
  });

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 min-h-[60vh]">
        <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি!</h2>
        <Link href="/" className="px-6 py-3 bg-[#10B981] text-white rounded-md hover:bg-[#059669]">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-3xl">{products[0]?.categoryIcon}</span> 
            {products[0]?.categoryNameBn}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{products.length}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">সাজান:</label>
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm outline-none focus:border-[#10B981]"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

// Suspense দিয়ে র‍্যাপ করে এক্সপোর্ট করা হলো
export default function CategoryPage() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-lg font-semibold text-gray-500 min-h-[60vh]">
        লোড হচ্ছে...
      </div>
    }>
      <CategoryContent />
    </Suspense>
  );
}