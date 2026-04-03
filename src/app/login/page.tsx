"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Email hoặc mật khẩu không chính xác.");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">Đăng nhập</h1>
          <p className="text-slate-300">Chào mừng trở lại! Sẵn sàng cho chuyến đi mới?</p>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Đăng nhập"}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </main>
  );
}
