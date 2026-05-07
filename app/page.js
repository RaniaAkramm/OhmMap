"use client";

import React, { useState, useEffect } from 'react';
import { Zap, Activity, BatteryCharging, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils.jsx';
import './globals.css';

export default function OhmMapApp() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      const apiKey = process.env.NEXT_PUBLIC_OPENCHARGE_API_KEY;
      
      if (!apiKey) {
        setError("API Key is missing in Vercel settings.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api.openchargemap.io/v3/poi/?output=json&countrycode=AE&maxresults=10&compact=true&key=${apiKey}`
        );
        
        if (!response.ok) throw new Error("Failed to fetch from API");
        
        const data = await response.json();
        setStations(data);
      } catch (err) {
        setError("Could not connect to energy grid.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      <nav className="mb-10 text-3xl font-black text-blue-500 tracking-tighter">
        OHMMAP<span className="text-white">.COM</span>
      </nav>
      
      <div className="grid grid-cols-12 gap-6">
        {/* Map Placeholder */}
        <div className="col-span-12 lg:col-span-8 bg-zinc-900 rounded-[2.5rem] h-[500px] relative overflow-hidden border border-zinc-800 shadow-2xl">
           <div className="absolute inset-0 bg-[url('https://www.mapbox.com/static/images/dark-v11.png')] opacity-20 bg-cover grayscale"></div>
           <div className="absolute top-8 left-8 bg-black/80 backdrop-blur-md p-5 rounded-3xl border border-white/10">
              <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-1">Global Network</p>
              <div className="text-green-400 font-mono text-xl font-bold uppercase flex items-center">
                <Activity size={16} className="mr-2 animate-pulse" /> Live Status
              </div>
           </div>
        </div>

        {/* Info & API List */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-900 rounded-[2.5rem] shadow-xl">
            <Zap size={32} className="mb-6 text-white" />
            <h2 className="text-xs font-black opacity-60 tracking-[0.3em] mb-2 uppercase">Peak Grid Load</h2>
            <p className="text-5xl font-black font-mono tracking-tighter">15.4 GW</p>
          </div>

          <div className="p-8 bg-zinc-900 rounded-[2.5rem] border border-zinc-800 shadow-xl">
            <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.25em] flex items-center mb-6">
              <BatteryCharging size={16} className="mr-3 text-blue-500" /> Infrastructure Nodes
            </h3>
            
            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
              {loading ? (
                <div className="text-zinc-600 flex items-center py-4"><Loader2 className="animate-spin mr-2" size={16}/> Syncing with API...</div>
              ) : error ? (
                <div className="text-red-400 text-xs flex items-center bg-red-500/10 p-4 rounded-2xl border border-red-500/20">
                  <AlertCircle className="mr-2" size={14} /> {error}
                </div>
              ) : (
                stations.map((s) => (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={s.ID} className="p-4 rounded-2xl border bg-zinc-950 border-zinc-800 hover:border-blue-500/50 transition-all">
                    <div className="flex justify-between items-center">
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase text-zinc-300 truncate">
                          <MapPin size={10} className="text-blue-500 shrink-0" /> {s.AddressInfo.Title.split(' ')[0]} Node
                        </div>
                        <p className="text-[9px] text-zinc-600 font-bold uppercase mt-1 truncate">{s.AddressInfo.Town || "Urban Node"}</p>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] shrink-0"></div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
