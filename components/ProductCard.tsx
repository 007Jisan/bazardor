import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
  // Unit translate
  const unitTranslate: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    gm: "গ্রাম"
  };
  const displayUnit = unitTranslate[product.unit] || product.unit;

  // Change logic
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const badgeColor = isUp ? "text-red-500 bg-red-50" : isDown ? "text-[#10B981] bg-green-50" : "text-gray-500 bg-gray-100";
  const arrow = isUp ? "▲" : isDown ? "▼" : "—";
  const percentage = product.change?.pct || 0;

  return (
    <Link href={`/product/${product.slug || product.id}`}>
      <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow flex flex-col h-full cursor-pointer">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl bg-gray-50 p-2 rounded-lg">{product.image || product.categoryIcon || "📦"}</span>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{product.nameBn}</h3>
            <p className="text-sm text-gray-500">প্রতি {displayUnit}</p>
          </div>
        </div>
        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
            <p className="text-xl font-bold text-gray-900">{product.today} টাকা</p>
          </div>
          <div className={`px-2 py-1 rounded text-xs font-bold ${badgeColor}`}>
            {arrow} {percentage}%
          </div>
        </div>
      </div>
    </Link>
  );
}