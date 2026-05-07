"use client";

import React from 'react';
import { Zap, Search, Activity, BatteryCharging, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

/** * تصحيح المسار: 
 * بما أن page.js داخل مجلد app و utils.jsx داخل مجلد lib بجانبه، 
 * نستخدم ../lib للوصول للمجلد الآخر
 */
import { cn } from '../lib/utils.jsx'; 

// استدعاء ملف التنسيق من نفس المجلد
import './globals.css';

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
    <div className="min-h-screen bg-[#050505] text-white font-sans p-4 md:p-8 selection:bg-blue-500/30">
      <nav className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-black tracking-tighter text-blue-500 uppercase"
        >
          OHMMAP<span className="text-white">.COM</span>
        </motion.div>
        
        <div className="flex bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl px-4 py-2.5 items-center w-full md:w-96 shadow-lg shadow-black/20">
          <Search size={18} className="text-zinc-500 mr-3" />
          <input 
            placeholder="Search global energy nodes..." 
            className="bg-transparent outline-none text-sm w-full text-zinc-200 placeholder-zinc-600 font-medium" 
          />
        </div>
      </nav>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 rounded-[2.5rem] border border-zinc-800 h-[500px] relative overflow-hidden shadow-2xl group"
          >
            <div className="absolute inset-0 bg-[url('https://www.mapbox.com/static/images/dark-v11.png')] opacity-30 bg-cover grayscale group-hover:scale-105 transition-transform duration-1000"></div>
            
            <div className="absolute top-8 left-8 flex gap-4 z-10">
              <div className="bg-black/80 backdrop-blur-xl p-5 rounded-3xl border border-white/10 shadow-xl">
                <p className="text-[10px] text-zinc-500 uppercase font-black mb-1.5 tracking-widest">Network Status</p>
                <div className="flex items-center text-green-400 font-mono text-xl font-bold">
                  <Activity size={16} className="mr-2 animate-pulse" /> OPTIMAL FLOW
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900/40 backdrop-blur-sm p-8 rounded-[2.5rem] border border-zinc-800 h-72 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500/20 p-2 rounded-xl text-blue-500">
                <PieChart size={18} />
              </div>
              <h4 className="text-sm font-black text-zinc-300 uppercase tracking-[0.2em]">Grid Load Analytics (24h)</h4>
            </div>
            
            <div className="w-full h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={energyHistory}>
                  <XAxis dataKey="time" stroke="#3f3f46" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '16px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="load" 
                    stroke="#3b82f6" 
                    strokeWidth={4} 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-[2.5rem] shadow-2xl shadow-blue-500/20"
          >
            <Zap size={32} className="mb-8 text-white" />
            <h2 className="text-xs uppercase font-black text-white/60 tracking-[0.3em] mb-2">City Peak Demand</h2>
            <p className="text-5xl font-black text-white tracking-tight mb-8 font-mono uppercase">DUBAI: 15.4 GW</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 bg-zinc-900 rounded-[2.5rem] border border-zinc-800 shadow-xl"
          >
            <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.25em] flex items-center mb-8">
              <BatteryCharging size={16} className="mr-3 text-blue-500" /> Infrastructure Nodes
            </h3>
            
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className={cn("p-5 rounded-3xl border bg-zinc-950 border-zinc-800 hover:border-blue-500/50 transition-all cursor-pointer group hover:bg-zinc-900 shadow-sm")}>
                  <div className="flex justify-between items-center text-zinc-300">
                    <div className="flex items-center gap-4">
                       <BatteryCharging size={16} className="text-zinc-600 group-hover:text-blue-400" />
                       <span className="font-bold text-sm tracking-tight">Node {i+100}</span>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      <footer className="mt-16 text-center border-t border-zinc-900 pt-10 pb-6 font-black uppercase text-[10px] tracking-[0.4em] text-zinc-600 opacity-50">
          OhmMap.com Assets • Proprietary Technology v2026
      </footer>
    </div>
  );
}
