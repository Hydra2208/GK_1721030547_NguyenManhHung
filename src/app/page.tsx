"use client";

import { useState } from "react";
import TripForm from "@/components/TripForm";
import TripResult from "@/components/TripResult";
import { PlaneTakeoff } from "lucide-react";

export default function Home() {
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanTrip = async (data: any) => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/plan-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to plan trip");
      const resultData = await response.json();
      setResult(resultData);
    } catch (error) {
      console.error(error);
      alert("Đã có lỗi xảy ra khi gọi AI. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-100 selection:bg-indigo-300/30 selection:text-white font-sans overflow-x-hidden">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/30 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/30 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-blue-600/20 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {/* Header Content */}
        {!result && (
          <div className="text-center max-w-3xl mx-auto mb-16 animate-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center justify-center p-4 bg-indigo-500/20 rounded-full mb-6 ring-1 ring-white/10 shadow-xl shadow-indigo-500/20">
              <PlaneTakeoff className="w-10 h-10 text-indigo-300" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              AI Travel Config <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Cho Người Việt
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
              Xây dựng lịch trình cá nhân hóa dựa trên AI Prompt cao cấp. Bất kể bạn chọn nghỉ dưỡng 5 sao hay du lịch bụi chân thực.
            </p>
          </div>
        )}

        {/* Transitioning States */}
        <div className="transition-all duration-700 ease-in-out">
          {!result ? (
            <TripForm onSubmit={handlePlanTrip} isLoading={isLoading} />
          ) : (
            <div className="space-y-16 animate-in fade-in zoom-in-95 duration-1000">
              <div className="text-center">
                <button 
                  onClick={() => setResult(null)} 
                  className="text-indigo-300 hover:text-indigo-200 border border-indigo-500/30 px-6 py-2 rounded-full transition-colors mb-8 bg-indigo-900/30"
                >
                  ← Lên lịch trình khác
                </button>
              </div>
              <TripResult result={result} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
