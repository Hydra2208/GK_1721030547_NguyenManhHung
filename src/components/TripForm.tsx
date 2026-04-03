"use client";

import { useState, useRef, useEffect } from "react";
import { Send, MapPin, Calendar, Wallet, Heart, Info, Loader2 } from "lucide-react";

const VIETNAM_DESTINATIONS = [
  // Database Địa danh thông minh để Auto-complete
  "An Giang", "Bà Rịa - Vũng Tàu", "Vũng Tàu", "Côn Đảo", "Bảo Lộc", "Bạc Liêu", "Bắc Giang", "Bắc Kạn", "Bắc Ninh", "Bến Tre", "Bình Dương", "Bình Định", "Quy Nhơn", "Bình Phước", "Bình Thuận", "Mũi Né", "Phan Thiết", "Đảo Phú Quý", "Cà Mau", "Đất Mũi", "Cao Bằng", "Thác Bản Giốc", "Cần Thơ", "Chợ Nổi Cái Răng", "Đà Nẵng", "Bà Nà Hills", "Đèo Hải Vân", "Hội An", "Cù Lao Chàm", "Hồ Chí Minh", "TP. Hồ Chí Minh", "Sài Gòn", "Đắk Lắk", "Buôn Ma Thuột", "Đắk Nông", "Tà Đùng", "Điện Biên", "Đồng Nai", "Nam Cát Tiên", "Đồng Tháp", "Gia Lai", "Pleiku", "Hà Giang", "Quản Bạ", "Đồng Văn", "Mèo Vạc", "Hoàng Su Phì", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Cát Bà", "Vịnh Lan Hạ", "Đồ Sơn", "Hậu Giang", "Hòa Bình", "Mai Châu", "Thung Nai", "Hưng Yên", "Khánh Hòa", "Nha Trang", "Cam Ranh", "Đảo Bình Ba", "Đảo Bình Hưng", "Đảo Điệp Sơn", "Kiên Giang", "Phú Quốc", "Hà Tiên", "Đảo Nam Du", "Đảo Hải Tặc", "Quần Đảo Bà Lụa", "Kon Tum", "Măng Đen", "Lai Châu", "Lạng Sơn", "Mẫu Sơn", "Lào Cai", "Sapa", "Fansipan", "Y Tý", "Lâm Đồng", "Đà Lạt", "Long An", "Nam Định", "Nghệ An", "Cửa Lò", "Ninh Bình", "Tràng An", "Tam Cốc", "Hang Múa", "Ninh Thuận", "Vĩnh Hy", "Phú Thọ", "Phú Yên", "Tuy Hòa", "Ghềnh Đá Đĩa", "Quảng Bình", "Phong Nha - Kẻ Bàng", "Sơn Đoòng", "Quảng Nam", "Quảng Ngãi", "Lý Sơn", "Quảng Ninh", "Hạ Long", "Cô Tô", "Quan Lạn", "Bình Liêu", "Quảng Trị", "Đảo Cồn Cỏ", "Sóc Trăng", "Sơn La", "Mộc Châu", "Tà Xùa", "Tây Ninh", "Núi Bà Đen", "Thái Bình", "Thái Nguyên", "Hồ Núi Cốc", "Thanh Hóa", "Sầm Sơn", "Pù Luông", "Thừa Thiên Huế", "Huế", "Lăng Cô", "Tiền Giang", "Mỹ Tho", "Cù Lao Thới Sơn", "Trà Vinh", "Tuyên Quang", "Na Hang", "Vĩnh Long", "Vĩnh Phúc", "Tam Đảo", "Yên Bái", "Mù Cang Chải", "Nghĩa Lộ"
];

// Hệ thống dữ liệu gợi ý nhanh (Chips)
const SUGGESTIONS = {
  destination: ["Đà Lạt", "Phú Quốc", "Đà Nẵng", "Sapa", "Hội An", "Nha Trang"],
  duration: ["2 ngày 1 đêm", "3 ngày 2 đêm", "4 ngày 3 đêm", "Đi trong ngày"],
  budget: ["2.000.000 VNĐ", "5.000.000 VNĐ", "10.000.000 VNĐ", "Không giới hạn"],
  style: ["Khám phá & Chụp ảnh", "Thư giãn & Nghỉ dưỡng", "Phượt bụi", "Gia đình & Trẻ em", "Thưởng thức Ẩm thực"],
};

