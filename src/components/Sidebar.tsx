import React from 'react';
import { 
  Home, 
  User, 
  BookOpen, 
  Table, 
  Sparkles, 
  FileCheck, 
  Info, 
  Download, 
  Database,
  Undo
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  ppctCount: number;
  classCount: number;
  tkbCount: number;
  currentWeek: number;
  onSave: () => void;
  onReset: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  ppctCount,
  classCount,
  tkbCount,
  currentWeek,
  onSave,
  onReset
}) => {
  const steps = [
    { id: 'teacher', num: 1, label: "Thông tin giáo viên" },
    { id: 'ppct', num: 2, label: "Tải lên PPCT" },
    { id: 'tkb', num: 3, label: "Nhập thời khóa biểu" },
    { id: 'generator', num: 4, label: "Tạo lịch báo giảng" },
    { id: 'export', num: 5, label: "Xem & Xuất file" }
  ];

  const getStepClass = (stepId: string, num: number) => {
    const tabsInOrder = ['overview', 'teacher', 'ppct', 'tkb', 'generator', 'export', 'guide'];
    const activeIdx = tabsInOrder.indexOf(activeTab);
    const stepIdx = tabsInOrder.indexOf(stepId);

    if (activeTab === stepId) {
      return "text-sky-700 font-bold border-l-2 border-sky-600 pl-2";
    }
    if (activeIdx > stepIdx && activeIdx >= 1) {
      return "text-emerald-600 font-semibold hover:text-emerald-700 cursor-pointer pl-2";
    }
    return "text-slate-400 font-medium hover:text-sky-600 cursor-pointer pl-2";
  };

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <div className="flex-1 flex flex-col">
        {/* Progress steps indicator panel */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">TIẾN TRÌNH THIẾT LẬP</h3>
          <div className="space-y-2.5">
            {steps.map((s) => (
              <div 
                key={s.id} 
                onClick={() => onTabChange(s.id)}
                className={`flex items-center gap-2 text-xs transition duration-150 ${getStepClass(s.id, s.num)}`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  activeTab === s.id 
                    ? "bg-sky-600 text-white shadow-sm font-bold" 
                    : "bg-slate-100 text-slate-500 font-medium"
                }`}>
                  {s.num}
                </span>
                {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* Vertical menu navigation */}
        <nav className="p-3 space-y-1">
          <button 
            id="tab-btn-overview"
            onClick={() => onTabChange('overview')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition duration-150 ${
              activeTab === 'overview' 
                ? "bg-sky-50 text-sky-700 shadow-sm" 
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <Home size={16} className="text-sky-600" />
              <span>Trang tổng quan</span>
            </div>
            <span className="text-[9px] bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-bold">Home</span>
          </button>

          <button 
            id="tab-btn-teacher"
            onClick={() => onTabChange('teacher')}
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold transition duration-150 ${
              activeTab === 'teacher' 
                ? "bg-sky-50 text-sky-700 shadow-sm" 
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <User size={16} />
            <span>1. Thông tin giáo viên</span>
          </button>

          <button 
            id="tab-btn-ppct"
            onClick={() => onTabChange('ppct')}
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold transition duration-150 ${
              activeTab === 'ppct' 
                ? "bg-sky-50 text-sky-700 shadow-sm" 
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <BookOpen size={16} />
            <span>2. Tải & Lưu PPCT</span>
          </button>

          <button 
            id="tab-btn-tkb"
            onClick={() => onTabChange('tkb')}
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold transition duration-150 ${
              activeTab === 'tkb' 
                ? "bg-sky-50 text-sky-700 shadow-sm" 
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Table size={16} />
            <span>3. Nhập thời khóa biểu</span>
          </button>

          <button 
            id="tab-btn-generator"
            onClick={() => onTabChange('generator')}
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold transition duration-150 ${
              activeTab === 'generator' 
                ? "bg-sky-50 text-sky-700 shadow-sm" 
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Sparkles size={16} />
            <span>4. Tạo lịch báo giảng</span>
          </button>

          <button 
            id="tab-btn-export"
            onClick={() => onTabChange('export')}
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold transition duration-150 ${
              activeTab === 'export' 
                ? "bg-sky-50 text-sky-700 shadow-sm" 
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <FileCheck size={16} />
            <span>5. Xuất file & Tải về</span>
          </button>

          <button 
            id="tab-btn-guide"
            onClick={() => onTabChange('guide')}
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold transition duration-150 ${
              activeTab === 'guide' 
                ? "bg-sky-50 text-sky-700 shadow-sm" 
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Info size={16} />
            <span>Hướng dẫn sử dụng</span>
          </button>
        </nav>
      </div>

      {/* Persistent local database state metadata & copy-rights stamp */}
      <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 space-y-2 mt-auto">
        <div className="flex items-center gap-1.5 font-bold text-slate-700">
          <Database size={13} className="text-sky-600" />
          <span>Bảo mật cục bộ</span>
        </div>
        <p className="text-[10px] leading-relaxed text-slate-400 font-medium">Dữ liệu được mã hóa và lưu trữ an toàn riêng tư trên trình duyệt của thầy cô.</p>
        <hr className="border-slate-200 my-1.5" />
        <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
          Bản quyền thuộc về:<br />
          <strong className="text-slate-700 font-bold">GV. Trần Thị Hồng Minh</strong><br />
          Trường TH, THCS&THPT THSP Đại học Vinh
        </p>

        <div className="pt-1 flex flex-col gap-1">
          <button 
            onClick={onSave}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1 px-2 rounded text-[10px] flex items-center justify-center gap-1 transition shadow-sm"
          >
            <Download size={10} /> Lưu dữ liệu cục bộ
          </button>
          <button 
            onClick={onReset}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-1 px-2 rounded text-[10px] flex items-center justify-center gap-1 transition"
          >
            <Undo size={10} /> Nạp mẫu thử nghiệm
          </button>
        </div>
      </div>
    </aside>
  );
};
