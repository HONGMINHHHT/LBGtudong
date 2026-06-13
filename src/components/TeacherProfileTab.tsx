import React from 'react';
import { TeacherProfile } from '../types';
import { User, Save, Landmark, Calendar, Settings2, Signature } from 'lucide-react';

interface TeacherProfileTabProps {
  profile: TeacherProfile;
  onProfileChange: (updated: Partial<TeacherProfile>) => void;
  onNext: () => void;
}

export const TeacherProfileTab: React.FC<TeacherProfileTabProps> = ({
  profile,
  onProfileChange,
  onNext
}) => {
  const handleChange = (field: keyof TeacherProfile, value: string) => {
    onProfileChange({ [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <User className="text-sky-600 shrink-0" size={18} />
          <span>Bước 1: Thông tin giáo viên & Nhà trường</span>
        </h2>
        <p className="text-xs text-slate-500 font-medium">Cấu hình tiêu đề chuẩn quy chuẩn Trường TH, THCS&THPT THSP Đại học Vinh.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Landmark size={12} className="text-slate-400" />
            <span>Tên trường giảng dạy</span>
          </label>
          <input 
            type="text" 
            value={profile.school}
            onChange={(e) => handleChange('school', e.target.value)}
            placeholder="Ví dụ: Trường TH, THCS&THPT THSP Đại học Vinh" 
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <User size={12} className="text-slate-400" />
            <span>Họ và tên giáo viên</span>
          </label>
          <input 
            type="text" 
            value={profile.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Ví dụ: Trần Thị Hồng Minh" 
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Calendar size={12} className="text-slate-400" />
            <span>Năm học</span>
          </label>
          <input 
            type="text" 
            value={profile.year}
            onChange={(e) => handleChange('year', e.target.value)}
            placeholder="Ví dụ: 2026 - 2027" 
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Settings2 size={12} className="text-slate-400" />
            <span>Cấp học mặc định</span>
          </label>
          <select 
            value={profile.level}
            onChange={(e) => handleChange('level', e.target.value as 'THPT' | 'THCS')}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-sky-500 bg-white"
          >
            <option value="THPT">Trung học phổ thông (THPT)</option>
            <option value="THCS">Trung học cơ sở (THCS)</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Loại lịch mặc định khi duyệt</label>
          <select 
            value={profile.calType}
            onChange={(e) => handleChange('calType', e.target.value as 'chinh-khoa' | 'tang-cuong')}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-sky-500 bg-white"
          >
            <option value="chinh-khoa">Lịch báo giảng Chính khóa</option>
            <option value="tang-cuong">Lịch báo giảng Tăng cường / Học thêm / Học bù</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
          <Signature size={14} className="text-slate-500" />
          <span>Thiết lập chữ ký cuối lịch</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 mb-1">
              Ban Giám Hiệu / Hiệu trưởng (Để trống tên theo yêu cầu)
            </label>
            <input 
              type="text" 
              value={profile.principal}
              onChange={(e) => handleChange('principal', e.target.value)}
              placeholder="Để trống để ký tay thủ công" 
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none bg-white font-medium"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 mb-1">
              Địa danh ký lịch
            </label>
            <input 
              type="text" 
              value={profile.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Ví dụ: Vinh" 
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none bg-white font-semibold"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button 
          onClick={onNext}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition shadow-sm flex items-center gap-1.5"
        >
          <Save size={14} />
          <span>Lưu cấu hình & Tiếp tục</span>
        </button>
      </div>
    </div>
  );
};
