"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, ArrowRight, Loader2, X } from "lucide-react";
import TripResult from "@/components/TripResult";

export default function SavedTripsPage() {
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchSaved() {
      try {
        const res = await fetch("/api/itineraries");
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        if (res.ok) {
          setItineraries(data.itineraries || []);
        }
      } catch (error) {
        console.error("Lỗi khi tải lịch trình:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSaved();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen pt-24 pb-12 bg-[#0f172a] text-slate-100 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-400" />
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 bg-[#0f172a] text-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[60%] w-[40%] h-[40%] bg-pink-600/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[30%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-4">Lịch trình đã lưu</h1>
          <p className="text-xl text-slate-300">Xem lại những chuyến đi yêu thích của bạn.</p>
        </div>

        {itineraries.length === 0 ? (
          <div className="bg-white/5 border border-white/10 p-12 rounded-3xl text-center">
            <p className="text-lg text-slate-400 mb-6">Bạn chưa lưu lịch trình nào cả.</p>
            <button 
              onClick={() => router.push("/")}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-full transition-colors font-medium"
            >
              Tạo Lịch Trình Ngay
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {itineraries.map((itinerary) => {
              const data = JSON.parse(itinerary.data_json);
              return (
                <div key={itinerary.id} className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {itinerary.destination}
                    </h2>
                    <span className="text-sm text-slate-400">
                      {new Date(itinerary.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-indigo-200">
                      <Calendar className="w-5 h-5" />
                      <span>{data.trip_summary?.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <MapPin className="w-5 h-5" />
                      <span>{data.trip_summary?.style}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                        setSelectedTrip(itinerary);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-colors"
                  >
                    Xem Chi Tiết <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Popup Chi Tiết Lịch Trình */}
      {selectedTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedTrip(null)}
          ></div>
          
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0f172a] border border-white/20 rounded-3xl shadow-2xl overflow-y-auto flex flex-col">
            <div className="sticky top-0 right-0 z-50 flex justify-end p-4 bg-gradient-to-b from-[#0f172a] to-transparent pointer-events-none">
              <button 
                onClick={() => setSelectedTrip(null)}
                className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-md border border-white/10 transition-colors pointer-events-auto shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-2 sm:p-6 pt-0">
              <TripResult result={JSON.parse(selectedTrip.data_json)} hideSaveButton={true} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
