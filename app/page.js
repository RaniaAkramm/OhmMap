"use client";

import React, { useState, useEffect } from 'react';
import { 
  Zap, Search, Battery, ShieldCheck, MapPin, 
  ChevronDown, Globe, Calculator, Info, ZapOff 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function GlobalOhmMap() {
  const [search, setSearch] = useState("");
  const [cost, setCost] = useState({ city: "", price: 0 });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* 1. Hero Section - العنوان الرئيسي الجذاب للبحث */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black text-blue-600 tracking-tighter">
            OHMMAP<span className="text-slate-400">.COM</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-bold text-slate-600 uppercase tracking-widest">
            <a href="#map" className="hover:text-blue-600 transition">Map</a>
            <a href="#guide" className="hover:text-blue-600 transition">Battery Guide</a>
            <a href="#calc" className="hover:text-blue-600 transition">Cost Calculator</a>
          </nav>
        </div>
      </header>

      {/* 2. Search & Search Engine Bait - صيد محركات البحث */}
      <section className="py-20 bg-gradient-to-b from-white to-[#f8fafc]">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6"
          >
            Ultimate EV Charging <span className="text-blue-600 text-shadow-sm">Solutions.</span>
          </motion.h1>
          <p className="text-xl text-slate-500 mb-10 leading-relaxed">
            حلول مشاكل شحن سيارات BYD، تسلا، وفولكس فاجن. ابحث عن أقرب محطة شحن واحسب تكلفة الطاقة في مدينتك.
          </p>
          
          {/* أداة البحث عن المكان */}
          <div className="relative group max-w-2xl mx-auto shadow-2xl rounded-3xl overflow-hidden bg-white border-4 border-white">
            <div className="flex items-center px-6 py-4">
              <Search className="text-blue-500 mr-4" size={24} />
              <input 
                type="text"
                placeholder="Enter city or location (e.g. Dubai, Riyadh)..."
                className="w-full bg-transparent outline-none text-lg font-medium"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg">
                Find Stations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Battery Knowledge Base - شرح أنواع البطاريات */}
      <section id="guide" className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-black mb-12 flex items-center gap-3 uppercase tracking-tighter">
          <Battery className="text-blue-600" /> Battery Technology Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "LFP Batteries", desc: "Long life, high safety. Best for daily city commuting and BYD models.", icon: <ShieldCheck className="text-green-500"/> },
            { title: "NMC Batteries", desc: "High energy density. Perfect for long-range Tesla and luxury EVs.", icon: <Zap className="text-yellow-500"/> },
            { title: "Solid State", desc: "The future of charging. Ultra-fast charging in under 5 minutes.", icon: <Globe className="text-blue-500"/> }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Solving Problems Section - حلول مشاكل الشحن */}
      <section className="bg-blue-600 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black mb-6">How to fix BYD Charging Issues?</h2>
            <ul className="space-y-4 text-lg opacity-90">
              <li className="flex items-center gap-3"><ZapOff size={20}/> Use the correct Type-2 to GB/T Adapter.</li>
              <li className="flex items-center gap-3"><ZapOff size={20}/> Ensure your home charger is grounded (Earth).</li>
              <li className="flex items-center gap-3"><ZapOff size={20}/> Update the vehicle BMS software regularly.</li>
            </ul>
          </div>
          <div className="bg-white/10 p-8 rounded-[3rem] backdrop-blur-md border border-white/20 font-mono text-sm leading-relaxed">
             // Expert Tip for SEO:
             "Always match the Kilowatts (kW) of the station with your car's Max Intake to avoid battery degradation."
          </div>
        </div>
      </section>

      {/* 5. Energy Cost Tool - أداة حساب التكلفة */}
      <section id="calc" className="py-24 max-w-5xl mx-auto px-6 text-center">
        <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5"><Calculator size={150}/></div>
          <h2 className="text-3xl font-black mb-4">Energy Cost Calculator</h2>
          <p className="text-slate-500 mb-10 italic">أدخل اسم الدولة أو المدينة لمعرفة متوسط تكلفة شحن سيارتك</p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <input 
              type="text" 
              placeholder="Country/City Name" 
              className="bg-slate-100 px-6 py-4 rounded-2xl outline-none focus:ring-2 ring-blue-500"
            />
            <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-600 transition">
              Calculate Cost
            </button>
          </div>
        </div>
      </section>

      {/* 6. Footer - بيانات حقوق الملكية والدومين */}
      <footer className="py-20 bg-slate-900 text-white text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-3xl font-black mb-4 text-blue-500">OHMMAP.COM</div>
          <p className="text-slate-500 text-sm tracking-widest uppercase mb-10">Premium Domain Asset for EV Infrastructure</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left text-xs font-bold text-slate-400 border-t border-white/5 pt-10">
            <div>
              <p className="text-white mb-4 uppercase">Technologies</p>
              <ul className="space-y-2 opacity-60 font-medium italic">
                <li>Next.js 16</li>
                <li>Tailwind CSS</li>
                <li>Lucide Icons</li>
                <li>Vercel Edge</li>
              </ul>
            </div>
            <div>
              <p className="text-white mb-4 uppercase">Markets</p>
              <ul className="space-y-2 opacity-60 font-medium italic">
                <li>Middle East</li>
                <li>Europe</li>
                <li>China</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
