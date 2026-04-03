"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/' })}
      className="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1"
      title="Đăng xuất"
    >
      <LogOut className="w-5 h-5" />
    </button>
  );
}
