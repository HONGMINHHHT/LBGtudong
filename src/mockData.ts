import { TeacherProfile, PPCTEntry, TKBSlot } from './types';

export const MOCK_TEACHER_PROFILE: TeacherProfile = {
  school: "Trường TH, THCS&THPT THSP Đại học Vinh",
  name: "Trần Thị Hồng Minh",
  year: "2026 - 2027",
  level: "THPT",
  calType: "chinh-khoa",
  principal: "", // Default to blank as requested to support physical signatures
  location: "Vinh"
};

// Standard National Curriculum Syllabus for Computer Science 10 (2 periods/week) & Grade 6 (1 period/week)
export const MOCK_PPCT_ENTRIES: PPCTEntry[] = [
  // Grade 10: Tin học (2 periods/week)
  { id: "p10-1", subject: "Tin học", grade: "10", week: 1, lessonNum: 1, title: "Chủ đề A - Bài 1: Thông tin và xử lý thông tin", note: "Tự động phân bổ" },
  { id: "p10-2", subject: "Tin học", grade: "10", week: 1, lessonNum: 2, title: "Chủ đề A - Bài 1: Thông tin và xử lý thông tin (Tiếp theo)", note: "Tự động phân bổ" },
  { id: "p10-3", subject: "Tin học", grade: "10", week: 2, lessonNum: 3, title: "Bài 2: Vai trò của thiết bị thông minh đối với xã hội", note: "Tự động phân bổ" },
  { id: "p10-4", subject: "Tin học", grade: "10", week: 2, lessonNum: 4, title: "Bài 3: Thực hành sử dụng thiết bị số thông dụng", note: "Tự động phân bổ" },
  { id: "p10-5", subject: "Tin học", grade: "10", week: 3, lessonNum: 5, title: "Chủ đề B - Bài 1: Mạng máy tính trong cuộc sống hiện đại", note: "Tự động phân bổ" },
  { id: "p10-6", subject: "Tin học", grade: "10", week: 3, lessonNum: 6, title: "Bài 2: Điện toán đám mây và sự phát triển internet", note: "Tự động phân bổ" },
  { id: "p10-7", subject: "Tin học", grade: "10", week: 4, lessonNum: 7, title: "Bài 3: Thực hành khai thác tài nguyên trên mạng internet", note: "Tự động phân bổ" },
  { id: "p10-8", subject: "Tin học", grade: "10", week: 4, lessonNum: 8, title: "Bài 4: An toàn thông tin và bảo mật trên môi trường mạng", note: "Tự động phân bổ" },
  { id: "p10-9", subject: "Tin học", grade: "10", week: 5, lessonNum: 9, title: "Chủ đề D - Bài 1: Đạo đức, pháp luật và văn hóa ứng xử trực tuyến", note: "Tự động phân bổ" },
  { id: "p10-10", subject: "Tin học", grade: "10", week: 5, lessonNum: 10, title: "Bài 2: Thực hành ứng xử có văn hóa trên mạng xã hội", note: "Tự động phân bổ" },
  { id: "p10-11", subject: "Tin học", grade: "10", week: 6, lessonNum: 11, title: "Chủ đề F - Bài 1: Khái niệm hệ cơ sở dữ liệu (CSDL)", note: "Tự động phân bổ" },
  { id: "p10-12", subject: "Tin học", grade: "10", week: 6, lessonNum: 12, title: "Bài 2: Vai trò của CSDL trong hoạt động quản lý", note: "Tự động phân bổ" },
  { id: "p10-13", subject: "Tin học", grade: "10", week: 7, lessonNum: 13, title: "Bài 3: Thực hành truy vấn thông tin trong cơ sở dữ liệu", note: "Tự động phân bổ" },
  { id: "p10-14", subject: "Tin học", grade: "10", week: 7, lessonNum: 14, title: "Ôn tập giữa học kỳ I", note: "Tự động phân bổ" },
  { id: "p10-15", subject: "Tin học", grade: "10", week: 8, lessonNum: 15, title: "Kiểm tra định kì giữa học kỳ I", note: "Đánh giá định kỳ" },
  { id: "p10-16", subject: "Tin học", grade: "10", week: 8, lessonNum: 16, title: "Chủ đề G - Bài 1: Thuật toán và các cấu trúc điều khiển cơ bản", note: "Tự động phân bổ" },
  { id: "p10-17", subject: "Tin học", grade: "10", week: 9, lessonNum: 17, title: "Bài 2: Ngôn ngữ lập trình trực quan và biến số", note: "Tự động phân bổ" },
  { id: "p10-18", subject: "Tin học", grade: "10", week: 9, lessonNum: 18, title: "Bài 3: Thực hành sơ lập chương trình tính toán đơn giản", note: "Tự động phân bổ" },
  { id: "p10-19", subject: "Tin học", grade: "10", week: 10, lessonNum: 19, title: "Bài 4: Cấu trúc rẽ nhánh trong lập trình", note: "Tự động phân bổ" },
  { id: "p10-20", subject: "Tin học", grade: "10", week: 10, lessonNum: 20, title: "Bài 5: Vòng lặp xác định và không xác định", note: "Tự động phân bổ" },

  // Grade 6: Tin học (1 period/week)
  { id: "p6-1", subject: "Tin học", grade: "6", week: 1, lessonNum: 1, title: "Chủ đề A - Bài 1: Thông tin và thu nhận dữ liệu trong đời sống", note: "Tự động phân bổ" },
  { id: "p6-2", subject: "Tin học", grade: "6", week: 2, lessonNum: 2, title: "Bài 2: Biểu diễn thông tin trong máy tính", note: "Tự động phân bổ" },
  { id: "p6-3", subject: "Tin học", grade: "6", week: 3, lessonNum: 3, title: "Bài 3: Hoạt động thông tin của con người", note: "Tự động phân bổ" },
  { id: "p6-4", subject: "Tin học", grade: "6", week: 4, lessonNum: 4, title: "Bài 4: Khái niệm mạng máy tính và lợi ích thiết thực", note: "Tự động phân bổ" },
  { id: "p6-5", subject: "Tin học", grade: "6", week: 5, lessonNum: 5, title: "Chủ đề B - Bài 1: Tìm kiếm thông tin trên mạng internet", note: "Tự động phân bổ" },
  { id: "p6-6", subject: "Tin học", grade: "6", week: 6, lessonNum: 6, title: "Bài 2: Thư điện tử và quy tắc giao tiếp an toàn mạng", note: "Tự động phân bổ" },
  { id: "p6-7", subject: "Tin học", grade: "6", week: 7, lessonNum: 7, title: "Chủ đề C - Bài 1: Sắp xếp thông tin trong thư mục tệp tin", note: "Tự động phân bổ" },
  { id: "p6-8", subject: "Tin học", grade: "6", week: 8, lessonNum: 8, title: "Bài 2: Ôn tập các kiến thức cốt lõi cuối học kỳ I", note: "Tự động phân bổ" },
  { id: "p6-9", subject: "Tin học", grade: "6", week: 9, lessonNum: 9, title: "Kiểm tra định kì giữa kỳ I", note: "Đánh giá định kỳ" },
  { id: "p6-10", subject: "Tin học", grade: "6", week: 10, lessonNum: 10, title: "Chủ đề D - Bài 1: Soạn thảo văn bản cơ bản và định dạng", note: "Tự động phân bổ" }
];

