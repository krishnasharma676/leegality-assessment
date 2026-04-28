import { ShoppingBag, User, Menu, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ toggleSidebar, hideToggle }) {
  return (
    <nav className="flex h-16 shrink-0 items-center justify-between bg-white px-6 md:px-12 text-slate-900 border-b border-slate-100 z-50">
      <div className="flex items-center gap-6">
        {!hideToggle && (
          <button 
            onClick={toggleSidebar}
            className="rounded-lg p-2 hover:bg-slate-50 lg:hidden text-slate-600 transition-colors"
          >
            <Menu size={20} />
          </button>
        )}
        
        <Link to="/" className="flex items-center gap-2 group">
           <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-xl transition-transform group-hover:rotate-12">L</div>
           <span className="font-black text-lg uppercase tracking-tighter">Leegality<span className="text-blue-600">.</span></span>
        </Link>
      </div>

      <div className="flex items-center gap-3 md:gap-6">

        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400">
            <Bell size={18} />
          </button>
          <button className="relative p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-600">
            <ShoppingBag size={20} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-slate-900 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white">3</span>
          </button>
          <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-600">
            <User size={20} />
          </button>
          <div className="hidden sm:block w-9 h-9 rounded-full border border-slate-100 overflow-hidden shadow-sm bg-slate-50 ml-2">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
          </div>
        </div>
      </div>
    </nav>
  );
}