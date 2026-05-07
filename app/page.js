"use client";

import React from 'react';
import { Zap, Search, Activity, BatteryCharging, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
// استدعاء ملف التنسيق المدمج من مجلد lib
import { cn } from '../lib/utils.jsx'; 
// استدعاء ملف التنسيق العام (تأكد من وجوده في مجلد app)
import './globals.css';

// بيانات محاكاة للرسم البياني للطاقة
const energyHistory = [
  { time: '12am', load: 45 },
  { time: '4am', load: 32 },
  { time: '8am', load: 68 },
  { time: '12pm', load: 95 },
  { time: '4pm', load: 88 },
  { time: '8pm', load: 74 },
];

export default function OhmMapApp() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-4 md:p-8">
      {/* Header Section */}
      <nav className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="text-3xl font-black tracking-tighter text-blue-500">
          OHMMAP<span className="text-white">.COM</span>
        </div>
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 items-center w-full md:w-96">
          <Search size={18} className="text-zinc-500 mr-2" />
          <input 
            placeholder="Search global energy nodes..." 
            className="bg-transparent outline-none text-sm w-full text-white placeholder-zinc-600" 
          />
        </div>
      </nav>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Side: The Interactive Map Simulator */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-zinc-900 rounded-[2.5rem] border border-zinc-800 h-[500px] relative overflow-hidden shadow-2xl">
            {/* الخلفية التقنية للخريطة */}
            <div className="absolute inset-0 bg-[url('https://www.mapbox.com/static/images/dark-v11.png')] opacity-20 bg-cover"></div>
            
            {/* Overlay Info (بيانات حية فوق الخريطة) */}
            <div className="absolute top-6 left-6 flex gap-3 z-10">
              <div className="bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] text-zinc-500 uppercase font-black mb-1">Grid Status</p>
                <div className="flex items-center text-green-400 font-mono text-lg">
                  <Activity size={14} className="mr-2 animate-pulse" /> OPTIMAL
                </div>
              </div>
              <div className="bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] text-zinc-500 uppercase font-black mb-1">Active Nodes</p>
                <div className="text-blue-400 font-mono text-lg">1,284</div>
              </div>
            </div>
          </div>

          {/* Energy Chart Section (الرسم البياني) */}
          <div className="bg-zinc-900/50 p-6 rounded-[2.5rem] border border-zinc-800 h-64 shadow-inner">
            <div className="flex items-center mb-4 gap-2">
              <PieChart size={16} className="text-blue-500" />
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Global Load Analytics (24h)</h4>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={energyHistory}>
                <XAxis dataKey="time" stroke="#3f3f46" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px', fontSize: '12px', color: '#fff' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="load" 
                  stroke="#3b82f6" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} 
                  activeDot={{ r: 8, strokeWidth: 0 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side: Control Panel (لوحة التحكم) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ x: 20, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}
            className="p-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-[2.5rem] shadow-xl shadow-blue-500/20"
          >
            <Zap size={32} className="mb-6 text-white" />
            <h2 className="text-xs uppercase font-black opacity-70 tracking-[0.2em]">City Peak Demand</h2>
            <p className="text-4xl font-black mt-2 tracking-tight">DUBAI: 15.4 GW</p>
            <div className="mt-6 pt-6 border-t border-white/10 flex justify-between text-sm font-medium">
              <span>Renewable: 18%</span>
              <span>Efficiency: 94%</span>
            </div>
          </motion.div>

          <div className="p-8 bg-zinc-900 rounded-[2.5rem] border border-zinc-800 shadow-xl">
            <h3 className="text-zinc-500 text-[10px] font-black uppercase mb-6 flex items-center tracking-[0.2em]">
              <BatteryCharging size={14} className="mr-2 text-blue-500" /> Infrastructure Nodes
            </h3>
            
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className={cn("p-5 rounded-2xl border bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group")}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-sm group-hover:text-blue-400 transition-colors text-zinc-200">Ohm-Charge Node {i}</p>
                      <p className="text-[10px] text-zinc-500 mt-1 uppercase">Status: High Voltage • Type 4</p>
                    </div>
                    <span className="bg-blue-500/10 text-blue-500 text-[10px] px-2 py-1 rounded-md border border-blue-500/20 font-bold">ACTIVE</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-4 bg-zinc-800 hover:bg-blue-600 rounded-2xl text-xs font-bold transition-all uppercase tracking-widest text-zinc-300 hover:text-white border border-zinc-700 hover:border-blue-400 shadow-lg">
              View All Locations
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer / Domain Badge */}
      <footer className="mt-12 text-center border-t border-zinc-900 pt-8">
        <p className="text-zinc-600 text-xs tracking-[0.3em] font-medium uppercase">
          Proprietary Tech Stack of OhmMap.com Assets
        </p>
      </footer>
    </div>
  );
}