export default function TripForm({ onSubmit, isLoading }: { onSubmit: (data: any) => void, isLoading: boolean }) {
  const [formData, setFormData] = useState({
    destination: "Đà Lạt",
    duration: "3 ngày 2 đêm",
    budget: "5.000.000 VNĐ",
    style: "Khám phá & Chụp ảnh",
    specialRequests: "",
  });

  const [filteredDestinations, setFilteredDestinations] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Lắng nghe sự kiện click ra ngoài để đóng dropdown tìm kiếm
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData({ ...formData, destination: val });
    
    if (val.trim().length > 0) {
      // Logic dự đoán: ưu tiên những từ bắt đầu bằng (startsWith) rồi mới tới những từ chứa (includes)
      const valLower = val.toLowerCase();
      
      const exactMatches = VIETNAM_DESTINATIONS.filter(d => d.toLowerCase().startsWith(valLower));
      const partialMatches = VIETNAM_DESTINATIONS.filter(d => 
        !d.toLowerCase().startsWith(valLower) && d.toLowerCase().includes(valLower)
      );
      
      const combined = [...exactMatches, ...partialMatches].slice(0, 5); // Hiển thị Top 5
      
      setFilteredDestinations(combined);
      setShowDropdown(combined.length > 0);
    } else {
      setShowDropdown(false);
    }
  };

  const selectDestination = (dest: string) => {
    setFormData({ ...formData, destination: dest });
    setShowDropdown(false);
  };

  const handleSuggestionClick = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  // Helper function để render các thẻ Tag (Chips) bên dưới mỗi ô input
  const renderChips = (name: keyof typeof SUGGESTIONS) => (
    <div className="flex flex-wrap gap-2 mt-3">
      {SUGGESTIONS[name].map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          onClick={() => handleSuggestionClick(name, suggestion)}
          className="text-xs px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/30 text-indigo-200 rounded-full border border-indigo-500/20 transition-colors whitespace-nowrap"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-xl mx-auto">
      <h2 className="text-3xl font-extrabold text-white mb-6 tracking-tight">Kể cho tôi nghe về chuyến đi của bạn</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Điểm đến */}
        <div className="relative z-50">
          <div className="relative" ref={dropdownRef}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MapPin className="text-indigo-300 w-5 h-5" />
            </div>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleDestinationChange}
              onFocus={() => {
                if (formData.destination.trim().length > 0 && filteredDestinations.length > 0) {
                  setShowDropdown(true);
                }
              }}
              placeholder="Điểm đến (VD: Đà Lạt, Phú Quốc...)"
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              required
              autoComplete="off"
            />
            {/* Predictive Text Dropdown (Autocomplete) */}
            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 w-full bg-[#1e293b] border border-white/20 rounded-2xl shadow-2xl overflow-hidden divide-y divide-white/10">
                {filteredDestinations.map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => selectDestination(dest)}
                    className="w-full text-left px-4 py-3 text-white hover:bg-indigo-500/40 transition-colors flex items-center gap-3"
                  >
                    <MapPin className="w-4 h-4 text-indigo-400" />
                    <span className="font-medium">{dest}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {renderChips("destination")}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-40">
          {/* Thời gian */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Calendar className="text-indigo-300 w-5 h-5" />
              </div>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Thời gian (VD: 3 ngày 2 đêm)"
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                required
              />
            </div>
            {renderChips("duration")}
          </div>

          {/* Ngân sách */}
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Wallet className="text-indigo-300 w-5 h-5" />
              </div>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Ngân sách (VD: 5.000.000 VNĐ)"
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                required
              />
            </div>
            {renderChips("budget")}
          </div>
        </div>

        {/* Phong cách */}
        <div className="relative z-30">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Heart className="text-indigo-300 w-5 h-5" />
            </div>
            <input
              type="text"
              name="style"
              value={formData.style}
              onChange={handleChange}
              placeholder="Phong cách (VD: Nghỉ dưỡng, Phượt, Hạng sang...)"
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              required
            />
          </div>
          {renderChips("style")}
        </div>

        {/* Yêu cầu đặc biệt */}
        <div className="relative z-20">
          <div className="absolute top-4 left-4 pointer-events-none">
            <Info className="text-indigo-300 w-5 h-5" />
          </div>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            placeholder="Yêu cầu đặc biệt (VD: Đi cùng trẻ em, ăn chay, bị say xe...)"
            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all resize-none h-28"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold rounded-2xl shadow-lg transform transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:pointer-events-none relative z-10"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              AI đang lên kế hoạch...
            </>
          ) : (
            <>
              <Send className="w-6 h-6" />
              Lên lịch trình ngay
            </>
          )}
        </button>

      </form>
    </div>
  );
}