export const MOCK_TKB_SLOTS: TKBSlot[] = [
  // CHÍNH KHÓA (Regular Curriculum)
  {
    id: "t1",
    dayOfWeek: "2", // Thứ 2
    session: "Sáng",
    period: 1,
    subject: "Tin học",
    className: "10A1",
    gradeGroup: "10",
    type: "Chính khóa",
    note: ""
  },
  {
    id: "t2",
    dayOfWeek: "2", // Thứ 2
    session: "Sáng",
    period: 2,
    subject: "Tin học",
    className: "10A2",
    gradeGroup: "10",
    type: "Chính khóa",
    note: ""
  },
  {
    id: "t3",
    dayOfWeek: "3", // Thứ 3
    session: "Sáng",
    period: 3,
    subject: "Tin học",
    className: "6A1",
    gradeGroup: "6",
    type: "Chính khóa",
    note: ""
  },
  {
    id: "t4",
    dayOfWeek: "4", // Thứ 4
    session: "Sáng",
    period: 1,
    subject: "Tin học",
    className: "10A1", // Meeting 10A1 for the 2nd time in Week 1!
    gradeGroup: "10",
    type: "Chính khóa",
    note: ""
  },
  {
    id: "t5",
    dayOfWeek: "4", // Thứ 4
    session: "Sáng",
    period: 2,
    subject: "Tin học",
    className: "10A2", // Meeting 10A2 for the 2nd time in Week 1!
    gradeGroup: "10",
    type: "Chính khóa",
    note: ""
  },
  {
    id: "t6",
    dayOfWeek: "5", // Thứ 5
    session: "Sáng",
    period: 4,
    subject: "Tin học",
    className: "6A1", // Repeat slot
    gradeGroup: "6",
    type: "Chính khóa",
    note: ""
  },

  // TĂNG CƯỜNG / HỌC THÊM (Extra Hours - automatically separated in Word/Excel page 2)
  {
    id: "t7",
    dayOfWeek: "3", // Thứ 3 Chiều
    session: "Chiều",
    period: 1,
    subject: "Tin học",
    className: "10A1",
    gradeGroup: "10",
    type: "Tăng cường",
    note: "Bồi dưỡng chuyên đề nâng cao"
  },
  {
    id: "t8",
    dayOfWeek: "3", // Thứ 3 Chiều
    session: "Chiều",
    period: 2,
    subject: "Tin học",
    className: "10A2",
    gradeGroup: "10",
    type: "Tăng cường",
    note: "Ôn luyện lập trình"
  },
  {
    id: "t9",
    dayOfWeek: "5", // Thứ 5 Chiều
    session: "Chiều",
    period: 1,
    subject: "Tin học",
    className: "10A1",
    gradeGroup: "10",
    type: "Tăng cường",
    note: "Phòng máy B2"
  }
];
