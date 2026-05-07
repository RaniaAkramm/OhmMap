"use client";

import React, { useState } from 'react';
import { Zap, Search, Battery, ShieldCheck, MapPin, Calculator, Loader2, Lightbulb, Wallet, Globe, Car, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OhmMapUltimate() {
  const [query, setQuery] = useState("");
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [calculatedCost, setCalculatedCost] = useState(null);

  const calculatePowerCost = () => {
    const prices = { "UAE": 0.30, "Saudi": 0.18, "Egypt": 1.20, "Jordan": 0.12 };
    const data = prices[selectedCountry] || 0.25;
    setCalculatedCost({ total: (data * 75).toFixed(2), currency: selectedCountry === "Egypt" ? "EGP" : "Local Units" });
  };

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
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-0 m-0">
      
      {/* Navigation */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 px-8 py-5 flex justify-between items-center shadow-sm">
        <div className="text-3xl font-black text-blue-600 tracking-tighter">OHMMAP.COM</div>
        <nav className="hidden md:flex gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <a href="#search" className="hover:text-blue-600">Global Search</a>
          <a href="#guide" className="hover:text-blue-600">Battery Guide</a>
          <a href="#calc" className="hover:text-blue-600">Energy Cost</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="search" className="py-24 text-center bg-white px-6">
        <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="text-6xl md:text-8xl font-black tracking-tight mb-8">
          ENERGY <span className="text-blue-600">INFRA.</span>
        </motion.h1>
        <p className="max-w-2xl mx-auto text-slate-400 font-bold mb-12 uppercase tracking-widest text-xs">
          Professional EV Grid Management and Node Directory
        </p>
        
        <div className="max-w-3xl mx-auto bg-slate-50 p-4 rounded-[3rem] border border-slate-100 flex items-center mb-10 shadow-inner">
          <Search className="text-slate-300 ml-4" size={24} />
          <input 
            className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-lg font-bold"
            placeholder="Search City (Dubai, Riyadh, London)..."
            value={query} onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={searchStations} className="bg-blue-600 text-white px-10 py-5 rounded-[2.5rem] font-black uppercase text-xs hover:bg-black transition-all shadow-lg">
             {loading ? <Loader2 className="animate-spin"/> : "Find Stations"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left px-4">
          {stations.map((s) => (
            <div key={s.ID} className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm hover:border-blue-500 transition-all group">
              <MapPin className="text-blue-600 mb-4 group-hover:scale-125 transition-transform" />
              <h4 className="font-black text-sm uppercase truncate">{s.AddressInfo.Title}</h4>
              <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase">{s.AddressInfo.Town || "Global Node"}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BYD & Tesla Help - SEO Section */}
      <section className="py-24 bg-blue-600 text-white px-8 rounded-[4rem] mx-4 shadow-2xl relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black mb-8 leading-tight">SOLVING BYD <br/>CHARGING ISSUES.</h2>
            <div className="bg-white/10 p-8 rounded-[2.5rem] border border-white/20 backdrop-blur-lg">
                <h3 className="text-2xl font-bold mb-4 italic underline decoration-blue-300">حل مشكلة شحن سيارات بي واي دي</h3>
                <p className="text-sm opacity-90 leading-relaxed font-medium">
                  نحن نوفر لك الأدلة التقنية لتجاوز مشاكل توافق الشواحن. تأكد من استخدام محولات GB/T المعتمدة وتحديث برمجيات السيارة لضمان أسرع شحن ممكن في دبي والشرق الأوسط.
                </p>
            </div>
          </div>
          <div className="bg-slate-950 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl">
            <Lightbulb className="text-yellow-400 mb-6" size={40}/>
            <p className="text-slate-400 italic text-xl leading-relaxed">"Optimization of charging cycles is key to preserving LFP battery life in extreme climates."</p>
          </div>
        </div>
      </section>

      {/* Cost Calculator Section */}
      <section id="calc" className="py-32 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Calculator className="mx-auto text-blue-600 mb-8" size={50}/>
          <h2 className="text-4xl font-black mb-10 uppercase tracking-tighter">Energy Cost Analytics</h2>
          <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto bg-slate-50 p-3 rounded-[3rem] border border-slate-100">
            <select 
              className="flex-1 px-8 py-5 rounded-[2rem] font-bold bg-white border border-slate-200 outline-none appearance-none"
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Select Region</option>
              <option value="UAE">UAE (الإمارات)</option>
              <option value="Saudi">Saudi Arabia (السعودية)</option>
              <option value="Egypt">Egypt (مصر)</option>
              <option value="Jordan">Jordan (الأردن)</option>
            </select>
            <button onClick={calculatePowerCost} className="bg-black text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase hover:bg-blue-600 transition-all">Compute</button>
          </div>

          {calculatedCost && (
            <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="mt-10 p-10 bg-green-50 rounded-[3rem] border border-green-100 max-w-md mx-auto">
                <Wallet className="mx-auto text-green-600 mb-4" size={32}/>
                <div className="text-5xl font-black text-green-700">{calculatedCost.total} <span className="text-xl">{calculatedCost.currency}</span></div>
                <p className="text-[10px] text-green-600 mt-4 font-black uppercase tracking-widest">Full Charge Estimate (75kWh Battery)</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 text-center border-t border-slate-100 bg-[#f8fafc]">
        <div className="text-4xl font-black text-blue-600 mb-4 tracking-tighter">OHMMAP.COM</div>
        <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.5em] mb-12 italic">Premium Infrastructure Asset • v2026.5</p>
        <div className="flex justify-center gap-10 opacity-10">
            <Zap size={20}/> <Globe size={20}/> <Car size={20}/>
        </div>
      </footer>
    </div>
  );
}
