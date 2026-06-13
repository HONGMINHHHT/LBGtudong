import React from 'react';
import { HelpCircle, FileSpreadsheet, LayoutList, CheckSquare } from 'lucide-react';

export const GuideTab: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <HelpCircle size={18} className="text-sky-600 shrink-0" />
          <span>Hướng dẫn sử dụng chi tiết</span>
        </h2>
        <p className="text-xs text-slate-500 font-medium">Tìm hiểu cách hệ thống đồng bộ hóa tuần học và tách biệt 2 trang.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 leading-relaxed text-slate-600 text-xs font-semibold">
        <div className="bg-slate-50 p-4 rounded-xl space-y-2.5">
          <h3 className="font-extrabold text-sky-800 text-xs flex items-center gap-1.5 uppercase">
            <LayoutList size={14} className="text-sky-600" />
            <span>1. Tự động nhận diện định mức</span>
          </h3>
          <p className="font-medium text-slate-500">
            Hệ thống tự động phát hiện môn học (như Tin học, Hoạt động trải nghiệm) và quy đổi số tiết chuẩn dựa theo độ tuổi và quy định mới của Bộ GD&ĐT (Khối THCS 6-9 quy đổi 1 tiết/tuần, Khối THPT 10-12 quy đổi 2 tiết/tuần). Thầy cô không cần tự thiết lập bằng tay phức tạp.
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl space-y-2.5">
          <h3 className="font-extrabold text-emerald-800 text-xs flex items-center gap-1.5 uppercase">
            <FileSpreadsheet size={14} className="text-emerald-600" />
            <span>2. Định dạng Xuất chuẩn nét đứt</span>
          </h3>
          <p className="font-medium text-slate-500">
            Cấu trúc đường đứt nét giữa các tiết học đã được tối ưu hóa cho cả định dạng in trực tiếp qua trình duyệt lẫn các tệp File tải về (Microsoft Word và Microsoft Excel). Các bảng của Chính khóa và Tăng cường hoàn toàn biệt lập, tránh xáo trộn dòng.
          </p>
        </div>
      </div>

      <div className="p-4 bg-sky-50 rounded-xl space-y-2">
        <h3 className="font-bold text-sky-800 text-xs">Phân tách trang quy tắc:</h3>
        <ul className="list-disc pl-5 text-[11px] text-slate-600 space-y-1 font-semibold">
          <li>Trang 1 quy ước chỉ hiển thị các lớp học giảng dạy trong khung chương trình Chính khóa.</li>
          <li>Trang 2 tự động dồn tất cả các học lớp tăng cường, dạy bù, bồi dưỡng học sinh giỏi hoặc họp chuyên môn riêng biệt.</li>
          <li>Thầy cô hoàn toàn có thể sửa trực tiếp hoặc gõ thêm ghi chú vào bất kỳ ô nào sau khi lịch tự động được dựng.</li>
        </ul>
      </div>
    </div>
  );
};
