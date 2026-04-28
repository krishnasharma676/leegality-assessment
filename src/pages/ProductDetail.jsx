import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { Star, ShoppingBag, CreditCard, ShieldCheck, Truck } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    async function getProduct() {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getProduct();
  }, [id]);

  if (loading) return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
    </div>
  );

  if (error || !product) return (
    <div className="flex h-full w-full flex-col items-center justify-center p-12 text-center bg-white">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Item Unavailable</h2>
      <button onClick={() => navigate('/')} className="rounded-lg bg-slate-900 px-6 py-2 text-xs font-bold text-white uppercase tracking-widest">
        Shop Catalog
      </button>
    </div>
  );

  const finalPrice = Math.floor(product.price * 80);

  return (
    <div className="content-scroll bg-white">
      <div className="mx-auto max-w-5xl px-6 py-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          
          {/* Gallery - Very Compact */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl bg-slate-50/80 p-8 flex items-center justify-center border border-slate-100">
              <img 
                src={product.image} 
                alt={product.title} 
                className="max-h-full w-auto object-contain mix-blend-multiply"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
               {[...Array(4)].map((_, i) => (
                 <div key={i} className="aspect-square rounded-xl bg-slate-50/50 p-2 flex items-center justify-center border border-transparent">
                    <img src={product.image} className="max-h-full w-auto object-contain opacity-30" alt="" />
                 </div>
               ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col pt-2">
            <div className="mb-5">
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {product.category}
              </span>
              <h1 className="mt-3 text-xl font-black text-slate-900 leading-snug uppercase tracking-tight">
                {product.title}
              </h1>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1 font-black text-slate-900 text-[10px]">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  {product.rating.rate}
                </div>
                <div className="h-2 w-[1px] bg-slate-200" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {product.rating.count} Verified Reviews
                </span>
              </div>
            </div>

            <div className="mb-6 p-5 rounded-xl bg-slate-50 border border-slate-100">
               <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900 tracking-tighter">₹{finalPrice}</span>
                  <span className="text-xs text-slate-300 line-through font-bold">₹{Math.floor(finalPrice * 1.3)}</span>
                  <span className="ml-auto text-[9px] font-black text-emerald-600 uppercase">In Stock</span>
               </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-medium mb-8 line-clamp-4">
              {product.description}
            </p>

            <div className="mt-auto space-y-2">
              <div className="flex gap-2">
                <div className="flex items-center rounded-lg border border-slate-200 bg-white">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-10 w-10 text-sm font-bold hover:bg-slate-50 rounded-l-lg">-</button>
                  <span className="w-8 text-center text-xs font-black text-slate-900">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="h-10 w-10 text-sm font-bold hover:bg-slate-50 rounded-r-lg">+</button>
                </div>
                <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-slate-900 h-10 px-4 font-black text-white text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-md">
                  <ShoppingBag size={14} /> Add to Cart
                </button>
              </div>
              <button className="w-full h-10 rounded-lg border border-slate-900 font-black text-slate-900 text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                Quick Checkout
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-3 gap-1">
              <div className="flex flex-col items-center gap-1">
                 <ShieldCheck size={16} className="text-slate-300" />
                 <span className="text-[8px] font-black uppercase text-slate-300 tracking-tighter">Secure</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                 <Truck size={16} className="text-slate-300" />
                 <span className="text-[8px] font-black uppercase text-slate-300 tracking-tighter">Express</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                 <CreditCard size={16} className="text-slate-300" />
                 <span className="text-[8px] font-black uppercase text-slate-300 tracking-tighter">Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
