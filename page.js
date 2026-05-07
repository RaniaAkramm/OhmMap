import React from 'react';
import { Zap, Search, Activity, BatteryCharging } from 'lucide-react'; // مكتبة الأيقونات
import { motion } from 'framer-motion'; // مكتبة التحريك
import { cn } from './utils'; // مكتبة التنسيق المدمجة

export default function OhmMapApp() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-6">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-10">
        <div className="text-2xl font-black tracking-tighter text-blue-500">OHMMAP<span className="text-white">.COM</span></div>
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 items-center">
          <Search size={18} className="text-zinc-500 mr-2" />
          <input placeholder="Search global grid..." className="bg-transparent outline-none text-sm w-64" />
        </div>
      </nav>

      {/* Main UI */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Side: Map Simulator */}
        <div className="col-span-8 bg-zinc-900 rounded-[2rem] border border-zinc-800 h-[600px] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.mapbox.com/static/images/dark-v11.png')] opacity-30 bg-cover"></div>
          <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">Live Power Flow</p>
            <div className="flex items-center text-green-400 font-mono text-xl">
              <Activity size={16} className="mr-2 animate-pulse" /> 842.19 TW/h
            </div>
          </div>
        </div>

        {/* Right Side: Data Panels */}
        <div className="col-span-4 space-y-6">
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-6 bg-blue-600 rounded-[2rem] text-white">
            <Zap size={32} className="mb-4" />
            <h2 className="text-sm uppercase font-bold opacity-80">City Consumption</h2>
            <p className="text-4xl font-black mt-2">Dubai: 15.4 GW</p>
          </motion.div>

          <div className="p-6 bg-zinc-900 rounded-[2rem] border border-zinc-800">
            <h3 className="text-zinc-400 text-xs font-bold uppercase mb-4 flex items-center">
              <BatteryCharging size={14} className="mr-2" /> Charging Stations
            </h3>
            <div className={cn("p-4 rounded-2xl border bg-zinc-950 border-zinc-800")}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-sm">Ohm-Charge Center</p>
                  <p className="text-xs text-zinc-500">Superfast • CCS2</p>
                </div>
                <span className="bg-red-500/10 text-red-500 text-[10px] px-2 py-1 rounded-full border border-red-500/20">Busy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
