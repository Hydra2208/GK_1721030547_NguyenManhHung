"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, DollarSign, Lightbulb, Heart, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TripResult({ result, hideSaveButton = false }: { result: any, hideSaveButton?: boolean }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();
  if (!result || !result.trip_summary) return null;

  const { trip_summary, itinerary, travel_tips } = result;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-12">
      {/* Summary Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-teal-400 to-indigo-500"></div>
        <h2 className="text-4xl font-extrabold text-white mb-2">{trip_summary.destination}</h2>
        <p className="text-indigo-200 text-lg mb-6 font-medium">{trip_summary.style} • {trip_summary.duration}</p>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full border border-white/10 w-fit">
            <DollarSign className="w-5 h-5 text-green-300" />
            <span className="text-green-100 font-semibold tracking-wide">Dự toán: {trip_summary.total_estimated_budget}</span>
          </div>

          {!hideSaveButton && (
            <button 
              onClick={async () => {
                if (saved) return;
                setSaving(true);
                try {
                  const res = await fetch("/api/itineraries", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      destination: trip_summary.destination,
                      data_json: result,
                    }),
                  });
                  if (res.status === 401) {
                    alert("Vui lòng đăng nhập để lưu lịch trình yêu thích!");
                    router.push("/login");
                    return;
                  }
                  if (res.ok) {
                    setSaved(true);
                  } else {
                    alert("Có lỗi xảy ra khi lưu!");
                  }
                } catch (e) {
                  console.error(e);
                } finally {
                  setSaving(false);
                }
              }}
              disabled={saving || saved}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all w-fit ${
                saved 
                  ? "bg-pink-500/20 text-pink-300 border border-pink-500/50" 
                  : "bg-pink-500 hover:bg-pink-600 text-white shadow-lg shadow-pink-500/30"
              }`}
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Heart className={`w-5 h-5 ${saved ? "fill-current" : ""}`} />}
              {saved ? "Đã Yêu Thích" : "Lưu Lịch Trình"}
            </button>
          )}
        </div>
      </motion.div>

      {/* Itinerary Timeline */}
      <div className="space-y-10">
        <h3 className="text-3xl font-bold text-white pl-4 border-l-4 border-purple-500">Lịch trình chi tiết</h3>
        
        {itinerary.map((day: any, dayIdx: number) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + dayIdx * 0.1 }}
            key={dayIdx} 
            className="pl-4 md:pl-8 border-l-2 border-indigo-400/30 space-y-8 relative"
          >
            <div className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full border-4 border-[#0f172a]"></div>
            
            <div className="-mt-1.5">
              <h4 className="text-2xl font-bold text-indigo-300">Ngày {day.day}</h4>
              <p className="text-white/70 mt-1 mb-6 text-lg">{day.theme}</p>
              
              <div className="space-y-6">
                {day.activities.map((activity: any, actIdx: number) => (
                  <div key={actIdx} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors group">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                      
                      <div className="flex items-center gap-3">
                        <div className="bg-indigo-500/20 text-indigo-300 p-2.5 rounded-xl">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xl font-bold text-white tracking-wide">{activity.time}</span>
                          <div className="flex items-center gap-1.5 text-indigo-200 mt-1">
                            <MapPin className="w-4 h-4" />
                            <span className="font-medium text-sm sm:text-base">{activity.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-emerald-500/20 text-emerald-300 font-semibold px-4 py-2 rounded-lg border border-emerald-500/30 whitespace-nowrap">
                        {activity.estimated_cost}
                      </div>

                    </div>
                    
                    <p className="text-slate-300 leading-relaxed text-lg">{activity.description}</p>
                    
                    <div className="mt-4 flex gap-2">
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location + ' ' + trip_summary.destination)}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors bg-indigo-500/10 px-3 py-1.5 rounded-md"
                      >
                        <MapPin className="w-3 h-3" /> Xem bản đồ
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Travel Tips */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-purple-900/40 border border-purple-500/30 p-8 rounded-3xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-8 h-8 text-yellow-400" />
          <h3 className="text-2xl font-bold text-white">Lưu ý cho bạn</h3>
        </div>
        <ul className="space-y-4">
          {travel_tips.map((tip: string, idx: number) => (
            <li key={idx} className="flex items-start gap-3 text-purple-100/90 text-lg">
              <span className="text-purple-400 mt-1">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </motion.div>
      
    </div>
  );
}
