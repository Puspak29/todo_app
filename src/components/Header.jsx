import { CheckCircle, LogIn, LogOut } from "lucide-react";

const Header = ({ user, setUser, setAuthMode, setShowAuthModal, filter, setFilter }) => (
  <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
    <div className="flex items-center justify-between w-full md:w-auto">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <CheckCircle size={24} />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-800">TaskFlow</h1>
        </div>
      </div>
      <div className="md:hidden">
        {user ? (
          <button onClick={() => setUser(null)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
            <LogOut size={22} />
          </button>
        ) : (
          <button onClick={() => { setAuthMode('login'); setShowAuthModal(true); }} className="p-2 text-blue-600">
            <LogIn size={22} />
          </button>
        )}
      </div>
    </div>

    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
      <div className="hidden md:flex items-center gap-3 pr-4 border-r border-slate-200">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800 leading-tight">{user.name}</p>
              <button onClick={() => setUser(null)} className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors">Sign Out</button>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold border-2 border-white shadow-sm">{user.name.charAt(0)}</div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={() => { setAuthMode('login'); setShowAuthModal(true); }} className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors">Log In</button>
            <button onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }} className="px-5 py-2 bg-slate-800 text-white text-sm font-bold rounded-xl hover:bg-slate-900 transition-all shadow-md active:scale-95">Sign Up</button>
          </div>
        )}
      </div>

      <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 w-full md:w-auto">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 ${
              filter === f ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
    </div>
  </header>
);

export default Header;