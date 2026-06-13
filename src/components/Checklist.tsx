import React from 'react';
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  CalendarDays, 
  Sparkles,
  Lightbulb
} from 'lucide-react';

interface ChecklistProps {
  teacherName: string;
  school: string;
  hasPPCT: boolean;
  hasTKB: boolean;
  onFillDates: () => void;
  onFillMock: () => void;
}

export const Checklist: React.FC<ChecklistProps> = ({
  teacherName,
  school,
  hasPPCT,
  hasTKB,
  onFillDates,
  onFillMock
}) => {
  const isSchoolValid = school.toLowerCase().includes("vinh") || school.includes("đại học");

  const checklistItems = [
    {
      id: "c1",
      title: "Hồ sơ giáo viên",
      status: !!teacherName.trim(),
      desc: !!teacherName.trim() ? "Đã hợp lệ" : "Vui lòng cấu hình Họ tên giáo viên ở Bước 1."
    },
    {
      id: "c2",
      title: "Trường Đại học Vinh",
      status: isSchoolValid,
      desc: isSchoolValid ? "Hợp quy quy chuẩn" : "Tên trường nên chứa từ 'Vinh' cho chính xác biểu mẫu."
    },
    {
      id: "c3",
      title: "Cơ sở dữ liệu PPCT",
      status: hasPPCT,
      desc: hasPPCT ? "Đã lưu trữ thành công" : "Môn học chưa có danh mục Tiết PPCT ở Bước 2."
    },
    {
      id: "c4",
      title: "Khung thời khóa biểu",
      status: hasTKB,
      desc: hasTKB ? "TKB đã được liên kết" : "Chưa lập sơ đồ tiết dạy tuần ở Bước 3."
    }
  ];

  return (
    <div className="space-y-4">
      {/* Validation Card wrapper */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3.5">
        <div className="border-b border-slate-100 pb-2.5">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 text-xs uppercase tracking-wide">
            <Bell size={14} className="text-amber-500" />
            <span>Hộp Nhắc Việc & Trạng Thái</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-medium">Bảo đảm thông tin chuẩn hóa hành chính</p>
        </div>

        {/* Checklist rows */}
        <div className="space-y-2.5">
          {checklistItems.map((item) => (
            <div 
              key={item.id}
              className={`p-2.5 rounded-lg border flex items-start gap-2.5 text-xs transition duration-150 ${
                item.status 
                  ? "bg-emerald-50/40 border-emerald-100 text-slate-800" 
                  : "bg-amber-50/40 border-amber-100 text-slate-800"
              }`}
            >
              {item.status ? (
                <CheckCircle size={15} className="text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle size={15} className="text-amber-500 shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5">
                <span className="font-bold text-[10px] block text-slate-700">{item.title}</span>
                <p className="text-[9px] text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tip indicator */}
        <div className="pt-1.5">
          <div className="p-3 bg-sky-50/50 rounded-xl border border-sky-100/50 text-xs space-y-1">
            <span className="font-bold text-sky-800 flex items-center gap-1 text-[11px]">
              <Lightbulb size={13} className="text-sky-600" />
              <span>Gợi ý định dạng hành chính:</span>
            </span>
            <p className="text-slate-600 leading-relaxed text-[10px] font-medium">
              Đường đứt nét giữa các tiết học đã được lập trình sẵn trong cả định dạng xuất File Word (.doc) và Excel (.xls) theo quy chuẩn mới.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Tools Shortcut */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2.5">
        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wide">
          Thiết lập tự động nhanh
        </h4>
        <div className="space-y-2">
          <button 
            onClick={onFillDates}
            className="w-full text-left bg-slate-50 hover:bg-sky-50 hover:text-sky-700 p-2.5 rounded-lg border border-slate-100 text-xs flex items-center gap-2 font-semibold text-slate-700 transition duration-150"
          >
            <CalendarDays size={14} className="text-sky-600" />
            <span>Tự điền ngày tuần này</span>
          </button>
          <button 
            onClick={onFillMock}
            className="w-full text-left bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 p-2.5 rounded-lg border border-slate-100 text-xs flex items-center gap-2 font-semibold text-slate-700 transition duration-150"
          >
            <Sparkles size={14} className="text-emerald-600" />
            <span>Đồng ý nạp mẫu thử nghiệm</span>
          </button>
        </div>
      </div>
    </div>
  );
};
