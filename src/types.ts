export interface TeacherProfile {
  school: string;
  name: string;
  year: string;
  level: 'THPT' | 'THCS';
  calType: 'chinh-khoa' | 'tang-cuong';
  principal: string;
  location: string;
}

export interface PPCTEntry {
  id: string;
  subject: string;
  grade: string; // "6" to "12"
  week: number;
  lessonNum: number;
  title: string;
  note: string;
}

export interface TKBSlot {
  id: string;
  dayOfWeek: string; // "2" | "3" | "4" | "5" | "6" | "7"
  session: 'Sáng' | 'Chiều';
  period: number; // 1 | 2 | 3 | 4 | 5
  subject: string;
  className: string;
  gradeGroup: string; // "6"-"12" extracted
  type: 'Chính khóa' | 'Tăng cường';
  note: string;
}

export interface DayBlockRow {
  period: number;
  subject: string;
  class: string;
  ppctNum: number | "";
  title: string;
  note: string;
  status: 'matched' | 'warning' | 'empty';
}

export interface DayBlock {
  dayNum: string;
  dayName: string;
  dateStr: string;
  sessionTag: string; // e.g. "(Buổi sáng)"
  rows: DayBlockRow[];
}
