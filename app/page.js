"use client";

import React, { useState } from 'react';
import { 
  Zap, Search, Battery, ShieldCheck, MapPin, 
  Calculator, ZapOff, Loader2, Info, Car, Globe, Lightbulb, Wallet
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function OhmMapUltimate() {
  const [query, setQuery] = useState("");
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // --- الجزء الخاص بحاسبة التكلفة ---
  const [selectedCountry, setSelectedCountry] = useState("");
  const [calculatedCost, setCalculatedCost] = useState(null);

  const calculatePowerCost = () => {
    const prices = { 
        "UAE": { rate: 0.30, currency: "AED" }, 
        "Saudi": { rate: 0.18, currency: "SAR" }, 
        "Egypt": { rate: 1.20, currency: "EGP" },
        "Jordan": { rate: 0.12, currency: "JOD" }
    };
    
    const data = prices[selectedCountry] || { rate: 0.25, currency: "USD" };
    // افتراض أن بطارية السيارة 75 كيلوواط
    setCalculatedCost({
        total: (data.rate * 75).toFixed(2),
        currency: data.currency
    });
  };
  // --------------------------------

  const searchStations = async () => {
    if (!query) return;
    setLoading(true);
    const apiKey = process.env.NEXT_PUBLIC_OPENCHARGE_API_KEY;
    try {
      const res = await fetch(`https://api.openchargemap.io/v3/poi/?output=json&key=${apiKey}&address=${query}&maxresults=6`);
      const data = await res.json();
      setStations(data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 px-8 py-4 flex justify-between items-center">
        <div className="text-2xl font-black text-blue-600 tracking-tighter uppercase">OHMMAP.COM</div>
        <nav className="hidden md:flex gap-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
          <a href="#search" className="hover:text-blue-600 transition">Search</a>
          <a href="#solutions" className="hover:text-blue-600 transition">Solutions</a>
          <a href="#guide" className="hover:text-blue-600 transition">Battery Guide</a>
        </nav>
      </header>

      {/* 2. Hero & Search */}
      <section id="search" className="py-24 px-6 text-center bg-gradient-to-b from-white to-slate-50">
        <motion.h1 initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="text-6xl md:text-8xl font-black tracking-tight mb-8">
          The Future of <span className="text-blue-600 uppercase">Charging.</span>
        </motion.h1>
        
        <div className="max-w-3xl mx-auto bg-white p-3 rounded-[3rem] shadow-2xl border border-slate-100 flex items-center mb-12">
          <Search className="text-slate-300 ml-6" size={24} />
          <input 
            className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-lg font-bold"
            placeholder="Search City (Dubai, Riyadh, London)..."
            value={query} onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={searchStations} className="bg-blue-600 hover:bg-black text-white px-10 py-5 rounded-[2.5rem] font-black text-xs uppercase tracking-widest transition-all">
            {loading ? <Loader2 className="animate-spin"/> : "Locate Nodes"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
          {stations.map((s) => (
            <div key={s.ID} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <MapPin className="text-blue-600 mb-4" size={20}/>
              <h4 className="font-black text-sm uppercase truncate">{s.AddressInfo.Title}</h4>
              <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">{s.AddressInfo.Town || "GLOBAL GRID"}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Solutions Section (BYD/Tesla) */}
      <section id="solutions" className="py-24 bg-blue-600 text-white px-8 rounded-[4rem] mx-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black mb-8 leading-tight uppercase">Solving BYD & Tesla <br/>Charging Hurdles.</h2>
            <div className="space-y-6">
              <div className="bg-white/10 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
                <h3 className="font-bold mb-2 flex items-center gap-2 text-xl italic underline decoration-blue-400">حل مشكلة شحن بي واي دي (BYD)</h3>
                <p className="text-sm opacity-90 leading-relaxed font-medium">
                  تأكد من استخدام محول GB/T الأصلي وتأكد من أن القابس يدعم فولتية الشاحن المنزلي. موقعنا يساعدك في العثور على المحطات المتوافقة في دبي والخليج.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-slate-950 p-12 rounded-[4rem] border border-white/5 shadow-2xl">
            <Lightbulb className="text-yellow-400 mb-6" size={40}/>
            <h3 className="text-2xl font-bold mb-4 uppercase">Expert Diagnostic</h3>
            <p className="text-slate-400 leading-relaxed italic text-lg">
              "Always maintain battery levels between 20% and 80% to ensure maximum longevity for LFP batteries found in BYD models."
            </p>
          </div>
        </div>
      </section>

      {/* 4. Cost Calculator Section (هنا تم دمج الأداة) */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="inline-block p-4 bg-blue-50 rounded-3xl mb-6 text-blue-600">
             <Calculator size={40}/>
          </div>
          <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">Energy Cost Analytics</h2>
          <p className="text-slate-500 mb-12 font-medium">أدخل مدينتك لحساب تكلفة شحن السيارة الكهربائية بناءً على أسعار الكيلوواط المحلية.</p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto bg-slate-50 p-4 rounded-[3rem] border border-slate-100">
            <select 
              className="flex-1 px-8 py-5 rounded-[2rem] outline-none font-bold bg-white border border-slate-200"
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Select Country / الدولة</option>
              <option value="UAE">United Arab Emirates (الإمارات)</option>
              <option value="Saudi">Saudi Arabia (السعودية)</option>
              <option value="Egypt">Egypt (مصر)</option>
              <option value="Jordan">Jordan (الأردن)</option>
            </select>
            <button 
              onClick={calculatePowerCost}
              className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all"
            >
              Calculate
            </button>
          </div>

          {calculatedCost && (
            <motion.div initial={{scale: 0.8, opacity: 0}} animate={{scale: 1, opacity: 1}} className="mt-8 p-8 bg-green-50 rounded-[3rem] border border-green-100 max-w-md mx-auto">
                <Wallet className="mx-auto text-green-600 mb-2" size={32}/>
                <p className="text-green-800 font-bold uppercase text-xs tracking-widest mb-2">Estimated Full Charge Cost</p>
                <div className="text-4xl font-black text-green-700">{calculatedCost.total} <span className="text-lg">{calculatedCost.currency}</span></div>
                <p className="text-[10px] text-green-600 mt-4 font-bold uppercase italic">* Based on 75kWh Battery Capacity</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* 5. Battery Guide */}
      <section id="guide" className="py-24 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-slate-50 p-12 rounded-[4rem] border border-slate-200">
            <ShieldCheck className="text-green-600 mb-6" size={40}/>
            <h3 className="text-3xl font-black mb-4 uppercase">LFP Tech</h3>
            <p className="text-slate-500 leading-relaxed font-medium">
              أكثر أماناً، عمرها أطول، ومثالية للشحن اليومي حتى 100%. تستخدم بكثرة في سيارات BYD لقدرتها العالية على تحمل الحرارة.
            </p>
          </div>
          <div className="bg-slate-50 p-12 rounded-[4rem] border border-slate-200">
            <Battery className="text-blue-600 mb-6" size={40}/>
            <h3 className="text-3xl font-black mb-4 uppercase">NMC Energy</h3>
            <p className="text-slate-500 leading-relaxed font-medium">
              تعطي مدى أطول (Long Range)، خفيفة الوزن، وتوجد في سيارات تسلا وفولكس فاجن لتوفير أداء رياضي ومسافات أطول.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="py-24 bg-white border-t border-slate-100 text-center px-8 mt-20">
        <div className="text-4xl font-black text-blue-600 mb-4 tracking-tighter">OHMMAP.COM</div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em] mb-12">Premium Domain Asset • Global EV Infrastructure</p>
        <div className="flex justify-center gap-10 opacity-30 grayscale mb-12">
            <Zap size={24}/> <Globe size={24}/> <Car size={24}/>
        </div>
        <div className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">v2026 • Real-time API Integrated</div>
      </footer>

    </div>
  );
}
