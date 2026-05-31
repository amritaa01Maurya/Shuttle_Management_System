import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const RouteSelector = ({ stops, startStop, setStartStop, endStop, setEndStop }) => {
  return (
    <div className="bg-black/30 rounded-3xl p-8 border border-white/5 relative">
      <h3 className="text-xl font-bold mb-6">Select Route</h3>
      
      <div className="absolute left-12 top-24 bottom-16 w-0.5 bg-white/10 border-dashed border-l-2 border-white/20 z-0 hidden md:block"></div>

      <div className="space-y-6 relative z-10">
        
        {/* From Stop */}
        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
          <div className="p-3 bg-white/10 rounded-full w-fit"><MapPin className="w-5 h-5 text-orange-300" /></div>
          <div className="flex-1">
            <label className="text-sm text-gray-400 mb-1 block">Pickup Location</label>
            <select 
              value={startStop} 
              onChange={(e) => setStartStop(e.target.value)}
              className="w-full bg-black/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 border border-white/10 appearance-none cursor-pointer"
            >
              <option value="">Select starting stop...</option>
              {stops.map(stop => (
                <option key={stop.id} value={stop.id} disabled={stop.id.toString() === endStop}>
                  {stop.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* To Stop */}
        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
          <div className="p-3 bg-orange-500/20 rounded-full w-fit"><Navigation className="w-5 h-5 text-pink-400" /></div>
          <div className="flex-1">
            <label className="text-sm text-gray-400 mb-1 block">Drop-off Location</label>
            <select 
              value={endStop} 
              onChange={(e) => setEndStop(e.target.value)}
              className="w-full bg-black/50 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 border border-white/10 appearance-none cursor-pointer"
            >
              <option value="">Select destination...</option>
              {stops.map(stop => (
                <option key={stop.id} value={stop.id} disabled={stop.id.toString() === startStop}>
                  {stop.name}
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RouteSelector;