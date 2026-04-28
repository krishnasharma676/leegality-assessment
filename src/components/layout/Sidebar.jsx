export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-50 p-5">
      <input
        placeholder="Search..."
        className="mb-5 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
      />

      <h3 className="mb-3 text-sm font-semibold text-slate-800">
        Categories
      </h3>

      <div className="space-y-2 text-sm text-slate-700">
        {["Smartphones", "Laptops", "Fragrances", "Skincare", "Groceries"].map(
          (item) => (
            <label key={item} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-blue-500" />
              {item}
            </label>
          )
        )}
      </div>

      <h3 className="mb-3 mt-6 text-sm font-semibold text-slate-800">
        Price Range
      </h3>

      <div className="flex gap-2">
        <input
          placeholder="Min"
          className="w-1/2 rounded border border-slate-300 px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          placeholder="Max"
          className="w-1/2 rounded border border-slate-300 px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button className="mt-3 w-full rounded bg-blue-500 py-2 text-sm font-semibold text-white hover:bg-blue-600">
        Apply
      </button>

      <h3 className="mb-3 mt-6 text-sm font-semibold text-slate-800">
        Brands
      </h3>

      <div className="space-y-2 text-sm text-slate-700">
        {["Apple", "Samsung", "Huawei", "Xiaomi", "OPPO"].map((brand) => (
          <label key={brand} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-blue-500" />
            {brand}
          </label>
        ))}
      </div>
    </aside>
  );
}