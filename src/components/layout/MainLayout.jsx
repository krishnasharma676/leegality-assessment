import { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { Search, Filter, X, LayoutGrid, CircleDollarSign } from 'lucide-react';
import { fetchCategories } from '../../services/api';

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  
  const location = useLocation();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    async function getCats() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    getCats();
  }, []);

  const isProductDetail = location.pathname.startsWith('/product/');
  const isHome = location.pathname === '/';

  return (
    <div className="app-container">
      {/* PERSISTENT FULL-HEIGHT SIDEBAR - Hidden on Product Detail */}
      {!isProductDetail && (
        <aside className={`sidebar-wrapper ${isSidebarOpen ? 'open' : ''}`}>
          <div className="flex flex-col h-full">
            {/* Logo Section */}
            <div className="h-16 flex items-center px-6 border-b border-slate-50 shrink-0">
               <Link to="/" className="flex items-center gap-2 group">
                  <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg transition-transform group-hover:rotate-12">L</div>
                  <span className="font-black text-lg tracking-tight uppercase">Leegality<span className="text-blue-500">.</span></span>
               </Link>
               <button onClick={toggleSidebar} className="lg:hidden ml-auto p-2"><X size={20}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {isHome ? (
                <>
                  {/* Search */}
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      <Search size={14} /> Search
                    </h4>
                    <input
                      type="text"
                      placeholder="Find products..."
                      value={globalSearch}
                      onChange={e => setGlobalSearch(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                    />
                  </div>

                  {/* Categories */}
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      <Filter size={14} /> Categories
                    </h4>
                    <div className="space-y-1">
                      <button
                        onClick={() => setActiveCategory('all')}
                        className={`flex items-center gap-3 w-full p-2.5 rounded-xl text-sm font-bold transition-all ${activeCategory === 'all' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'}`}
                      >
                        <LayoutGrid size={16} /> All Items
                      </button>
                      {categories.map(c => (
                        <button
                          key={c}
                          onClick={() => setActiveCategory(c)}
                          className={`flex items-center gap-3 w-full p-2.5 rounded-xl text-sm font-bold capitalize transition-all ${activeCategory === c ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                          <span className="w-4 h-4 flex items-center justify-center">•</span> {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      <CircleDollarSign size={14} /> Price Range (₹)
                    </h4>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={e => setPriceRange(prev => ({...prev, min: e.target.value}))}
                        className="w-1/2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-blue-500 shadow-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={e => setPriceRange(prev => ({...prev, max: e.target.value}))}
                        className="w-1/2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-blue-500 shadow-sm"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-10 text-center">
                   <Link to="/" className="text-xs font-black uppercase text-blue-600 hover:underline font-outfit">← Back to Shop</Link>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-slate-50">
               <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Customer Care</p>
                  <p className="text-xs font-bold text-slate-600">care@leegality.com</p>
               </div>
            </div>
          </div>
        </aside>
      )}

      {/* RIGHT COLUMN */}
      <div className={`right-column ${isProductDetail ? 'w-full' : ''}`}>
        <Navbar toggleSidebar={toggleSidebar} hideToggle={isProductDetail} />
        <div className="content-scroll">
          <Outlet context={{ 
            globalSearch, setGlobalSearch, 
            activeCategory, setActiveCategory,
            priceRange, setPriceRange
          }} />
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && !isProductDetail && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden" onClick={toggleSidebar} />
      )}
    </div>
  );
}