import React, { useState, useEffect } from 'react';
import { PPCTEntry } from '../types';
import { BookOpen, Trash2, ArrowRight, HelpCircle, HardDriveDownload, Search, Sparkles, SlidersHorizontal } from 'lucide-react';

interface PPCTTabProps {
  entries: PPCTEntry[];
  onAddEntries: (newEntries: PPCTEntry[]) => void;
  onClear: () => void;
  onDeleteRow: (id: string) => void;
  onNext: () => void;
  periodsMap: { [key: string]: number };
  onUpdatePeriodsMap: (subject: string, grade: string, periods: number) => void;
}

export const PPCTTab: React.FC<PPCTTabProps> = ({
  entries,
  onAddEntries,
  onClear,
  onDeleteRow,
  onNext,
  periodsMap,
  onUpdatePeriodsMap
}) => {
  const [subject, setSubject] = useState("Tin học");
  const [grade, setGrade] = useState("10");
  const [periodsPerWeek, setPeriodsPerWeek] = useState(2);
  const [rawText, setRawText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showHelperModal, setShowHelperModal] = useState(false);
  const [showAutoBadge, setShowAutoBadge] = useState(true);

  // Auto-detect national defaults
  useEffect(() => {
    const subClean = subject.trim().toLowerCase();
    const gradeVal = parseInt(grade) || 6;
    let fallbackPeriods = 2;
    let detected = false;

    if (gradeVal >= 6 && gradeVal <= 9) {
      if (subClean.includes("tin học") || subClean.includes("tínhọc") || subClean.includes("tin hoc") || 
          subClean.includes("hđtn") || subClean.includes("trải nghiệm") || subClean.includes("trai nghiem")) {
        fallbackPeriods = 1;
        detected = true;
      }
    } else if (gradeVal >= 10 && gradeVal <= 12) {
      if (subClean.includes("tin học") || subClean.includes("tínhọc") || subClean.includes("tin hoc")) {
        fallbackPeriods = 2;
        detected = true;
      }
    }

    // Mainstream Vietnamese curriculum heuristics
    if (!detected) {
      if (subClean.includes("toán") || subClean.includes("toan") || 
          subClean.includes("văn") || subClean.includes("ngữ văn") || subClean.includes("ngu van")) {
        fallbackPeriods = gradeVal >= 10 ? 3 : 4;
        detected = true;
      } else if (subClean.includes("vật lý") || subClean.includes("vật lí") || subClean.includes("hóa") || subClean.includes("sinh") || subClean.includes("địa") || subClean.includes("sử") || subClean.includes("anh")) {
        fallbackPeriods = 2;
        detected = true;
      }
    }

    setPeriodsPerWeek(fallbackPeriods);
    setShowAutoBadge(detected);

    if (detected) {
      onUpdatePeriodsMap(subject.trim(), grade, fallbackPeriods);
    }
  }, [subject, grade]);

  // Handle local period select change
  const handlePeriodsSelectChange = (num: number) => {
    setPeriodsPerWeek(num);
    onUpdatePeriodsMap(subject.trim(), grade, num);
  };

  const processAndImport = (text: string) => {
    if (!subject.trim()) {
      alert("Vui lòng nhập tên môn học!");
      return;
    }

    const lines = text.split('\n');
    const added: PPCTEntry[] = [];

    lines.forEach(line => {
      let clean = line.trim();
      if (!clean) return;

      // Skip lines with header terms like "Tiết" or "Bài" without actual numbers
      if (clean.toLowerCase().includes('tiết') && clean.toLowerCase().includes('bài') && !/\d/.test(clean)) {
        return;
      }

      // Strip excel wrapping quotes
      clean = clean.replace(/^"(\d+),?"/, "$1");

      let parts: string[] = [];
      if (clean.includes('|')) {
        parts = clean.split('|');
      } else if (clean.includes('\t')) {
        parts = clean.split('\t');
      } else if (clean.includes(';')) {
        parts = clean.split(';');
      } else {
        const firstComma = clean.indexOf(',');
        if (firstComma !== -1) {
          parts = [
            clean.substring(0, firstComma),
            clean.substring(firstComma + 1)
          ];
        } else {
          const regexMatch = clean.match(/^(\d+)[\s-:.|]+(.*)$/);
          if (regexMatch) {
            parts = [regexMatch[1], regexMatch[2]];
          }
        }
      }

      if (parts.length >= 2) {
        const rawPeriodNum = parts[0].replace(/\D/g, "");
        const lessonNum = parseInt(rawPeriodNum);
        const title = parts[1].replace(/^"|"$/g, '').trim();

        if (!isNaN(lessonNum) && title) {
          const calculatedWeek = Math.ceil(lessonNum / periodsPerWeek);
          added.push({
            id: 'p-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
            subject: subject.trim(),
            grade: grade,
            week: calculatedWeek,
            lessonNum: lessonNum,
            title: title,
            note: "Tự động phân bổ"
          });
        }
      }
    });

    if (added.length > 0) {
      onAddEntries(added);
      setRawText("");
    } else {
      alert("Không tìm thấy dòng tương tích để nhập! Xin vui lòng kiểm tra lại định dạng.");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        processAndImport(content);
      }
    };
    reader.readAsText(file, 'UTF-8');
  };

  const filtered = entries.filter(item => {
    const q = searchText.toLowerCase();
    return item.subject.toLowerCase().includes(q) || 
           item.grade.includes(q) || 
           item.title.toLowerCase().includes(q);
  });

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="space-y-0.5">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="text-sky-600 shrink-0" size={18} />
            <span>Bước 2: Tải và Lưu Phân Phối Chương Trình (PPCT)</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">Cấu hình môn học và hệ thống sẽ tự áp tuần giảng phù hợp.</p>
        </div>
        <button 
          onClick={onClear}
          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 text-xs font-semibold px-3 py-1.5 rounded-lg transition shrink-0"
        >
          Xóa sạch PPCT
        </button>
      </div>

      {/* Dynamic Auto Heuristic Panel */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1">
            <SlidersHorizontal size={13} className="text-sky-600" />
            <span>Cấu hình môn học chuẩn bị tải lên</span>
          </h3>
          {showAutoBadge && (
            <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold border border-emerald-200 flex items-center gap-1">
              <Sparkles size={10} /> Định mức tự động từ Bộ GD&ĐT
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">Môn học đang nhập PPCT</label>
            <input 
              type="text" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ví dụ: Tin học, Toán..." 
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold bg-white"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">Khối lớp (6 - 12)</label>
            <select 
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold bg-white"
            >
              {[6,7,8,9,10,11,12].map(g => (
                <option key={g} value={g.toString()}>Khối lớp {g}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">Số tiết môn này / Tuần</label>
            <select 
              value={periodsPerWeek}
              onChange={(e) => handlePeriodsSelectChange(parseInt(e.target.value))}
              className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold bg-white"
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n} tiết / tuần</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Upload and pasting area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Dán danh sách Tiết và Bài học trực tiếp
            </h4>
            <p className="text-[10px] text-slate-500 font-medium">Bôi đen copy cột Tiết và Tên bài từ file của thầy cô dán trực tiếp:</p>
            <textarea 
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              rows={5} 
              placeholder="1,Bài 1: Thông tin và xử lí thông tin&#10;2,Bài 2: Vai trò của thiết bị số" 
              className="w-full p-2.5 text-xs border border-slate-200 rounded-lg font-mono bg-white focus:outline-none focus:border-sky-500"
            />
          </div>
          <div className="flex justify-between items-center pt-1">
            <button 
              onClick={() => setShowHelperModal(true)}
              className="text-sky-600 hover:underline font-bold text-[10px] flex items-center gap-1"
            >
              <HelpCircle size={12} /> Hướng dẫn định dạng csv
            </button>
            <button 
              onClick={() => processAndImport(rawText)}
              className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition shadow-sm"
            >
              Lưu PPCT này
            </button>
          </div>
        </div>

        <div 
          onClick={() => document.getElementById('file-loader')?.click()}
          className="border-2 border-dashed border-slate-200 hover:border-sky-400 bg-slate-50/50 rounded-xl p-5 text-center flex flex-col justify-center items-center group transition cursor-pointer"
        >
          <input 
            type="file" 
            id="file-loader" 
            className="hidden" 
            accept=".txt,.csv" 
            onChange={handleFileUpload} 
          />
          <div className="bg-white p-3 rounded-full shadow-sm text-sky-600 mb-2.5 group-hover:scale-105 transition">
            <HardDriveDownload size={22} />
          </div>
          <h4 className="text-xs font-bold text-slate-700">Tải lên file văn bản thô (.txt, .csv)</h4>
          <p className="text-[10px] text-slate-400 mt-1 max-w-xs leading-relaxed font-semibold">Tải tệp dạng ngăn cách bằng dấu phẩy UTF-8 trực tiếp từ máy của thầy cô.</p>
        </div>
      </div>

      {/* PPCT live list table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-slate-50 px-3.5 py-2.5 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-bold text-slate-700 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
            Bảng PPCT đã ghi nhớ ({filtered.length} bài)
          </span>
          <div className="relative w-full sm:w-48 shrink-0">
            <Search size={12} className="absolute left-2.5 top-2.5 text-slate-400" />
            <input 
              type="text" 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Bộ lọc nhanh môn, bài..."
              className="w-full pl-7 pr-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white font-medium"
            />
          </div>
        </div>
        <div className="overflow-x-auto max-h-64">
          <table className="w-full text-left border-collapse text-xs min-w-[500px]">
            <thead>
              <tr className="bg-slate-100 text-slate-500 uppercase tracking-widest text-[9px] border-b border-slate-200 font-bold">
                <th className="p-2.5">Môn học</th>
                <th className="p-2.5">Khối</th>
                <th className="p-2.5 text-center">Tuần</th>
                <th className="p-2.5 text-center">Tiết PPCT</th>
                <th className="p-2.5">Tên bài dạy</th>
                <th className="p-2.5 text-center w-14">Xóa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-slate-400">Không có bản ghi phù hợp.</td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="p-2.5 text-slate-800 font-bold">{item.subject}</td>
                    <td className="p-2.5">Khối {item.grade}</td>
                    <td className="p-2.5 text-center text-sky-700 font-bold">Tuần {item.week}</td>
                    <td className="p-2.5 text-center font-bold">Tiết {item.lessonNum}</td>
                    <td className="p-2.5 text-slate-700 font-serif leading-relaxed">{item.title}</td>
                    <td className="p-2.5 text-center">
                      <button 
                        onClick={() => onDeleteRow(item.id)}
                        className="text-red-500 hover:text-red-700 hover:scale-105 transition"
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
          <span>Tiếp tục sang Thời khóa biểu</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Helper Modal */}
      {showHelperModal && (
        <div className="fixed inset-0 bg-slate-900/45 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-sky-800 text-white px-5 py-3.5 font-bold text-xs uppercase flex items-center justify-between">
              <span>Hướng dẫn định dạng dán raw chuẩn</span>
              <button onClick={() => setShowHelperModal(false)} className="hover:text-amber-300 font-bold">✕</button>
            </div>
            <div className="p-5 space-y-3.5 text-xs text-slate-600 leading-relaxed font-semibold">
              <p>Mở file phân phối chương trình của thầy cô bằng Excel hoặc Word, copy cột chứa **Số thứ tự (Tiết)** và cột **Tên bài học**. Sau đó dán trực tiếp.</p>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono text-[10px] text-emerald-700">
                <p>1,Bài 1: Thông tin và xử lý thông tin</p>
                <p>2,Bài 1: Thông tin và xử lý thông tin (Tiếp)</p>
                <p>3,Bài 2: Thực hành sử dụng thiết bị mạng</p>
              </div>
              <p className="text-slate-400 text-[10px]">Máy tính sẽ tự động quy đổi số tiết của tuần dựa trên định mức số tiết/tuần.</p>
            </div>
            <div className="bg-slate-50 px-5 py-3 flex justify-end">
              <button 
                onClick={() => setShowHelperModal(false)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-1.5 rounded-lg font-bold text-xs"
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
