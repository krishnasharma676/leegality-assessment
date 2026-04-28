import { Link } from 'react-router-dom';
import { Star, Plus } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { id, title, price, image, rating } = product;
  const inrPrice = Math.floor(price * 80);

  return (
    <div className="flex h-full flex-col bg-white group border border-slate-100 rounded-2xl overflow-hidden hover:border-slate-300 transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)]">
      {/* Image Area - Smaller Padding */}
      <Link to={`/product/${id}`} className="relative block aspect-square p-4 bg-slate-50/50 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain mix-blend-multiply transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1 px-1.5 py-0.5 bg-white/90 backdrop-blur shadow-sm rounded-md border border-slate-50">
          <Star size={8} className="fill-yellow-400 text-yellow-400" />
          <span className="text-[9px] font-black text-slate-700">{rating.rate}</span>
        </div>
      </Link>
      
      {/* Info Area - Compact Padding */}
      <div className="flex flex-col flex-grow p-4">
        <Link to={`/product/${id}`} className="mb-2 block">
          <h3 className="line-clamp-2 text-xs font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
        </Link>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-black text-slate-900 tracking-tight">₹{inrPrice}</span>
            <span className="text-[9px] text-slate-300 line-through font-bold">₹{Math.floor(inrPrice * 1.2)}</span>
          </div>
          
          <button className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center hover:bg-blue-600 transition-all active:scale-95 shadow-sm">
             <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;