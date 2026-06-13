import React, { useState } from 'react';
import { DayBlock } from '../types';
import { Sparkles, Calendar, Sparkle, ArrowRight, Table, Check, Edit2 } from 'lucide-react';

interface GeneratorTabProps {
  week: number;
  onWeekChange: (week: number) => void;
  dateStart: string;
  onDateStartChange: (val: string) => void;
  dateEnd: string;
  onDateEndChange: (val: string) => void;
  onGenerate: () => void;
  chinhKhoaData: DayBlock[];
  tangCuongData: DayBlock[];
  onRowFieldChange: (sect: 'chinh-khoa' | 'tang-cuong', bIdx: number, rIdx: number, field: any, value: string) => void;
  onNext: () => void;
}

export const GeneratorTab: React.FC<GeneratorTabProps> = ({
  week,
  onWeekChange,
  dateStart,
  onDateStartChange,
  dateEnd,
  onDateEndChange,
  onGenerate,
  chinhKhoaData,
  tangCuongData,
  onRowFieldChange,
  onNext
}) => {
  const [activeSect, setActiveSect] = useState<'chinh-khoa' | 'tang-cuong'>("chinh-khoa");
  const [loading, setLoading] = useState(false);

  const handleGenerateClick = () => {
    setLoading(true);
    setTimeout(() => {
      onGenerate();
      setLoading(false);
    }, 400);
  };

  const activeDataset = activeSect === 'chinh-khoa' ? chinhKhoaData : tangCuongData;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Sparkles className="text-sky-600 shrink-0" size={18} />
          <span>Bước 4: Tạo và Hiệu Chỉnh Lịch Báo Giảng Tự Động</span>
        </h2>
        <p className="text-xs text-slate-500 font-medium">Khớp dữ liệu TKB với PPCT để sinh song song cả Lịch Chính khóa và Tăng cường.</p>
      </div>

      {/* Inputs controls */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-[10px] font-bold text-slate-600 mb-1 flex items-center gap-1.5">
            <Calendar size={12} />
            <span>Tuần báo giảng</span>
          </label>
          <select 
            value={week}
            onChange={(e) => onWeekChange(parseInt(e.target.value))}
            className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold bg-white"
          >
            {Array.from({ length: 35 }, (_, i) => i + 1).map(w => (
              <option key={w} value={w}>Tuần {w < 10 ? '0' + w : w}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-600 mb-1 flex items-center gap-1">
            <span>Từ ngày (Thứ 2)</span>
          </label>
          <input 
            type="date"
            value={dateStart}
            onChange={(e) => onDateStartChange(e.target.value)}
            className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-white font-semibold focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-600 mb-1 flex items-center gap-1">
            <span>Đến ngày (Thứ Sáu/Bảy)</span>
          </label>
          <input 
            type="date"
            value={dateEnd}
            onChange={(e) => onDateEndChange(e.target.value)}
            className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-white font-semibold focus:outline-none"
          />
        </div>

        <div>
          <button 
            onClick={handleGenerateClick}
            disabled={loading}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs py-2 rounded-lg shadow-sm transition flex items-center justify-center gap-1.5"
          >
            <Sparkle size={13} className={loading ? "animate-spin" : ""} />
            <span>{loading ? "Đang sắp đặt..." : "TẠO CẢ 2 MẪU LỊCH"}</span>
          </button>
        </div>
      </div>

      {/* Sections toggle */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-2 gap-2">
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveSect('chinh-khoa')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeSect === 'chinh-khoa' 
                  ? "bg-sky-600 text-white shadow-sm" 
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Lịch Chính Khóa
            </button>
            <button 
              onClick={() => setActiveSect('tang-cuong')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeSect === 'tang-cuong' 
                  ? "bg-sky-600 text-white shadow-sm" 
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Lịch Tăng Cường
            </button>
          </div>
          <span className="text-[10px] bg-sky-50 text-sky-700 px-2.5 py-1 rounded-full font-bold border border-sky-100/30">
            Sửa chính xác trực tiếp vào bất cứ học ô nào để tinh chỉnh
          </span>
        </div>

        {/* Dynamic Interactive List */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left border-collapse text-xs min-w-[700px]">
            <thead>
              <tr className="bg-slate-100 text-slate-500 uppercase tracking-widest text-[9px] border-b border-slate-200 font-bold">
                <th className="p-2.5 w-24">Thứ, Ngày</th>
                <th className="p-2.5 w-16 text-center">Tiết TKB</th>
                <th className="p-2.5 w-28">Môn học</th>
                <th className="p-2.5 w-20">Lớp dạy</th>
                <th className="p-2.5 w-20 text-center">Tiết PPCT</th>
                <th className="p-2.5">Tên bài dạy (Nhấp sửa trực tiếp)</th>
                <th className="p-2.5 w-28">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {activeDataset.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    <Table size={24} className="mx-auto text-slate-300 mb-2" />
                    Chưa dựng lịch tuần này. Thầy cô vui lòng chọn ngày ở trên rồi bấm "TẠO CẢ 2 MẪU LỊCH"
                  </td>
                </tr>
              ) : (
                activeDataset.map((block, bIdx) => (
                  block.rows.map((row, rIdx) => (
                    <tr key={`${bIdx}-${rIdx}`} className="hover:bg-slate-50/50 border-b border-slate-100 last:border-b-0">
                      {rIdx === 0 && (
                        <td 
                          rowSpan={5} 
                          className="p-3 font-extrabold text-slate-700 border-r border-slate-200 bg-slate-50/50 align-middle text-center shrink-0"
                          style={{ verticalAlign: 'middle' }}
                        >
                          <div className="space-y-1">
                            <span className="block text-slate-800 text-xs">Thứ {block.dayName}</span>
                            <span className="block text-[10px] text-sky-600 font-bold">{block.dateStr}</span>
                            {block.sessionTag && (
                              <span className="block text-[8px] text-slate-400 font-normal">{block.sessionTag}</span>
                            )}
                          </div>
                        </td>
                      )}
                      
                      <td className="p-2 text-center font-bold text-slate-600 bg-slate-50 border-r border-slate-200">
                        Tiết {row.period}
                      </td>

                      <td className="p-1 px-2">
                        <input 
                          type="text" 
                          value={row.subject}
                          onChange={(e) => onRowFieldChange(activeSect, bIdx, rIdx, 'subject', e.target.value)}
                          placeholder="..."
                          className="w-full text-xs p-1 font-semibold border border-transparent hover:border-slate-300 focus:border-sky-500 rounded focus:bg-white"
                        />
                      </td>

                      <td className="p-1 px-2">
                        <input 
                          type="text" 
                          value={row.class}
                          onChange={(e) => onRowFieldChange(activeSect, bIdx, rIdx, 'class', e.target.value)}
                          placeholder="..."
                          className="w-full text-xs p-1 font-bold text-indigo-700 border border-transparent hover:border-slate-300 focus:border-sky-500 rounded focus:bg-white text-center"
                        />
                      </td>

                      <td className="p-1 px-2 text-center">
                        <input 
                          type="text" 
                          value={row.ppctNum === "" ? "" : row.ppctNum}
                          onChange={(e) => onRowFieldChange(activeSect, bIdx, rIdx, 'ppctNum', e.target.value)}
                          placeholder="..."
                          className="w-10 text-center text-xs p-1 font-bold text-slate-800 border border-transparent hover:border-slate-300 focus:border-sky-500 rounded focus:bg-white"
                        />
                      </td>

                      <td className="p-1 px-2">
                        <div className="relative flex items-center group/cell">
                          <input 
                            type="text" 
                            value={row.title}
                            onChange={(e) => onRowFieldChange(activeSect, bIdx, rIdx, 'title', e.target.value)}
                            placeholder="Trống"
                            className={`w-full text-xs p-1 font-serif pr-6 border border-transparent hover:border-slate-300 focus:border-sky-500 rounded focus:bg-white ${
                              row.status === 'warning' ? 'text-amber-600 font-semibold' : ''
                            }`}
                          />
                          <Edit2 size={10} className="absolute right-1.5 opacity-0 group-hover/cell:opacity-40 text-slate-400 pointer-events-none" />
                        </div>
                      </td>

                      <td className="p-1 px-2">
                        <input 
                          type="text" 
                          value={row.note}
                          onChange={(e) => onRowFieldChange(activeSect, bIdx, rIdx, 'note', e.target.value)}
                          placeholder="..."
                          className="w-full text-xs p-1 text-slate-400 border border-transparent hover:border-slate-300 focus:border-sky-500 rounded focus:bg-white"
                        />
                      </td>
                    </tr>
                  ))
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
          <span>Chuyển tới Xem trước & Tải file</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
