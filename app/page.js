"use client";

import React, { useState } from 'react';
import { Zap, Search, Battery, ShieldCheck, MapPin, Calculator, Loader2, Lightbulb, Wallet, Globe, Car } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OhmMapUltimate() {
  const [query, setQuery] = useState("");
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [calculatedCost, setCalculatedCost] = useState(null);

  const calculatePowerCost = () => {
    const prices = { 
        "UAE": { rate: 0.30, currency: "AED" }, 
        "Saudi": { rate: 0.18, currency: "SAR" }, 
        "Egypt": { rate: 1.20, currency: "EGP" }
    };
    const data = prices[selectedCountry] || { rate: 0.25, currency: "USD" };
    setCalculatedCost({ total: (data.rate * 75).toFixed(2), currency: data.currency });
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
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900 font-sans selection:bg-blue-600">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 px-8 py-5 flex justify-between items-center shadow-sm">
        <div className="text-3xl font-black text-blue-600 tracking-tighter uppercase">OHMMAP.COM</div>
        <nav className="hidden md:flex gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <a href="#search" className="hover:text-blue-600">Search Nodes</a>
          <a href="#solutions" className="hover:text-blue-600">EV Solutions</a>
          <a href="#calc" className="hover:text-blue-600">Energy Cost</a>
        </nav>
      </header>

      <section id="search" className="py-24 text-center bg-white px-6">
        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 uppercase">GLOBAL <span className="text-blue-600">NODES.</span></h1>
        <div className="max-w-3xl mx-auto bg-slate-50 p-4 rounded-[3rem] border border-slate-100 flex items-center mb-10">
          <Search className="text-slate-300 ml-4" size={24} />
          <input className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-lg font-bold" placeholder="Search City..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <button onClick={searchStations} className="bg-blue-600 text-white px-10 py-5 rounded-[2.5rem] font-black uppercase text-xs">
             {loading ? <Loader2 className="animate-spin"/> : "Locate"}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
          {stations.map((s) => (
            <div key={s.ID} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:border-blue-500 transition-all">
              <MapPin className="text-blue-600 mb-4" />
              <h4 className="font-black text-sm uppercase truncate">{s.AddressInfo.Title}</h4>
              <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase">{s.AddressInfo.Town || "Urban Node"}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="solutions" className="py-24 bg-blue-600 text-white px-8 rounded-[4rem] mx-4 shadow-2xl">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black mb-8 leading-tight">BYD & TESLA <br/>SOLUTIONS.</h2>
            <div className="bg-white/10 p-8 rounded-[2.5rem] border border-white/20 backdrop-blur-lg">
                <h3 className="text-2xl font-bold mb-4 italic underline decoration-blue-300">حلول شحن سيارات بي واي دي</h3>
                <p className="text-sm opacity-90 leading-relaxed font-medium">نحن نوفر لك الأدلة التقنية اللازمة لتجاوز مشاكل توافق الشواحن. تأكد من استخدام محولات GB/T المعتمدة.</p>
            </div>
          </div>
          <div className="bg-slate-950 p-12 rounded-[3.5rem] border border-white/5">
            <Lightbulb className="text-yellow-400 mb-6" size={40}/>
            <p className="text-slate-400 italic text-xl leading-relaxed">"Optimization of charging cycles is key to preserving battery life."</p>
          </div>
        </div>
      </section>

      <section id="calc" className="py-32 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Calculator className="mx-auto text-blue-600 mb-8" size={50}/>
          <h2 className="text-4xl font-black mb-10 uppercase">Energy Cost Analytics</h2>
          <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <select className="flex-1 px-8 py-5 rounded-[2rem] font-bold bg-slate-50 border border-slate-200 outline-none" onChange={(e) => setSelectedCountry(e.target.value)}>
              <option value="">Select Region</option>
              <option value="UAE">UAE (الإمارات)</option>
              <option value="Saudi">Saudi Arabia (السعودية)</option>
              <option value="Egypt">Egypt (مصر)</option>
            </select>
            <button onClick={calculatePowerCost} className="bg-black text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase">Compute</button>
          </div>
          {calculatedCost && (
            <div className="mt-10 p-10 bg-green-50 rounded-[3rem] border border-green-100 max-w-md mx-auto">
                <div className="text-5xl font-black text-green-700">{calculatedCost.total} <span className="text-xl">{calculatedCost.currency}</span></div>
                <p className="text-[10px] text-green-600 mt-4 font-black uppercase tracking-widest">Estimate (75kWh Battery)</p>
            </div>
          )}
        </div>
      </section>

      <footer className="py-24 text-center border-t border-slate-100 bg-white">
        <div className="text-4xl font-black text-blue-600 mb-4 tracking-tighter">OHMMAP.COM</div>
        <div className="flex justify-center gap-8 opacity-20 grayscale">
            <Zap size={20}/> <Globe size={20}/> <Car size={20}/>
        </div>
      </footer>
    </div>
  );
}
