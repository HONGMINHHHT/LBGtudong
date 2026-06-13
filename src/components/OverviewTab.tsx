import React from 'react';
import { Sparkles, Calendar, BookOpen, Layers, TableProperties, HelpCircle, ArrowRight } from 'lucide-react';

interface OverviewTabProps {
  onTabChange: (tab: string) => void;
  ppctCount: number;
  classCount: number;
  tkbCount: number;
  selectedWeek: number;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  onTabChange,
  ppctCount,
  classCount,
  tkbCount,
  selectedWeek
}) => {
  return (
    <div className="space-y-6">
      {/* Hero Welcome banner */}
      <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100/60 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="space-y-1 text-center md:text-left">
          <h2 className="text-lg md:text-xl font-extrabold text-slate-800">Xin chào Quý Thầy Cô! 👋</h2>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
            Hệ thống đã sẵn sàng hỗ trợ tự động ngắt trang vật lý thành 2 trang chuyên biệt (Chính khóa & Tăng cường) theo đúng biểu mẫu văn bản hành chính của Trường TH, THCS&THPT THSP Đại học Vinh.
          </p>
        </div>
        <div className="flex flex-wrap shrink-0 justify-center gap-2">
          <button 
            onClick={() => onTabChange('teacher')}
            className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition flex items-center gap-1"
          >
            <span>Bắt đầu cấu hình</span>
            <ArrowRight size={13} />
          </button>
          <button 
            onClick={() => onTabChange('guide')}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition"
          >
            Xem hướng dẫn
          </button>
        </div>
      </div>

      {/* Numerical status grid cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3.5">
          <div className="bg-sky-100 p-2.5 rounded-lg text-sky-600 shrink-0">
            <BookOpen size={18} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Số bài PPCT</p>
            <p className="text-lg font-bold text-slate-700">{ppctCount}</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3.5">
          <div className="bg-purple-100 p-2.5 rounded-lg text-purple-600 shrink-0">
            <Layers size={18} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Số lớp dạy</p>
            <p className="text-lg font-bold text-slate-700">{classCount}</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3.5">
          <div className="bg-emerald-100 p-2.5 rounded-lg text-emerald-600 shrink-0">
            <Calendar size={18} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Tuần chọn</p>
            <p className="text-lg font-bold text-slate-700">Tuần {selectedWeek}</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3.5">
          <div className="bg-amber-100 p-2.5 rounded-lg text-amber-600 shrink-0">
            <TableProperties size={18} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Số tiết dạy xếp lịch</p>
            <p className="text-lg font-bold text-slate-700">{tkbCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
