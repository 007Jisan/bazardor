import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Ticker from "@/components/Ticker";

// Fetch data from API
async function getProducts() {
  try {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products", {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  // API ডাটা অনুযায়ী Sorting লজিক
  const risers = [...products]
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  const fallers = [...products]
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f9fafb]">
      {/* Infinite Ticker */}
      <Ticker products={products} />

      {/* Hero Section */}
      <Hero />

      <div className="max-w-6xl mx-auto px-4 pb-20 space-y-16">
        
        {/* Section A: Top Risers */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-red-500">▲</span> আজ দাম বেড়েছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {risers.map((product: any) => (
              <ProductCard key={`riser-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        {/* Section B: Top Fallers */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-[#10B981]">▼</span> আজ দাম কমেছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {fallers.map((product: any) => (
              <ProductCard key={`faller-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        {/* Section C: All Products */}
        <section id="all-products" className="scroll-mt-24">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>
            <p className="text-gray-500 text-sm mt-1">সব প্রয়োজনীয় পণ্যের আজকের বাজার দর</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product: any) => (
              <ProductCard key={`all-${product.id}`} product={product} />
            ))}
          </div>
        </section>
        
      </div>
    </main>
  );
}