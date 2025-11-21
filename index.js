import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, Star, MapPin, Search, Plus, Minus, X, ArrowLeft, 
  User, Coffee, Printer, Utensils, Sun, Moon, LogOut, CheckCircle, 
  Clock, Truck, ChevronRight, Upload, FileText, ShieldCheck, Crown,
  Smartphone, Lock, Send, Zap, ChevronDown, Sparkles, Users, 
  Share2, Activity, Gift, Palette, AlertCircle, Flame, Percent,
  Mic, Camera, CloudRain, CloudSnow, CloudLightning, Rocket, Box
} from 'lucide-react';

// --- MOCK DATA ---

const CAMPUS_LOCATIONS = [
  "PEC Campus (Sector 12)", "Hostel Himalaya", "Hostel Shivalik", "Academic Block 1", "Cyber Cafe"
];

const LIVE_UPDATES = [
  "🔥 Riya just ordered Masala Maggi from F&K",
  "🖨️ Aman is printing 50 pages at PEC Stationary",
  "🍔 12 Cheese Burgers ordered at Combo Foods",
  "☕ Nescafe is trending: Hazelnut Frappe is selling fast!",
  "🍛 Deshraj Thali stock running low!"
];

const VENDORS = [
  { id: 1, role: 'vendor', shopName: 'Combo Foods', cuisine: 'Fast Food', rating: 4.5, reviewCount: 230, time: 15, image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500', type: 'food' },
  { id: 2, role: 'vendor', shopName: 'Deshraj', cuisine: 'Indian Thali', rating: 4.8, reviewCount: 450, time: 25, image: 'https://images.unsplash.com/photo-1585937421612-70a008356f36?w=500', type: 'food' },
  { id: 3, role: 'vendor', shopName: 'Gyoza', cuisine: 'Momos & Chinese', rating: 4.6, reviewCount: 180, time: 20, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500', type: 'food' },
  { id: 4, role: 'vendor', shopName: 'Verka', cuisine: 'Dairy & Snacks', rating: 4.7, reviewCount: 300, time: 5, image: 'https://images.unsplash.com/photo-1626202157225-a26b0f746e41?w=500', type: 'food' },
  { id: 5, role: 'vendor', shopName: 'F & K', cuisine: 'Maggi & Tea', rating: 4.9, reviewCount: 520, time: 10, image: 'https://images.unsplash.com/photo-1614978132045-7043a7bd6f6d?w=500', type: 'food' },
  { id: 6, role: 'vendor', shopName: 'Nescafe', cuisine: 'Coffee', rating: 4.4, reviewCount: 150, time: 5, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500', type: 'food' },
  { id: 101, role: 'vendor', shopName: 'PEC Stationary', cuisine: 'Stationary', rating: 4.8, reviewCount: 90, time: 10, image: 'https://images.unsplash.com/photo-1576606539318-947560725729?w=500', type: 'print' },
];

const MENU_ITEMS = [
  { id: 1, vendorId: 1, name: "Cheese Burger", price: 120, desc: "Burger + Coke + Fries", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
  { id: 2, vendorId: 1, name: "Paneer Wrap", price: 90, desc: "Spicy paneer filling", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500" },
  { id: 30, vendorId: 2, name: "Student Thali", price: 80, desc: "Dal, Sabzi, 4 Roti, Rice", image: "https://images.unsplash.com/photo-1585937421612-70a008356f36?w=500" },
  { id: 31, vendorId: 2, name: "Special Thali", price: 150, desc: "Paneer + Sweet + Salad", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500" },
  { id: 60, vendorId: 3, name: "Steamed Momos (8pcs)", price: 70, desc: "With spicy chutney", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500" },
  { id: 61, vendorId: 3, name: "Kurkure Momos", price: 100, desc: "Crunchy fried goodness", image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=500" },
  { id: 90, vendorId: 4, name: "Lassi Glass", price: 40, desc: "Sweet chilled lassi", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=500" },
  { id: 120, vendorId: 5, name: "Masala Maggi", price: 50, desc: "Didi special recipe", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500" },
  { id: 121, vendorId: 5, name: "Adrak Chai", price: 20, desc: "Exam stress buster", image: "https://images.unsplash.com/photo-1576092768241-dec231847233?w=500" },
];

const INITIAL_REVIEWS = [
  { vendorId: 5, user: "Riya", rating: 5, comment: "Maggi is life saver during exams!", date: "1 day ago" },
  { vendorId: 2, user: "Arjun", rating: 5, comment: "Best thali in campus.", date: "2 days ago" },
];

// --- UTILITY ---
const getFallbackImage = (img) => img || `https://source.unsplash.com/random/500x500/?food&sig=${Math.random()}`;

// --- COMPONENTS ---

const Toast = ({ message, type, color }) => (
  <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-[130] flex items-center gap-3 px-8 py-4 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] animate-bounce-in border-l-8 backdrop-blur-3xl bg-white/90 dark:bg-black/90 ${type === 'success' ? `text-${color}-500 border-${color}-500` : 'text-red-500 border-red-500'} transition-all duration-300 hover:scale-105`}>
    {type === 'success' ? <CheckCircle size={28} className="animate-pulse" /> : <X size={28} />}
    <span className="font-black text-lg tracking-wide uppercase glitch-text">{message}</span>
  </div>
);

// --- ANIMATED BACKGROUND WEATHER ---
const WeatherOverlay = ({ type }) => {
  if (!type || type === 'clear') return null;
  const particles = type === 'rain' ? 100 : 50;
  return (
    <div className="fixed inset-0 pointer-events-none z-[10]">
      {[...Array(particles)].map((_, i) => (
        <div 
          key={i} 
          className={`absolute ${type === 'rain' ? 'w-[1px] h-10 bg-blue-400/50' : 'w-2 h-2 bg-white/80 rounded-full'} animate-rain`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10%`,
            animationDuration: `${Math.random() * 1 + 0.5}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        ></div>
      ))}
      {type === 'storm' && <div className="absolute inset-0 bg-white/5 animate-pulse z-0"></div>}
    </div>
  );
};

export default function UniBiteApp() {
  // --- STATE ---
  const [view, setView] = useState('login');
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [toast, setToast] = useState(null);
  const [themeColor, setThemeColor] = useState('fuchsia'); // fuchsia, cyan, lime, orange
  
  // Data State
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [allReviews, setAllReviews] = useState(INITIAL_REVIEWS);
  const [activeVendor, setActiveVendor] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isGoldMember, setIsGoldMember] = useState(false);
  const [location, setLocation] = useState(null);
  
  // Feature States
  const [aiMode, setAiMode] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [xp, setXp] = useState(120);
  const [splitBillCount, setSplitBillCount] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // SUPER FEATURES STATE
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [spinResult, setSpinResult] = useState(null);
  const [customizingItem, setCustomizingItem] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [weather, setWeather] = useState('clear'); // clear, rain, snow, storm
  const [isListening, setIsListening] = useState(false); // Voice command
  const [groupLobby, setGroupLobby] = useState([]); // Friends avatars
  const [cyberMode, setCyberMode] = useState(false); // Glitch mode
  const [arActive, setArActive] = useState(false); // AR Preview
  const [turboDelivery, setTurboDelivery] = useState(false); // Rocket delivery

  // --- EFFECTS ---
  useEffect(() => {
    const savedOrders = localStorage.getItem('unibite_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (darkMode) document.documentElement.classList.add('dark');
  }, [darkMode]);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  // --- HANDLERS ---
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (role, username) => {
    let userData = { id: Date.now(), username: username || 'Student', role: role === 'vendor' ? 'vendor' : 'student', college: 'PEC' };
    if (role === 'vendor') {
       userData = VENDORS.find(v => v.shopName.toLowerCase() === username.toLowerCase()) || VENDORS[0];
    } else if (role === 'admin') {
       userData = { id: 999, username: 'Admin', role: 'admin', college: 'PEC' };
    }
    setUser(userData);
    setView(role === 'student' ? 'student' : role);
    if(role === 'student') {
        detectLocation();
        // Simulate friends joining lobby after login
        setTimeout(() => setGroupLobby(['https://randomuser.me/api/portraits/women/44.jpg']), 2000);
        setTimeout(() => setGroupLobby(prev => [...prev, 'https://randomuser.me/api/portraits/men/32.jpg']), 5000);
    }
  };

  const handleGoogleLogin = () => {
    showToast("Authenticating with Google...", "success");
    setTimeout(() => handleLogin('student', 'Google User'), 1500);
  };

  const detectLocation = () => setTimeout(() => setLocation(CAMPUS_LOCATIONS[0]), 1000);

  const openCustomizer = (item) => {
    setCustomizingItem({ ...item, spice: 'Medium', extraCheese: false, qty: 1 });
  };

  const confirmCustomization = () => {
    if (!customizingItem) return;
    const { id, price, name, vendorId, qty, extraCheese, spice, uploadedFile } = customizingItem;
    const finalPrice = price + (extraCheese ? 20 : 0);
    const finalName = `${name} (${spice}) ${extraCheese ? '+ Cheese' : ''}`;
    
    const newItem = { id, name: finalName, price: finalPrice, vendorId, qty, uploadedFile };
    addToCart(newItem, qty);
    setCustomizingItem(null);
  };

  const addToCart = (item, qty = 1, file = null) => {
    if (cart.length > 0 && cart[0].vendorId !== item.vendorId) {
      if (window.confirm("Clear basket for new vendor?")) setCart([{ ...item, qty, uploadedFile: file }]);
    } else {
      const existing = cart.find(i => i.id === item.id && i.name === item.name);
      existing ? setCart(cart.map(i => (i.id === item.id && i.name === item.name) ? { ...i, qty: i.qty + qty } : i)) : setCart([...cart, { ...item, qty, uploadedFile: file }]);
    }
    showToast("Added to crate", "success");
  };

  const updateCartQty = (itemId, itemName, delta) => {
    setCart(curr => curr.map(i => (i.id === itemId && i.name === itemName) ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
  };

  const placeOrder = () => {
    const newOrder = {
      id: Math.floor(1000 + Math.random() * 9000),
      items: [...cart],
      total: calculateTotal(),
      status: 'RECEIVED',
      vendorId: cart[0].vendorId,
      studentId: user.id,
      time: new Date().toLocaleTimeString(),
      isGold: isGoldMember
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    setXp(prev => prev + 100);
    setView('tracking');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
    showToast(`Order Transmitted! +100 XP`, "success");
  };

  const spinTheWheel = () => {
    setSpinResult(null);
    setTimeout(() => {
      const rewards = ["Free Coke", "20% Off", "Free Delivery", "100 XP", "Try Again"];
      const win = rewards[Math.floor(Math.random() * rewards.length)];
      setSpinResult(win);
      if(win !== "Try Again") showToast(`JACKPOT! You won: ${win}!`, "success");
    }, 2000);
  };
  
  const calculateTotal = () => {
    const itemTotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    const delivery = (isGoldMember || turboDelivery) ? 0 : 25; // Turbo makes it free? Or expensive. Let's say turbo costs extra usually but for demo free.
    const membership = isGoldMember ? 1 : 0;
    const turboCost = turboDelivery ? 50 : 0;
    return itemTotal + delivery + turboCost + 5 + Math.round(itemTotal * 0.05) + membership;
  };

  const toggleVoiceSearch = () => {
      setIsListening(true);
      showToast("Listening...", "success");
      setTimeout(() => {
          setIsListening(false);
          setSearchQuery("Butter Chicken");
          showToast("Heard: Butter Chicken", "success");
      }, 2000);
  }

  // --- DYNAMIC STYLES ---
  const getColorClass = (type) => {
    if (cyberMode) {
       // Cyber mode overrides everything to neon green/black
       const cyberMap = {
           text: 'text-green-500', bg: 'bg-green-600', border: 'border-green-500', shadow: 'shadow-green-500/50', from: 'from-green-600'
       };
       return cyberMap[type];
    }
    const map = {
      text: { fuchsia: 'text-fuchsia-500', cyan: 'text-cyan-500', lime: 'text-lime-500', orange: 'text-orange-500' },
      bg: { fuchsia: 'bg-fuchsia-600', cyan: 'bg-cyan-600', lime: 'bg-lime-600', orange: 'bg-orange-600' },
      border: { fuchsia: 'border-fuchsia-500', cyan: 'border-cyan-500', lime: 'border-lime-500', orange: 'border-orange-500' },
      shadow: { fuchsia: 'shadow-fuchsia-500/30', cyan: 'shadow-cyan-500/30', lime: 'shadow-lime-500/30', orange: 'shadow-orange-500/30' },
      from: { fuchsia: 'from-fuchsia-600', cyan: 'from-cyan-600', lime: 'from-lime-600', orange: 'from-orange-600' },
    };
    return map[type][themeColor] || map[type].fuchsia;
  };

  const appFont = cyberMode ? 'font-mono tracking-widest' : 'font-sans';

  // --- VIEWS ---

  const LoginView = () => {
    const [role, setRole] = useState('student');
    const [username, setUsername] = useState('');
    const loginFormRef = useRef(null);

    const scrollToLogin = () => loginFormRef.current?.scrollIntoView({ behavior: 'smooth' });

    return (
      <div className={`min-h-screen relative flex flex-col ${cyberMode ? 'bg-black text-green-500' : 'bg-slate-50 dark:bg-[#020205] text-slate-900 dark:text-white'} overflow-hidden transition-colors duration-500 ${appFont}`}>
        <WeatherOverlay type={weather} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className={`absolute top-[-10%] right-[-10%] w-[600px] h-[600px] ${cyberMode ? 'bg-green-900/20' : themeColor === 'fuchsia' ? 'bg-fuchsia-600/20' : 'bg-cyan-600/20'} rounded-full blur-[120px] animate-pulse`}></div>
           <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
           <div className="matrix-bg opacity-10"></div>
           <div className="grid-bg"></div>
        </div>

        <div className="absolute top-6 right-6 z-50 flex gap-3">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1 flex gap-1">
            {['fuchsia', 'cyan', 'lime', 'orange'].map(c => (
              <button key={c} onClick={() => setThemeColor(c)} className={`w-6 h-6 rounded-full ${c === 'fuchsia' ? 'bg-fuchsia-500' : c === 'cyan' ? 'bg-cyan-500' : c === 'lime' ? 'bg-lime-500' : 'bg-orange-500'} ${themeColor === c ? 'ring-2 ring-white' : ''}`}></button>
            ))}
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className={`p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:scale-110 transition ${getColorClass('text')}`}>
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center pt-20 pb-10 px-4 overflow-y-auto">
          <div className="text-center mb-8 animate-slide-up">
            <h1 className={`text-7xl md:text-9xl font-black tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r ${getColorClass('from')} to-purple-600 font-mono filter drop-shadow-lg glitch-effect`}>
              UNI<span className={`${cyberMode ? 'text-green-500' : 'text-slate-800 dark:text-white'}`}>BITE</span>
            </h1>
            <div className="flex items-center justify-center gap-3">
               <div className={`h-[1px] w-12 ${getColorClass('bg').replace('600','500')}`}></div>
               <p className={`text-sm md:text-base font-bold ${getColorClass('text')} tracking-[0.4em] uppercase`}>PEC Campus Edition</p>
               <div className={`h-[1px] w-12 ${getColorClass('bg').replace('600','500')}`}></div>
            </div>
          </div>

          {/* RESTORED INFINITE CAROUSEL */}
          <div className="w-full max-w-[95vw] mb-12 relative">
            <div className={`absolute inset-y-0 left-0 w-20 bg-gradient-to-r ${cyberMode ? 'from-black' : 'from-slate-50 dark:from-[#020205]'} to-transparent z-20`}></div>
            <div className={`absolute inset-y-0 right-0 w-20 bg-gradient-to-l ${cyberMode ? 'from-black' : 'from-slate-50 dark:from-[#020205]'} to-transparent z-20`}></div>
            <div className="gallery-container">
              <div className="gallery-track">
                {[...MENU_ITEMS, ...MENU_ITEMS, ...MENU_ITEMS].map((item, i) => (
                  <div key={i} className={`gallery-item group tilt-card ${cyberMode ? 'border-green-500' : ''}`} style={{backgroundImage: `url('${getFallbackImage(item.image)}')`}}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4 transition-all">
                      <div className="font-black text-white text-xl leading-none shadow-black drop-shadow-md truncate mb-1">{item.name}</div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md px-2 py-1 rounded text-white">₹{item.price}</span>
                        <div className={`w-8 h-8 rounded-full ${getColorClass('bg')} text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300`}>
                          <Plus size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div onClick={scrollToLogin} className="mb-16 cursor-pointer animate-bounce">
            <div className={`w-12 h-12 rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:${getColorClass('bg')} hover:text-white transition-all duration-300 shadow-lg`}>
              <ChevronDown size={24} />
            </div>
          </div>

          <div ref={loginFormRef} className="w-full max-w-md relative group">
            <div className={`absolute -inset-1 bg-gradient-to-r ${getColorClass('from')} to-purple-600 rounded-[2.2rem] blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}></div>
            <div className={`relative ${cyberMode ? 'bg-black border-green-500' : 'bg-white/80 dark:bg-[#0a0a0a]/90'} backdrop-blur-2xl p-8 rounded-[2rem] border border-white/50 dark:border-white/10 shadow-2xl`}>
              
              <div className="flex bg-slate-100 dark:bg-white/5 p-1.5 rounded-xl mb-8">
                {['student', 'vendor', 'admin'].map((r) => (
                  <button 
                    key={r}
                    onClick={() => setRole(r)}
                    className={`flex-1 py-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${role === r ? `bg-white dark:bg-white shadow-lg ${getColorClass('text').replace('500','600')} dark:text-black scale-105` : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <div className="space-y-5">
                {role === 'student' && (
                  <button onClick={handleGoogleLogin} className="w-full py-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 transition flex items-center justify-center gap-3 font-bold text-slate-700 dark:text-white group">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 group-hover:scale-110 transition" alt="G" />
                    Continue with Google
                  </button>
                )}

                {role === 'student' && <div className="flex items-center gap-4 text-xs text-slate-400 font-bold uppercase"><div className="h-px bg-slate-200 dark:bg-white/10 flex-1"></div>OR<div className="h-px bg-slate-200 dark:bg-white/10 flex-1"></div></div>}

                <div className="space-y-4">
                  <div className="relative group/input">
                    <User className={`absolute left-4 top-3.5 text-slate-400 group-focus-within/input:${getColorClass('text')} transition`} size={20} />
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={role === 'vendor' ? "Shop Name" : "Username"}
                      className={`w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white outline-none focus:${getColorClass('border')} transition font-medium placeholder:text-slate-400`}
                    />
                  </div>

                  <div className="relative group/input">
                    <Smartphone className={`absolute left-4 top-3.5 text-slate-400 group-focus-within/input:${getColorClass('text')} transition`} size={20} />
                    <input 
                      type="tel" 
                      placeholder="Phone Number"
                      className={`w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white outline-none focus:${getColorClass('border')} transition font-medium placeholder:text-slate-400`}
                    />
                  </div>

                  <div className="relative group/input">
                     <MapPin className={`absolute left-4 top-3.5 text-slate-400 group-focus-within/input:${getColorClass('text')} transition`} size={20} />
                     <select className={`w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white outline-none focus:${getColorClass('border')} transition font-medium appearance-none`}>
                      <option>Punjab Engineering College</option>
                      <option>Thapar University</option>
                    </select>
                  </div>
                </div>

                <button 
                  onClick={() => handleLogin(role, username)}
                  className={`w-full py-4 rounded-xl bg-gradient-to-r ${getColorClass('from')} to-purple-600 text-white font-black text-lg shadow-lg ${getColorClass('shadow')} hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 mt-4 flex items-center justify-center gap-2`}
                >
                  {role === 'vendor' ? 'LAUNCH SHOP' : 'ENTER CAMPUS'} <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StudentDashboard = () => {
    const filteredVendors = VENDORS.filter(v => {
      if (aiMode && isAiThinking) return false; 
      const matchesSearch = v.shopName.toLowerCase().includes(searchQuery.toLowerCase()) || v.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' ? true : (activeCategory === 'Stationary' ? v.type === 'print' : v.cuisine.includes(activeCategory));
      return matchesSearch && matchesCategory;
    });

    const trendingItems = MENU_ITEMS.slice(0, 4); 

    return (
      <div className={`pb-28 min-h-screen ${cyberMode ? 'bg-black text-green-500' : 'bg-slate-50 dark:bg-[#020205] text-slate-900 dark:text-white'} transition-colors duration-500 ${appFont}`}>
        <WeatherOverlay type={weather} />
        
        {/* SPIN WHEEL BUTTON */}
        <button onClick={() => setShowSpinWheel(true)} className={`fixed bottom-24 right-4 z-50 w-14 h-14 rounded-full ${getColorClass('bg')} text-white shadow-[0_0_20px_currentColor] flex items-center justify-center animate-bounce hover:scale-110 transition border-2 border-white/50`}>
           <Gift size={24} />
        </button>

        {/* Header */}
        <div className="sticky top-0 z-40 bg-white/80 dark:bg-[#020205]/80 backdrop-blur-lg border-b border-slate-200 dark:border-white/5 px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getColorClass('from')} to-purple-600 flex items-center justify-center text-white shadow-lg transform hover:rotate-12 transition`}>
              <span className="font-black text-xl">P</span>
            </div>
            <div>
              <h2 className="font-black text-lg leading-tight tracking-tight">PEC <span className={getColorClass('text')}>CAMPUS</span></h2>
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-bold font-mono">
                <MapPin size={12} className="text-cyan-500 animate-bounce" />
                {location || 'SCANNING LOC...'}
              </div>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            {/* NEW FEATURE: GROUP ORDER LOBBY AVATARS */}
            {groupLobby.length > 0 && (
               <div className="flex -space-x-3 mr-2">
                  {groupLobby.map((img, i) => (
                     <img key={i} src={img} className="w-8 h-8 rounded-full border-2 border-black animate-fade-in" title="Friend Online" />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-[10px] text-white font-bold border-2 border-black animate-pulse">+2</div>
               </div>
            )}

            <button onClick={() => setWeather(weather === 'clear' ? 'rain' : weather === 'rain' ? 'storm' : weather === 'storm' ? 'snow' : 'clear')} className="p-2 rounded-full bg-white/5 hover:bg-white/10">
               {weather === 'clear' ? <Sun size={18}/> : weather === 'rain' ? <CloudRain size={18} className="text-blue-400"/> : weather === 'storm' ? <CloudLightning size={18} className="text-yellow-400"/> : <CloudSnow size={18} className="text-white"/>}
            </button>

            {/* NEW FEATURE: CYBER MODE TOGGLE */}
            <button onClick={() => setCyberMode(!cyberMode)} className={`p-2 rounded-full ${cyberMode ? 'bg-green-500 text-black' : 'bg-white/5 text-slate-400'}`}>
               <Activity size={18} />
            </button>

            <button onClick={() => setView('login')} className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 flex items-center justify-center text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition">
              <LogOut size={18} />
            </button>
          </div>
        </div>

        <div className="bg-black text-white py-1 overflow-hidden border-b border-white/10">
            <div className="animate-marquee whitespace-nowrap flex gap-10 text-[10px] font-bold uppercase tracking-widest">
                {LIVE_UPDATES.map((u, i) => <span key={i} className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${getColorClass('bg')} animate-pulse`}></span>{u}</span>)}
            </div>
        </div>

        <div className="p-4 space-y-8 max-w-5xl mx-auto">
          {/* AI Search & Voice */}
          <div className="relative group z-30">
            <div className={`absolute inset-0 bg-gradient-to-r ${getColorClass('from')} to-cyan-500 rounded-2xl blur opacity-30 transition duration-500 ${aiMode ? 'opacity-70 animate-pulse' : ''}`}></div>
            <div className="relative bg-white dark:bg-[#0a0a0a] rounded-2xl flex items-center p-1.5 border border-slate-200 dark:border-white/10 shadow-xl">
              <div className={`pl-3 pr-2 ${aiMode ? getColorClass('text') : 'text-slate-400'}`}>
                {aiMode ? <Sparkles size={24} className="animate-spin-slow" /> : <Search size={24} />}
              </div>
              <input 
                type="text" 
                placeholder={isListening ? "Listening..." : aiMode ? "Ask AI: 'Best spicy burger'..." : "Search..."}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); if(aiMode && e.target.value.length > 2) { setIsAiThinking(true); setTimeout(() => setIsAiThinking(false), 1500); }}}
                className="w-full bg-transparent p-3 outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
              />
              {/* NEW FEATURE: VOICE SEARCH */}
              <button onClick={toggleVoiceSearch} className={`p-2 rounded-full hover:bg-white/10 transition mr-2 ${isListening ? 'text-red-500 animate-pulse' : 'text-slate-400'}`}>
                 <Mic size={20} />
              </button>
              <button 
                onClick={() => setAiMode(!aiMode)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${aiMode ? `${getColorClass('bg')} text-white shadow-lg` : 'bg-slate-100 dark:bg-white/10 text-slate-500'}`}
              >
                <Zap size={14} fill={aiMode ? "currentColor" : "none"} /> {aiMode ? 'AI ON' : 'AI OFF'}
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
            {['All', 'Stationary', 'Fast Food', 'Indian', 'Coffee', 'Chinese', 'Snacks'].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all transform hover:scale-105 ${activeCategory === cat ? 'bg-white dark:bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/50 dark:bg-[#121212] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* NEW FEATURE: MYSTERY BOX ITEM */}
          {!isAiThinking && activeCategory === 'All' && (
             <div className={`bg-gradient-to-r from-purple-900 to-indigo-900 rounded-3xl p-6 mb-8 flex items-center justify-between relative overflow-hidden border border-purple-500/30 shadow-2xl cursor-pointer group hover:scale-[1.01] transition`} onClick={() => addToCart({id: 9999, name: "Mystery Box", price: 99, vendorId: 1}, 1)}>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10">
                   <h3 className="text-2xl font-black text-white mb-1 flex items-center gap-2"><Box className="animate-bounce" /> MYSTERY BOX</h3>
                   <p className="text-purple-200 text-sm font-bold">Get items worth ₹150+ for just ₹99!</p>
                </div>
                <button className="bg-white text-purple-900 font-black px-6 py-3 rounded-xl shadow-lg z-10 group-hover:bg-purple-100">ADD +</button>
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-500 blur-[80px] opacity-50"></div>
             </div>
          )}

          {/* TRENDING HOT SECTION */}
          {!isAiThinking && activeCategory === 'All' && !searchQuery && (
            <div className="space-y-4">
               <h3 className="flex items-center gap-2 font-black text-xl italic"><Flame className="text-orange-500 fill-orange-500 animate-bounce" /> TRENDING NOW</h3>
               <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                  {trendingItems.map(item => (
                     <div key={item.id} className="min-w-[160px] h-[220px] rounded-2xl relative overflow-hidden group cursor-pointer shadow-lg hover:shadow-orange-500/20 transition" onClick={() => openCustomizer(item)}>
                        <img src={getFallbackImage(item.image)} className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-3 flex flex-col justify-end">
                           <p className="text-white font-bold text-sm leading-tight">{item.name}</p>
                           <p className={`text-xs font-black ${getColorClass('text')}`}>₹{item.price}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
          )}

          {/* Results Area */}
          {isAiThinking ? (
             <div className="flex flex-col items-center justify-center py-20 animate-pulse">
               <div className={`w-16 h-16 mb-4 rounded-full border-4 border-t-${themeColor}-500 border-r-transparent border-b-purple-500 border-l-transparent animate-spin`}></div>
               <p className={`${getColorClass('text')} font-bold font-mono`}>AI IS CURATING YOUR MEAL...</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map(v => (
                <div 
                  key={v.id} 
                  onClick={() => setActiveVendor(v)}
                  className={`bg-white dark:bg-[#0a0a0a] rounded-[2rem] p-4 border border-slate-100 dark:border-white/5 shadow-lg hover:shadow-2xl hover:${getColorClass('shadow')} transition-all cursor-pointer group relative overflow-hidden tilt-card ${cyberMode ? 'border-green-900' : ''}`}
                >
                  <div className="absolute top-0 right-0 bg-black text-white px-4 py-2 rounded-bl-2xl text-xs font-bold font-mono z-10 flex items-center gap-1">
                    <Clock size={12} className={getColorClass('text')} /> {v.time} MIN
                  </div>
                  <div className="flex gap-5 items-center">
                    <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0 relative shadow-md">
                      <img src={getFallbackImage(v.image)} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={v.shopName} />
                    </div>
                    <div className="flex flex-col justify-center min-w-0 flex-1">
                      <h3 className={`font-black text-xl text-slate-900 dark:text-white truncate group-hover:${getColorClass('text')} transition`}>{v.shopName}</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 truncate">{v.cuisine}</p>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-lg text-xs font-black flex items-center gap-1">
                          {v.rating} <Star size={10} fill="currentColor" />
                        </span>
                        <span className="text-xs font-medium text-slate-400">({v.reviewCount} reviews)</span>
                      </div>
                      <button className={`text-xs font-black bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl group-hover:${getColorClass('bg')} group-hover:text-white transition self-start flex items-center gap-2`}>
                        VIEW MENU <ArrowLeft className="rotate-180" size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Floating Cart Bar */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md z-50">
            <div onClick={() => setView('cart')} className={`bg-black/80 dark:bg-white/90 backdrop-blur-xl text-white dark:text-black rounded-3xl p-1 pr-2 shadow-2xl ${getColorClass('shadow')} flex justify-between items-center cursor-pointer animate-bounce-in border border-white/10 group`}>
              <div className="flex items-center gap-4">
                 <div className={`w-12 h-12 ${getColorClass('bg')} rounded-full flex items-center justify-center font-black text-white shadow-lg`}>
                    {cart.reduce((a,b)=>a+b.qty,0)}
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Total</span>
                    <span className="text-lg font-black">₹{calculateTotal()}</span>
                 </div>
              </div>
              <div className="bg-white dark:bg-black text-black dark:text-white px-6 py-3 rounded-full font-black text-sm flex items-center gap-2 group-hover:scale-105 transition">
                CHECKOUT <ChevronRight size={16} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const MenuModal = () => {
    const [tab, setTab] = useState('items');
    const [newReviewText, setNewReviewText] = useState('');
    const [newReviewRating, setNewReviewRating] = useState(5);
    const [file, setFile] = useState(null);
    const [printType, setPrintType] = useState('bw'); 

    if (!activeVendor) return null;

    const handleStationaryAdd = () => {
      if (!file) return showToast("Upload a document first!", "error");
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setUploadProgress(0);
          const item = { id: Date.now(), name: `${printType === 'bw' ? 'B&W' : 'Color'} Print`, price: printType === 'bw' ? 2 : 10, vendorId: activeVendor.id, type: 'print' };
          addToCart(item, 1, file.name);
          setFile(null);
        }
      }, 200);
    };

    const handlePostReview = () => {
      if(!newReviewText.trim()) return showToast("Write something!", "error");
      setAllReviews([{vendorId: activeVendor.id, user: user.username, rating: newReviewRating, comment: newReviewText, date: "Just now"}, ...allReviews]);
      setNewReviewText('');
      showToast("Review Posted! +10 XP", "success");
      setXp(prev => prev + 10);
    }

    const vendorItems = MENU_ITEMS.filter(m => m.vendorId === activeVendor.id);
    const vendorReviews = allReviews.filter(r => r.vendorId === activeVendor.id);

    return (
      <div className="fixed inset-0 z-50 bg-slate-50 dark:bg-[#020205] flex flex-col animate-slide-up overflow-hidden">
        {/* AR CAMERA OVERLAY */}
        {arActive && (
           <div className="absolute inset-0 z-[100] bg-black">
              <div className="absolute top-0 left-0 w-full h-full opacity-50 bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800')] bg-cover bg-center"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-64 h-64 border-4 border-white/50 rounded-2xl relative animate-pulse">
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-4 border-l-4 border-white"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-4 border-r-4 border-white"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-4 border-l-4 border-white"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-4 border-r-4 border-white"></div>
                    <div className="text-white text-center mt-24 font-bold drop-shadow-md">Scanning Surface...</div>
                 </div>
              </div>
              <button onClick={() => setArActive(false)} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white text-black px-8 py-3 rounded-full font-bold">CLOSE AR</button>
           </div>
        )}

        <div className="relative h-72 shrink-0 overflow-hidden">
          <img src={getFallbackImage(activeVendor.image)} className="w-full h-full object-cover transform hover:scale-110 transition duration-[10s]" alt="Cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/40 to-transparent"></div>
          <button onClick={() => setActiveVendor(null)} className="absolute top-6 left-6 bg-black/30 backdrop-blur-md p-3 rounded-full text-white hover:bg-white hover:text-black transition border border-white/10 z-50">
            <ArrowLeft size={24} />
          </button>
          <div className="absolute bottom-0 left-0 w-full p-8">
            <h1 className={`text-5xl font-black text-white mb-2 tracking-tight drop-shadow-lg ${cyberMode ? 'glitch-text' : ''}`}>{activeVendor.shopName}</h1>
            <div className="flex items-center gap-4 text-slate-300 text-sm font-bold">
               <span className={`${getColorClass('bg')} px-2 py-0.5 rounded text-white`}>{activeVendor.rating} ★</span>
               <span>•</span>
               <span>{activeVendor.cuisine}</span>
               <span>•</span>
               <span>{activeVendor.time} mins</span>
            </div>
          </div>
        </div>

        <div className="flex bg-[#020205] border-b border-white/10 sticky top-0 z-40">
          {['items', 'reviews'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 py-5 text-sm font-black uppercase tracking-widest transition relative ${tab === t ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
              {t}
              {tab === t && <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 ${getColorClass('bg')} rounded-t-full`}></div>}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 pb-32 bg-[#020205]">
          {tab === 'items' ? (
            activeVendor.type === 'print' ? (
              <div className="flex flex-col items-center text-center max-w-sm mx-auto pt-10">
                <div className={`w-24 h-24 bg-gradient-to-br ${getColorClass('from')} to-blue-600 text-white rounded-3xl flex items-center justify-center mb-6 shadow-2xl`}>
                  <Printer size={48} />
                </div>
                <h3 className="text-3xl font-black text-white mb-2">Print Station</h3>
                <p className="text-slate-400 text-sm mb-8">Secure document upload. Supported: PDF, DOCX.</p>

                <label className={`w-full border-2 border-dashed ${uploadProgress > 0 ? 'border-green-500 bg-green-500/10' : 'border-slate-700 bg-[#0a0a0a]'} rounded-3xl p-10 mb-6 cursor-pointer hover:${getColorClass('border')} hover:bg-white/5 transition group relative overflow-hidden`}>
                  {uploadProgress > 0 && <div className="absolute left-0 top-0 h-full bg-green-500/20 transition-all" style={{width: `${uploadProgress}%`}}></div>}
                  <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                  <Upload className={`mx-auto text-slate-500 group-hover:${getColorClass('text')} mb-4 transition transform group-hover:-translate-y-1`} size={40} />
                  <span className="font-bold text-slate-300 block group-hover:text-white relative z-10">{file ? file.name : "Drop file or Click"}</span>
                  {uploadProgress > 0 && <span className="block text-green-500 font-mono mt-2 font-bold">{uploadProgress}% UPLOADING...</span>}
                </label>

                <div className="flex w-full gap-4 mb-8">
                  {['bw', 'color'].map(type => (
                    <button key={type} onClick={() => setPrintType(type)} className={`flex-1 py-4 rounded-2xl border-2 font-bold capitalize transition ${printType === type ? `${getColorClass('border')} ${getColorClass('bg')}/20 text-white` : 'border-slate-800 bg-[#0a0a0a] text-slate-500'}`}>
                      {type} <span className="block text-xs mt-1 opacity-50">₹{type === 'bw' ? 2 : 10}/pg</span>
                    </button>
                  ))}
                </div>
                <button onClick={handleStationaryAdd} className="w-full py-5 bg-white text-black rounded-2xl font-black text-lg hover:scale-105 transition">ADD TO QUEUE</button>
              </div>
            ) : (
              <div className="space-y-4">
                {vendorItems.map(item => {
                   const inCart = cart.find(c => c.id === item.id && c.name === item.name);
                   return (
                    <div key={item.id} className={`group flex gap-4 items-center bg-[#0a0a0a] p-3 rounded-3xl border border-white/5 hover:${getColorClass('border')}/30 transition`}>
                      <div className="w-28 h-28 bg-slate-800 rounded-2xl shrink-0 bg-cover bg-center relative" style={{ backgroundImage: `url(${getFallbackImage(item.image)})` }}>
                         {/* NEW FEATURE: AR PREVIEW BUTTON */}
                         <button onClick={() => setArActive(true)} className="absolute top-2 right-2 bg-black/50 backdrop-blur-md p-1.5 rounded-lg text-white opacity-0 group-hover:opacity-100 transition hover:bg-fuchsia-600"><Camera size={14} /> AR</button>
                      </div>
                      <div className="flex-1 py-1 pr-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-white text-lg leading-tight">{item.name}</h3>
                          <span className={`font-black ${getColorClass('text').replace('500','400')}`}>₹{item.price}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2 mb-4">{item.desc}</p>
                        {inCart ? (
                          <div className="flex items-center bg-white text-black w-max rounded-xl font-bold overflow-hidden">
                            <button onClick={() => updateCartQty(item.id, item.name, -1)} className="px-4 py-2 hover:bg-slate-200"><Minus size={16}/></button>
                            <span className="px-2 text-base">{inCart.qty}</span>
                            <button onClick={() => updateCartQty(item.id, item.name, 1)} className="px-4 py-2 hover:bg-slate-200"><Plus size={16}/></button>
                          </div>
                        ) : (
                          <button onClick={() => openCustomizer(item)} className={`bg-[#1a1a1a] hover:${getColorClass('bg')} text-white border border-white/10 font-bold px-6 py-2.5 rounded-xl text-sm transition`}>ADD +</button>
                        )}
                      </div>
                    </div>
                   );
                })}
              </div>
            )
          ) : (
            <div className="space-y-6">
              <div className="bg-[#0a0a0a] p-6 rounded-3xl border border-white/5">
                <h3 className="font-bold text-white mb-3">Rate & Review</h3>
                <div className="flex gap-2 mb-4">
                   {[1,2,3,4,5].map(r => <Star key={r} size={28} className={`cursor-pointer transition ${r <= newReviewRating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} onClick={() => setNewReviewRating(r)} />)}
                </div>
                <textarea value={newReviewText} onChange={(e) => setNewReviewText(e.target.value)} placeholder="How was the taste?" className={`w-full bg-[#050505] p-4 rounded-xl text-sm outline-none border border-white/10 focus:${getColorClass('border')} transition text-white h-24 resize-none`}></textarea>
                <button onClick={handlePostReview} className={`mt-3 w-full bg-white text-black py-3 rounded-xl font-black text-sm hover:${getColorClass('bg')} hover:text-white transition`}>POST REVIEW</button>
              </div>
              <div className="space-y-4">
                {vendorReviews.map((r, i) => (
                  <div key={i} className="bg-[#0a0a0a] p-5 rounded-3xl border border-white/5">
                    <div className="flex justify-between mb-2"><span className="font-bold text-white">{r.user}</span><span className="text-xs text-slate-500">{r.date}</span></div>
                    <div className="flex text-yellow-400 mb-3 gap-1">{[...Array(5)].map((_, idx) => <Star key={idx} size={10} fill={idx < r.rating ? "currentColor" : "none"} className={idx >= r.rating ? "text-slate-700" : ""} />)}</div>
                    <p className="text-sm text-slate-300 leading-relaxed">"{r.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const CartView = () => (
      <div className="fixed inset-0 z-[60] bg-[#020205] flex flex-col animate-slide-up text-white">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-2xl font-black">Checkout</h2>
          <button onClick={() => setView('student')} className="p-2 bg-white/10 rounded-full"><X /></button>
        </div>
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          
          {/* FEATURE: SPLIT BILL */}
          <div className="bg-[#0a0a0a] p-5 rounded-3xl border border-white/5">
             <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-300"><Users size={16} /> SPLIT WITH FRIENDS</div>
                <div className="bg-white/5 rounded-lg flex items-center">
                   <button onClick={() => setSplitBillCount(Math.max(1, splitBillCount-1))} className="px-3 py-1 hover:bg-white/10">-</button>
                   <span className="px-2 font-mono font-bold">{splitBillCount}</span>
                   <button onClick={() => setSplitBillCount(splitBillCount+1)} className="px-3 py-1 hover:bg-white/10">+</button>
                </div>
             </div>
             {splitBillCount > 1 && (
                <div className={`bg-${themeColor}-900/20 border border-${themeColor}-500/30 p-3 rounded-xl flex justify-between items-center`}>
                   <span className="text-xs font-bold text-slate-400">PER PERSON</span>
                   <span className={`text-lg font-black ${getColorClass('text')}`}>₹{Math.ceil(calculateTotal() / splitBillCount)}</span>
                </div>
             )}
          </div>

          {cart.map((i, idx) => (
            <div key={idx} className="flex justify-between items-center bg-[#0a0a0a] p-4 rounded-2xl border border-white/5">
               <div><p className="font-bold">{i.name}</p><p className="text-xs text-slate-400">₹{i.price} x {i.qty}</p></div>
               <div className="font-bold">₹{i.price * i.qty}</div>
            </div>
          ))}
          
          <div onClick={() => setIsGoldMember(!isGoldMember)} className={`p-4 rounded-2xl border-2 cursor-pointer flex justify-between items-center transition ${isGoldMember ? 'border-yellow-500 bg-yellow-500/10' : 'border-slate-700 hover:border-slate-500'}`}>
             <div className="flex items-center gap-3"><Crown className={isGoldMember ? "text-yellow-500" : "text-slate-500"} /> <div><span className="font-bold block">Gold Member</span><span className="text-[10px] text-slate-400">Free Delivery • 2x XP</span></div></div>
             <span className="text-xs font-bold bg-yellow-500 text-black px-2 py-1 rounded">{isGoldMember ? 'ACTIVE' : 'ADD ₹1'}</span>
          </div>

          {/* NEW FEATURE: TURBO DELIVERY */}
          <div onClick={() => setTurboDelivery(!turboDelivery)} className={`p-4 rounded-2xl border-2 cursor-pointer flex justify-between items-center transition ${turboDelivery ? 'border-red-500 bg-red-900/20' : 'border-slate-700 hover:border-slate-500'}`}>
             <div className="flex items-center gap-3"><Rocket className={turboDelivery ? "text-red-500" : "text-slate-500"} /> <div><span className="font-bold block">Turbo Delivery</span><span className="text-[10px] text-slate-400">Priority • 10 Mins</span></div></div>
             <span className={`text-xs font-bold px-2 py-1 rounded ${turboDelivery ? 'bg-red-500 text-white' : 'bg-white/10 text-slate-400'}`}>{turboDelivery ? 'ON (+₹50)' : 'OFF'}</span>
          </div>

          <div className="border-t border-white/10 pt-4 space-y-2">
             <div className="flex justify-between text-slate-400 text-sm"><span>Subtotal</span><span>₹{cart.reduce((a,b)=>a+(b.price*b.qty),0)}</span></div>
             <div className="flex justify-between text-slate-400 text-sm"><span>Delivery</span><span className={isGoldMember || turboDelivery ? 'text-green-500' : ''}>{isGoldMember || turboDelivery ? 'FREE' : '₹25'}</span></div>
             {turboDelivery && <div className="flex justify-between text-slate-400 text-sm"><span>Turbo Fee</span><span>₹50</span></div>}
             <div className="flex justify-between text-xl pt-2"><span>Total</span><span className="font-bold">₹{calculateTotal()}</span></div>
          </div>
        </div>
        <div className="p-6"><button onClick={placeOrder} className={`w-full py-4 ${getColorClass('bg')} rounded-2xl font-black text-lg shadow-lg hover:scale-105 transition`}>PAY SECURELY</button></div>
      </div>
  );

  // --- NEW COMPONENT: CUSTOMIZATION MODAL ---
  const CustomizerModal = () => {
    if (!customizingItem) return null;
    return (
      <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
        <div className="bg-[#121212] w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 animate-slide-up border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-white">Customize it!</h3>
            <button onClick={() => setCustomizingItem(null)} className="bg-white/10 p-2 rounded-full"><X size={20} /></button>
          </div>
          
          <h4 className="text-sm font-bold text-slate-400 mb-3">Spiciness Level</h4>
          <div className="flex gap-2 mb-6">
            {['Mild', 'Medium', 'Hot'].map(lvl => (
              <button key={lvl} onClick={() => setCustomizingItem({...customizingItem, spice: lvl})} className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition ${customizingItem.spice === lvl ? `${getColorClass('border')} ${getColorClass('text')}` : 'border-white/10 text-slate-500'}`}>{lvl}</button>
            ))}
          </div>

          <h4 className="text-sm font-bold text-slate-400 mb-3">Add-ons</h4>
          <div onClick={() => setCustomizingItem({...customizingItem, extraCheese: !customizingItem.extraCheese})} className={`flex justify-between items-center p-4 rounded-xl border-2 cursor-pointer mb-8 ${customizingItem.extraCheese ? `${getColorClass('border')} bg-white/5` : 'border-white/10'}`}>
             <span className="font-bold text-white">Extra Cheese</span>
             <span className="text-sm text-slate-400">+₹20</span>
          </div>

          <div className="flex justify-between items-center">
             <div className="flex items-center bg-white/10 rounded-xl">
                <button onClick={() => setCustomizingItem({...customizingItem, qty: Math.max(1, customizingItem.qty-1)})} className="px-4 py-3 hover:bg-white/10">-</button>
                <span className="font-bold">{customizingItem.qty}</span>
                <button onClick={() => setCustomizingItem({...customizingItem, qty: customizingItem.qty+1})} className="px-4 py-3 hover:bg-white/10">+</button>
             </div>
             <button onClick={confirmCustomization} className={`px-8 py-3 rounded-xl font-black text-white ${getColorClass('bg')}`}>
               ADD ₹{(customizingItem.price + (customizingItem.extraCheese ? 20 : 0)) * customizingItem.qty}
             </button>
          </div>
        </div>
      </div>
    );
  };

  // --- NEW COMPONENT: SPIN WHEEL MODAL ---
  const SpinWheelModal = () => {
    if (!showSpinWheel) return null;
    return (
      <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in">
        <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-white/10 text-center relative max-w-xs w-full">
           <button onClick={() => setShowSpinWheel(false)} className="absolute top-4 right-4 text-slate-500"><X /></button>
           <h3 className="text-2xl font-black text-white mb-6">Daily Jackpot 🎰</h3>
           
           {spinResult ? (
             <div className="animate-bounce-in">
                <div className="text-6xl mb-4">🎉</div>
                <h4 className={`text-xl font-bold ${getColorClass('text')} mb-2`}>{spinResult}</h4>
                <p className="text-slate-400 text-sm mb-6">Applied to your next order!</p>
                <button onClick={() => setShowSpinWheel(false)} className={`w-full py-3 rounded-xl font-bold text-white ${getColorClass('bg')}`}>CLAIM</button>
             </div>
           ) : (
             <div>
               <div className={`w-48 h-48 rounded-full border-4 ${getColorClass('border')} mx-auto mb-8 flex items-center justify-center animate-spin-slow`}>
                  <span className="text-4xl">🎁</span>
               </div>
               <button onClick={spinTheWheel} className={`w-full py-3 rounded-xl font-bold text-white ${getColorClass('bg')}`}>SPIN NOW</button>
             </div>
           )}
        </div>
      </div>
    );
  };

  const Confetti = () => {
    if (!showConfetti) return null;
    return (
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="absolute w-3 h-3 bg-fuchsia-500 rounded-full animate-confetti" style={{
            left: `${Math.random() * 100}%`,
            top: `-10%`,
            animationDelay: `${Math.random() * 2}s`,
            backgroundColor: ['#d946ef', '#06b6d4', '#facc15', '#f97316'][Math.floor(Math.random() * 4)]
          }}></div>
        ))}
      </div>
    );
  };

  const OrderTrackingView = () => (
    <div className="h-screen bg-[#020205] flex flex-col items-center justify-center text-white p-6 text-center relative overflow-hidden">
       <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${getColorClass('from').replace('600','900')}/20 via-[#020205] to-[#020205]`}></div>
       <Confetti />
       
       <div className="relative z-10 mb-8">
          <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center relative border border-white/10">
             <div className={`absolute inset-0 rounded-full border-4 ${getColorClass('border')} opacity-30 animate-ping`}></div>
             <div className="text-6xl animate-bounce">
                {turboDelivery ? <Rocket className="text-red-500" size={48} /> : '🛵'}
             </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-500 text-black text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1 w-max">
             <Sparkles size={10} /> +100 XP
          </div>
       </div>

       <h2 className="text-4xl font-black mb-2 relative z-10">Order Transmitted!</h2>
       <p className="text-slate-400 mb-8 relative z-10 max-w-xs mx-auto">
          {turboDelivery ? "Turbo Thrusters Engaged. Estimated arrival: 8 mins." : "Your food is being prepared in the quantum kitchen..."}
       </p>
       
       <div className="flex gap-4 relative z-10">
          <button onClick={() => setView('student')} className="px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition">Home</button>
          <button className="px-8 py-3 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition flex items-center gap-2"><Share2 size={16} /> Share</button>
       </div>
    </div>
  );

  // --- ROUTER ---
  return (
    <div className={`font-sans ${darkMode ? 'dark' : ''} selection:bg-fuchsia-500 selection:text-white`}>
      {toast && <Toast message={toast.msg} type={toast.type} color={themeColor} />}
      {view === 'login' && <LoginView />}
      {view === 'student' && <StudentDashboard />}
      {view === 'cart' && <CartView />}
      {view === 'tracking' && <OrderTrackingView />}
      {activeVendor && view === 'student' && <MenuModal />}
      <CustomizerModal />
      <SpinWheelModal />
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .matrix-bg { position: absolute; inset: 0; background-image: linear-gradient(0deg, transparent 24%, rgba(232, 121, 249, .1) 25%, rgba(232, 121, 249, .1) 26%, transparent 27%, transparent 74%, rgba(232, 121, 249, .1) 75%, rgba(232, 121, 249, .1) 76%, transparent 77%, transparent); background-size: 50px 50px; }
        .grid-bg { position: absolute; inset: 0; opacity: 0.1; background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 30px 30px; }
        .gallery-container { width: 100%; overflow: hidden; display: flex; mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); }
        .gallery-track { display: flex; gap: 20px; animation: scrollGallery 60s linear infinite; width: max-content; }
        .gallery-item { width: 180px; height: 240px; border-radius: 20px; background-size: cover; background-position: center; flex-shrink: 0; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); transition: transform 0.3s; }
        .gallery-item:hover { transform: scale(1.05); border-color: rgba(255,255,255,0.5); }
        
        .tilt-card { transition: transform 0.2s; }
        .tilt-card:hover { transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) scale(1.02); z-index: 10; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }

        .animate-marquee { animation: marquee 20s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        @keyframes scrollGallery { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slide-up { animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-spin-slow { animation: spin 3s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes confetti { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
        .animate-confetti { animation: confetti 2.5s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        .animate-rain { position: absolute; animation-timing-function: linear; animation-iteration-count: infinite; }
        @keyframes rain { 0% { transform: translateY(-100vh); } 100% { transform: translateY(100vh); } }
        
        .glitch-effect { animation: glitch 3s infinite; }
        @keyframes glitch {
           0% { transform: translate(0) }
           2% { transform: translate(-2px, 2px) }
           4% { transform: translate(2px, -2px) }
           6% { transform: translate(0) }
           100% { transform: translate(0) }
        }
        .glitch-text { text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
      `}</style>
    </div>
  );
}
