import Link from "next/link";
import { auth } from "@/lib/auth";
import { Map as MapIcon } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="absolute top-0 w-full z-50 p-4">
      <div className="container mx-auto flex justify-between items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
        <Link href="/" className="text-xl font-bold text-white flex items-center gap-2 hover:text-indigo-300 transition-colors">
          <MapIcon className="w-6 h-6" />
          AI Travel
        </Link>
        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <Link href="/saved" className="text-sm font-medium text-slate-200 hover:text-white transition-colors">
                Lịch trình đã lưu
              </Link>
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/20">
                <span className="text-sm font-semibold text-indigo-300">{session.user.name || session.user.email}</span>
                <LogoutButton />
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-white hover:text-indigo-300 transition-colors">
                Đăng nhập
              </Link>
              <Link href="/register" className="text-sm font-bold bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full transition-colors">
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
