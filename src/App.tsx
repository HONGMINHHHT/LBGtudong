import { useState, useEffect } from 'react';
import { TeacherProfile, PPCTEntry, TKBSlot, DayBlock } from './types';
import { 
  MOCK_TEACHER_PROFILE, 
  MOCK_PPCT_ENTRIES, 
  MOCK_TKB_SLOTS 
} from './mockData';

// Subcomponents
import { Sidebar } from './components/Sidebar';
import { Checklist } from './components/Checklist';
import { OverviewTab } from './components/OverviewTab';
import { TeacherProfileTab } from './components/TeacherProfileTab';
import { PPCTTab } from './components/PPCTTab';
import { TKBTab } from './components/TKBTab';
import { GeneratorTab } from './components/GeneratorTab';
import { ExportTab } from './components/ExportTab';
import { GuideTab } from './components/GuideTab';

// Lucide Topbar icons
import { CalendarCheck, Save, RotateCcw } from 'lucide-react';

export default function App() {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [toastMessage, setToastMessage] = useState<{ text: string, type: 'success' | 'warning' } | null>(null);

  // Core structured data blocks
  const [profile, setProfile] = useState<TeacherProfile>(MOCK_TEACHER_PROFILE);
  const [ppctEntries, setPpctEntries] = useState<PPCTEntry[]>(MOCK_PPCT_ENTRIES);
  const [tkbSlots, setTkbSlots] = useState<TKBSlot[]>(MOCK_TKB_SLOTS);
  const [periodsMap, setPeriodsMap] = useState<{ [key: string]: number }>({
    "Tin học_10": 2,
    "Tin học_6": 1
  });

  // Calendar parameters
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');

  // Dual generated grids
  const [chinhKhoaData, setChinhKhoaData] = useState<DayBlock[]>([]);
  const [tangCuongData, setTangCuongData] = useState<DayBlock[]>([]);

  // --- INITIALIZE & LOCAL STORAGE ---
  useEffect(() => {
    // 1. Calculate default calendar dates automatically (Monday to Saturday)
    const today = new Date();
    const currentDay = today.getDay(); // 0 Sunday, 1 Monday etc
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    
    const saturday = new Date(monday);
    saturday.setDate(monday.getDate() + 5);

    setDateStart(monday.toISOString().split('T')[0]);
    setDateEnd(saturday.toISOString().split('T')[0]);

    // 2. Load from storage if they already exist
    try {
      const storedProfile = localStorage.getItem('cal_teacher_profile');
      const storedPpct = localStorage.getItem('cal_ppct_data');
      const storedTkb = localStorage.getItem('cal_tkb_data');
      const storedPeriods = localStorage.getItem('cal_subject_periods_map');

      if (storedProfile) setProfile(JSON.parse(storedProfile));
      if (storedPpct) setPpctEntries(JSON.parse(storedPpct));
      if (storedTkb) setTkbSlots(JSON.parse(storedTkb));
      if (storedPeriods) setPeriodsMap(JSON.parse(storedPeriods));
    } catch (e) {
      console.error("Lỗi khi khôi phục cơ sở dữ liệu trình duyệt:", e);
    }
  }, []);

  // Sync dates label
  const handleWeekChange = (weekNum: number) => {
    setSelectedWeek(weekNum);
  };

  // Helper trigger to display notifications
  const showToast = (text: string, type: 'success' | 'warning' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Save changes to storage
  const handleSaveAll = () => {
    try {
      localStorage.setItem('cal_teacher_profile', JSON.stringify(profile));
      localStorage.setItem('cal_ppct_data', JSON.stringify(ppctEntries));
      localStorage.setItem('cal_tkb_data', JSON.stringify(tkbSlots));
      localStorage.setItem('cal_subject_periods_map', JSON.stringify(periodsMap));
      showToast("Cơ sở dữ liệu lịch dạy đã lưu trữ thành công!");
    } catch (e) {
      showToast("Không thể ghi nhớ cục bộ do đầy bộ nhớ!", "warning");
    }
  };

  // Reset to full mock configurations
  const handleResetToMock = () => {
    setProfile(MOCK_TEACHER_PROFILE);
    setPpctEntries(MOCK_PPCT_ENTRIES);
    setTkbSlots(MOCK_TKB_SLOTS);
    showToast("Đã nhập mẫu giáo án thực nghiệm tuần này!");
    
    // Auto trigger generation straight away
    setTimeout(() => {
      triggerSchedulingGeneration();
    }, 50);
  };

  // Dynamic period setting mapping
  const getPeriodsPerWeek = (subject: string, grade: string): number => {
    const key = `${subject.trim()}_${grade.trim()}`;
    if (periodsMap[key] !== undefined) {
      return periodsMap[key];
    }

    // Heuristics
    const cleanSub = subject.toLowerCase();
    const gradeNum = parseInt(grade) || 6;
    if (cleanSub.includes("tin học") || cleanSub.includes("hđtn") || cleanSub.includes("trải nghiệm")) {
      return gradeNum >= 10 ? 2 : 1;
    }
    return 2;
  };

  const handleUpdatePeriodsMap = (subject: string, grade: string, periods: number) => {
    const key = `${subject.trim()}_${grade.trim()}`;
    const updated = { ...periodsMap, [key]: periods };
    setPeriodsMap(updated);
    localStorage.setItem('cal_subject_periods_map', JSON.stringify(updated));
  };

  // --- PPCT LIST MODIFICATIONS ---
  const handleAddPPCTEntries = (newEntries: PPCTEntry[]) => {
    const updated = [...ppctEntries, ...newEntries];
    setPpctEntries(updated);
    localStorage.setItem('cal_ppct_data', JSON.stringify(updated));
    showToast(`Đã lưu thêm ${newEntries.length} bài vào ngân hàng PPCT.`);
  };

  const handleDeletePPCTRow = (id: string) => {
    const updated = ppctEntries.filter(entry => entry.id !== id);
    setPpctEntries(updated);
    localStorage.setItem('cal_ppct_data', JSON.stringify(updated));
    showToast("Đã xóa bài giảng khỏi cơ sở dữ liệu.");
  };

  const handleClearPPCT = () => {
    setPpctEntries([]);
    localStorage.setItem('cal_ppct_data', JSON.stringify([]));
    showToast("Đã xóa trống phân phối chương trình môn học.");
  };

  // --- TKB MODIFICATIONS ---
  const handleAddTKBSlot = (slotInput: Omit<TKBSlot, 'id' | 'gradeGroup'>) => {
    const gradeGroup = slotInput.className.match(/\d+/)?.[0] || "";
    const newSlot: TKBSlot = {
      ...slotInput,
      id: 't-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      gradeGroup
    };

    const updated = [...tkbSlots, newSlot];
    setTkbSlots(updated);
    localStorage.setItem('cal_tkb_data', JSON.stringify(updated));
    showToast("Thứ tự tiết dạy đã được điền.");
  };

  const handleDeleteTKBSlot = (id: string) => {
    const updated = tkbSlots.filter(s => s.id !== id);
    setTkbSlots(updated);
    localStorage.setItem('cal_tkb_data', JSON.stringify(updated));
    showToast("Đã hủy tiết dạy biểu.");
  };

  const handleClearTKB = () => {
    setTkbSlots([]);
    localStorage.setItem('cal_tkb_data', JSON.stringify([]));
    showToast("Đã dọn dẹp thời khóa biểu.");
  };

  const handleSortTKB = () => {
    const sorted = [...tkbSlots].sort((a, b) => {
      if (a.dayOfWeek !== b.dayOfWeek) return parseInt(a.dayOfWeek) - parseInt(b.dayOfWeek);
      if (a.session !== b.session) return a.session === "Sáng" ? -1 : 1;
      return a.period - b.period;
    });
    setTkbSlots(sorted);
    localStorage.setItem('cal_tkb_data', JSON.stringify(sorted));
    showToast("Đã sắp xếp thời khóa biểu theo thứ trong tuần.");
  };

  // --- PARALLEL SEQUENCE GENERATOR CORE ALGORITHM ---
  const buildGridForSchedules = (schedulesList: TKBSlot[], weekNum: number, startDayStr: string, isChinhKhoa: boolean): DayBlock[] => {
    let targetDays: string[] = [];
    if (isChinhKhoa) {
      targetDays = ["2", "3", "4", "5", "6"];
      if (schedulesList.some(s => s.dayOfWeek === "7")) {
        targetDays.push("7");
      }
    } else {
      targetDays = Array.from(new Set(schedulesList.map(s => s.dayOfWeek))).sort((a,b) => parseInt(a) - parseInt(b));
    }

    const classSubjectCounters: { [key: string]: number } = {};
    const resultBlocks: DayBlock[] = [];

    targetDays.forEach(day => {
      const daySchedules = schedulesList.filter(s => s.dayOfWeek === day);
      if (daySchedules.length === 0 && !isChinhKhoa) return;

      const morningSchedules = daySchedules.filter(s => s.session === "Sáng");
      const afternoonSchedules = daySchedules.filter(s => s.session === "Chiều");

      const sessionsToBuild: Array<{ session: 'Sáng' | 'Chiều', list: TKBSlot[] }> = [];
      if (isChinhKhoa) {
        sessionsToBuild.push({ session: "Sáng", list: morningSchedules });
        if (afternoonSchedules.length > 0 || schedulesList.some(s => s.dayOfWeek === day && s.session === "Chiều")) {
          sessionsToBuild.push({ session: "Chiều", list: afternoonSchedules });
        }
      } else {
        if (morningSchedules.length > 0) sessionsToBuild.push({ session: "Sáng", list: morningSchedules });
        if (afternoonSchedules.length > 0) sessionsToBuild.push({ session: "Chiều", list: afternoonSchedules });
      }

      sessionsToBuild.forEach(sessObj => {
        const periodRows: any[] = [];
        for (let pNum = 1; pNum <= 5; pNum++) {
          const matchedTkb = sessObj.list.find(s => s.period === pNum);
          if (matchedTkb) {
            const subj = matchedTkb.subject;
            const className = matchedTkb.className;
            const gradeGroup = matchedTkb.gradeGroup || className.replace(/\D/g, "");
            
            const periodsPerWeek = getPeriodsPerWeek(subj, gradeGroup);
            const baseLessonNum = (weekNum - 1) * periodsPerWeek + 1;

            const classCounterKey = `${className.trim()}_${subj.trim()}`;
            if (classSubjectCounters[classCounterKey] === undefined) {
              classSubjectCounters[classCounterKey] = 0;
            }
            const classOffset = classSubjectCounters[classCounterKey];
            const assignedPPCTNum = baseLessonNum + classOffset;

            // Syllabus matching
            const matchedSyllabus = ppctEntries.find(p => 
              p.subject.toLowerCase() === subj.toLowerCase() &&
              p.grade.toString() === gradeGroup.toString() &&
              p.lessonNum === assignedPPCTNum
            );

            let title = "";
            let status: 'matched' | 'warning' = 'warning';
            if (matchedSyllabus) {
              title = matchedSyllabus.title;
              status = "matched";
            } else {
              title = `Chưa tìm thấy bài dạy (Tiết PPCT ${assignedPPCTNum})`;
            }

            classSubjectCounters[classCounterKey]++;

            periodRows.push({
              period: pNum,
              subject: subj,
              class: className,
              ppctNum: assignedPPCTNum,
              title: title,
              note: matchedTkb.note || "",
              status
            });
          } else {
            periodRows.push({
              period: pNum,
              subject: "",
              class: "",
              ppctNum: "",
              title: "",
              note: "",
              status: "empty"
            });
          }
        }

        let dateLabel = "...";
        if (startDayStr) {
          const baseDate = new Date(startDayStr);
          const offset = parseInt(day) - 2;
          baseDate.setDate(baseDate.getDate() + offset);
          dateLabel = baseDate.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
        }

        const daysMap: { [key: string]: string } = { "2": "Hai", "3": "Ba", "4": "Bốn", "5": "Năm", "6": "Sáu", "7": "Bảy" };
        let sessionTag = "";
        if (sessObj.session === "Sáng") {
          sessionTag = isChinhKhoa && afternoonSchedules.length > 0 ? "(Sáng)" : "";
        } else {
          sessionTag = "(Chiều)";
        }

        resultBlocks.push({
          dayNum: day,
          dayName: daysMap[day] || `Thứ ${day}`,
          dateStr: dateLabel,
          sessionTag: sessionTag,
          rows: periodRows
        });
      });
    });

    return resultBlocks;
  };

  const triggerSchedulingGeneration = () => {
    // 1. Regular 
    const regularSchedules = tkbSlots.filter(t => t.type === "Chính khóa");
    const gridChinh = buildGridForSchedules(regularSchedules, selectedWeek, dateStart, true);
    setChinhKhoaData(gridChinh);

    // 2. Extra
    const extraSchedules = tkbSlots.filter(t => t.type !== "Chính khóa");
    const gridExtra = buildGridForSchedules(extraSchedules, selectedWeek, dateStart, false);
    setTangCuongData(gridExtra);
  };

  const handleRowFieldChange = (
    sect: 'chinh-khoa' | 'tang-cuong', 
    bIdx: number, 
    rIdx: number, 
    field: any, 
    value: string
  ) => {
    if (sect === 'chinh-khoa') {
      const cloned = [...chinhKhoaData];
      let rowObj = cloned[bIdx].rows[rIdx];
      
      if (field === 'ppctNum') {
        const numVal = parseInt(value);
        rowObj.ppctNum = isNaN(numVal) ? "" : numVal;
      } else {
        rowObj[field] = value;
      }

      setChinhKhoaData(cloned);
    } else {
      const cloned = [...tangCuongData];
      let rowObj = cloned[bIdx].rows[rIdx];

      if (field === 'ppctNum') {
        const numVal = parseInt(value);
        rowObj.ppctNum = isNaN(numVal) ? "" : numVal;
      } else {
        rowObj[field] = value;
      }

      setTangCuongData(cloned);
    }
  };

  // --- AUTOMATIC QUICK BUTTONS ---
  const handleFillDatesQuickly = () => {
    const today = new Date();
    const currentDay = today.getDay(); 
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    
    const saturday = new Date(monday);
    saturday.setDate(monday.getDate() + 5);

    setDateStart(monday.toISOString().split('T')[0]);
    setDateEnd(saturday.toISOString().split('T')[0]);
    showToast("Đã nạp mốc ngày chuẩn cho tuần hiện tại!");
  };

  // --- CORE VIEWS SWITCHER ---
  const renderActiveStepContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab 
            onTabChange={(tab) => setActiveTab(tab)}
            ppctCount={ppctEntries.length}
            classCount={new Set(tkbSlots.map(t => t.className).filter(Boolean)).size}
            tkbCount={tkbSlots.length}
            selectedWeek={selectedWeek}
          />
        );
      case 'teacher':
        return (
          <TeacherProfileTab 
            profile={profile}
            onProfileChange={(updated) => setProfile({ ...profile, ...updated })}
            onNext={() => {
              localStorage.setItem('cal_teacher_profile', JSON.stringify(profile));
              setActiveTab('ppct');
            }}
          />
        );
      case 'ppct':
        return (
          <PPCTTab 
            entries={ppctEntries}
            onAddEntries={handleAddPPCTEntries}
            onClear={handleClearPPCT}
            onDeleteRow={handleDeletePPCTRow}
            onNext={() => setActiveTab('tkb')}
            periodsMap={periodsMap}
            onUpdatePeriodsMap={handleUpdatePeriodsMap}
          />
        );
      case 'tkb':
        return (
          <TKBTab 
            slots={tkbSlots}
            onAddSlot={handleAddTKBSlot}
            onDeleteSlot={handleDeleteTKBSlot}
            onClear={handleClearTKB}
            onSort={handleSortTKB}
            onNext={() => {
              setActiveTab('generator');
              triggerSchedulingGeneration();
            }}
          />
        );
      case 'generator':
        return (
          <GeneratorTab 
            week={selectedWeek}
            onWeekChange={handleWeekChange}
            dateStart={dateStart}
            onDateStartChange={(val) => {
              setDateStart(val);
              // Auto end date offset
              try {
                const bDate = new Date(val);
                bDate.setDate(bDate.getDate() + 5);
                setDateEnd(bDate.toISOString().split('T')[0]);
              } catch(e){}
            }}
            dateEnd={dateEnd}
            onDateEndChange={setDateEnd}
            onGenerate={triggerSchedulingGeneration}
            chinhKhoaData={chinhKhoaData}
            tangCuongData={tangCuongData}
            onRowFieldChange={handleRowFieldChange}
            onNext={() => {
              triggerSchedulingGeneration();
              setActiveTab('export');
            }}
          />
        );
      case 'export':
        return (
          <ExportTab 
            profile={profile}
            week={selectedWeek}
            dateStart={dateStart}
            dateEnd={dateEnd}
            chinhKhoaData={chinhKhoaData}
            tangCuongData={tangCuongData}
          />
        );
      case 'guide':
        return <GuideTab />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col antialiased select-none font-sans">
      {/* Top utility action banner (Hidden on print) */}
      <header className="bg-gradient-to-r from-sky-800 to-indigo-900 text-white shadow-sm px-4 py-3.5 sticky top-0 z-40 flex items-center justify-between print:hidden">
        <div className="flex items-center space-x-3">
          <div className="bg-white/10 p-2 rounded-lg backdrop-blur-xs">
            <CalendarCheck className="text-amber-300" size={22} />
          </div>
          <div>
            <h1 className="text-sm md:text-base font-extrabold tracking-tight flex items-center gap-2">
              LỊCH BÁO GIẢNG TỰ ĐỘNG
              <span className="text-[9px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full uppercase">ĐH VINH</span>
            </h1>
            <p className="text-[10px] text-sky-200 hidden md:block font-medium">Bản quyền biên soạn chuẩn mẫu văn phòng Trường TH, THCS&THPT THSP Đại học Vinh</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick Week Indicator Badge */}
          <div className="hidden lg:flex bg-white/10 px-3 py-1.5 rounded-lg text-xs items-center gap-1.5 border border-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Tuần hoạt động: <strong className="text-amber-300">Tuần {selectedWeek < 10 ? '0' + selectedWeek : selectedWeek}</strong></span>
          </div>

          <button 
            onClick={handleSaveAll}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition duration-150 flex items-center gap-1 shadow-sm"
          >
            <Save size={13} />
            <span className="hidden md:inline">Lưu dữ liệu</span>
          </button>
          
          <button 
            onClick={handleResetToMock}
            className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition duration-150 flex items-center gap-1"
          >
            <RotateCcw size={13} />
            <span className="hidden md:inline">Mẫu thử nghiệm</span>
          </button>
        </div>
      </header>

      {/* Main interface grids container */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation panel */}
        <Sidebar 
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === 'generator' || tab === 'export') {
              triggerSchedulingGeneration();
            }
          }}
          ppctCount={ppctEntries.length}
          classCount={new Set(tkbSlots.map(t => t.className).filter(Boolean)).size}
          tkbCount={tkbSlots.length}
          currentWeek={selectedWeek}
          onSave={handleSaveAll}
          onReset={handleResetToMock}
        />

        {/* Content sections area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          
          {/* Custom state interactive toast container */}
          {toastMessage && (
            <div className="fixed top-18 right-4 z-50 pointer-events-none animate-in fade-in slide-in-from-top-3 duration-200">
              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-xs font-bold bg-white text-slate-800 ${
                toastMessage.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-amber-200 bg-amber-50 text-amber-900'
              }`}>
                <span>{toastMessage.text}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Steps & Views center columns */}
            <div className="xl:col-span-3 space-y-6">
              {renderActiveStepContent()}
            </div>

            {/* Checklist right rail column */}
            <div className="xl:col-span-1 print:hidden">
              <Checklist 
                teacherName={profile.name}
                school={profile.school}
                hasPPCT={ppctEntries.length > 0}
                hasTKB={tkbSlots.length > 0}
                onFillDates={handleFillDatesQuickly}
                onFillMock={handleResetToMock}
              />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
