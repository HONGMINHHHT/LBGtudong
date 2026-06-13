import React, { useState } from 'react';
import { TKBSlot } from '../types';
import { Calendar, Trash2, ArrowRight, PlusCircle, LayoutGrid, CheckCircle } from 'lucide-react';

interface TKBTabProps {
  slots: TKBSlot[];
  onAddSlot: (slot: Omit<TKBSlot, 'id' | 'gradeGroup'>) => void;
  onDeleteSlot: (id: string) => void;
  onClear: () => void;
  onSort: () => void;
  onNext: () => void;
}

export const TKBTab: React.FC<TKBTabProps> = ({
  slots,
  onAddSlot,
  onDeleteSlot,
  onClear,
  onSort,
  onNext
}) => {
  const [day, setDay] = useState("2");
  const [session, setSession] = useState<'Sáng' | 'Chiều'>("Sáng");
  const [period, setPeriod] = useState(1);
  const [subject, setSubject] = useState("Tin học");
  const [className, setClassName] = useState("");
  const [type, setType] = useState<'Chính khóa' | 'Tăng cường'>("Chính khóa");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) {
      alert("Vui lòng nhập tên môn dạy!");
      return;
    }
    if (!className.trim()) {
      alert("Vui lòng nhập tên lớp dạy!");
      return;
    }

    onAddSlot({
      dayOfWeek: day,
      session,
      period,
      subject: subject.trim(),
      className: className.toUpperCase().trim(),
      type,
      note: ""
    });

    setClassName("");
  };

  const daysLabels: { [key: string]: string } = {
    "2": "Thứ Hai",
    "3": "Thứ Ba",
    "4": "Thứ Tư",
    "5": "Thứ Năm",
    "6": "Thứ Sáu",
    "7": "Thứ Bảy"
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="space-y-0.5">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Calendar className="text-sky-600 shrink-0" size={18} />
            <span>Bước 3: Thiết lập Thời Khóa Biểu Giảng Dạy Tuần</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">Lập sẵn sơ đồ các lớp môn học để hệ thống gán bài dạy tuần từ PPCT.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button 
            onClick={onSort}
            className="bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-sky-100 transition"
          >
            Sắp xếp thứ tự TKB
          </button>
          <button 
            onClick={onClear}
            className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition"
          >
            Xóa sạch TKB
          </button>
        </div>
      </div>

      {/* Adding slot form manually */}
      <form onSubmit={handleSubmit} className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
        <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1">
          <PlusCircle size={14} className="text-emerald-500 shrink-0" />
          <span>Thêm tiết dạy mới vào khung thời khóa biểu</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 items-end">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">Thứ dạy</label>
            <select 
              value={day} 
              onChange={(e) => setDay(e.target.value)}
              className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs bg-white font-medium"
            >
              <option value="2">Thứ Hai</option>
              <option value="3">Thứ Ba</option>
              <option value="4">Thứ Tư</option>
              <option value="5">Thứ Năm</option>
              <option value="6">Thứ Sáu</option>
              <option value="7">Thứ Bảy</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">Buổi</label>
            <select 
              value={session} 
              onChange={(e) => setSession(e.target.value as 'Sáng' | 'Chiều')}
              className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs bg-white font-medium"
            >
              <option value="Sáng">Sáng</option>
              <option value="Chiều">Chiều</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">Tiết biểu</label>
            <select 
              value={period} 
              onChange={(e) => setPeriod(parseInt(e.target.value))}
              className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs bg-white font-medium"
            >
              {[1, 2, 3, 4, 5].map(p => (
                <option key={p} value={p}>Tiết {p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">Môn dạy</label>
            <input 
              type="text" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ví dụ: Tin học" 
              className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs bg-white font-medium focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">Lớp (Ví dụ: 10A1)</label>
            <input 
              type="text" 
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Nhập 10A1, 6A2..." 
              className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs bg-white font-semibold focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">Phân loại tiết</label>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value as 'Chính khóa' | 'Tăng cường')}
              className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs bg-white font-medium"
            >
              <option value="Chính khóa">Chính khóa</option>
              <option value="Tăng cường">Tăng cường / Học thêm</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition shadow-sm flex items-center gap-1"
          >
            <PlusCircle size={13} />
            <span>Thêm tiết vào thời khóa biểu</span>
          </button>
        </div>
      </form>

      {/* Loaded slots list table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-slate-50 px-3.5 py-2.5 border-b border-slate-200">
          <span className="font-bold text-slate-700 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
            <LayoutGrid size={13} className="text-sky-600 shrink-0" />
            <span>Bản thời khóa biểu tuần ({slots.length} tiết)</span>
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[500px]">
            <thead>
              <tr className="bg-slate-100 text-slate-500 uppercase tracking-widest text-[9px] border-b border-slate-200 font-bold">
                <th className="p-2.5">Thứ dạy</th>
                <th className="p-2.5">Buổi</th>
                <th className="p-2.5 text-center">Tiết</th>
                <th className="p-2.5">Môn học</th>
                <th className="p-2.5">Lớp dạy</th>
                <th className="p-2.5">Loại tiết</th>
                <th className="p-2.5 text-center w-14">Xóa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {slots.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-400">Không có tiết dạy biểu trong TKB. Hãy nhập để liên kết.</td>
                </tr>
              ) : (
                slots.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="p-2.5 text-slate-800 font-semibold">{daysLabels[item.dayOfWeek] || item.dayOfWeek}</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 text-[9px] rounded-full font-bold ${
                        item.session === 'Sáng' ? 'bg-amber-100 text-amber-800':'bg-sky-100 text-sky-800'
                      }`}>
                        {item.session}
                      </span>
                    </td>
                    <td className="p-2.5 text-center font-bold text-slate-700">Tiết {item.period}</td>
                    <td className="p-2.5 font-bold">{item.subject}</td>
                    <td className="p-2.5 text-slate-700">Lớp <strong className="text-indigo-700">{item.className}</strong></td>
                    <td className="p-2.5 text-slate-500 text-[10px]">{item.type}</td>
                    <td className="p-2.5 text-center">
                      <button 
                        onClick={() => onDeleteSlot(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button 
          onClick={onNext}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition shadow-sm flex items-center gap-1"
        >
          <span>Tiếp tục sang Tạo lịch tự động</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
