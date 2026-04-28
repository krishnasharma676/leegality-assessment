import { useState, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/product/ProductCard';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

export default function ProductListing() {
  const { globalSearch, activeCategory, priceRange } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [categoryPages, setCategoryPages] = useState({});
  const pageSize = 4;

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        const cats = [...new Set(data.map(p => p.category))];
        const initialPages = {};
        cats.forEach(c => initialPages[c] = 1);
        setCategoryPages(initialPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredBase = useMemo(() => {
    let items = [...products];
    if (globalSearch) {
      items = items.filter(p => p.title.toLowerCase().includes(globalSearch.toLowerCase()));
    }
    if (priceRange.min) {
      items = items.filter(p => (p.price * 80) >= Number(priceRange.min));
    }
    if (priceRange.max) {
      items = items.filter(p => (p.price * 80) <= Number(priceRange.max));
    }
    return items;
  }, [products, globalSearch, priceRange]);

  const groupedProducts = useMemo(() => {
    const groups = {};
    if (activeCategory !== 'all') {
      groups[activeCategory] = filteredBase.filter(p => p.category === activeCategory);
    } else {
      filteredBase.forEach(p => {
        if (!groups[p.category]) groups[p.category] = [];
        groups[p.category].push(p);
      });
    }
    return groups;
  }, [filteredBase, activeCategory]);

  const handlePageChange = (cat, direction) => {
    setCategoryPages(prev => ({
      ...prev,
      [cat]: direction === 'next' ? prev[cat] + 1 : Math.max(1, prev[cat] - 1)
    }));
  };

  if (loading) return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
    </div>
  );

  const categoriesToShow = Object.keys(groupedProducts);

  return (
    <div className="space-y-12 pb-16 animate-fade">
      {categoriesToShow.length > 0 ? (
        categoriesToShow.map(cat => {
          const catProducts = groupedProducts[cat];
          const currentPage = categoryPages[cat] || 1;
          const totalPages = Math.ceil(catProducts.length / pageSize);
          const startIndex = (currentPage - 1) * pageSize;
          const paginatedItems = catProducts.slice(startIndex, startIndex + pageSize);

          return (
            <section key={cat} className="space-y-6">
              {/* COMPACT CATEGORY HEADER */}
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-black text-slate-900 capitalize tracking-tight shrink-0">
                  {cat}
                </h2>
                <div className="h-[1px] flex-1 bg-slate-100" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                  {catProducts.length} Items
                </span>
              </div>

              {/* TIGHTER PRODUCT GRID */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {paginatedItems.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {/* COMPACT CENTERED PAGINATION */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-6 pt-2">
                  <button 
                    onClick={() => handlePageChange(cat, 'prev')}
                    disabled={currentPage === 1}
                    className="h-8 w-8 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:border-slate-900 hover:text-slate-900 disabled:opacity-20 transition-all shadow-sm"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  <div className="flex items-center gap-1.5">
                     {Array.from({ length: totalPages }).map((_, i) => (
                       <div 
                         key={i} 
                         className={`h-1 rounded-full transition-all duration-300 ${currentPage === i + 1 ? 'w-4 bg-slate-900' : 'w-1 bg-slate-200'}`} 
                       />
                     ))}
                  </div>

                  <button 
                    onClick={() => handlePageChange(cat, 'next')}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:border-slate-900 hover:text-slate-900 disabled:opacity-20 transition-all shadow-sm"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </section>
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30">
          <p className="text-sm font-bold text-slate-400">No matching products.</p>
        </div>
      )}
    </div>
  );
}
