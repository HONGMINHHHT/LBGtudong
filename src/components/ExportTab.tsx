import React from 'react';
import { TeacherProfile, DayBlock } from '../types';
import { Printer, Download, FileSpreadsheet, FileText, CheckSquare, Sparkles } from 'lucide-react';

interface ExportTabProps {
  profile: TeacherProfile;
  week: number;
  dateStart: string;
  dateEnd: string;
  chinhKhoaData: DayBlock[];
  tangCuongData: DayBlock[];
}

export const ExportTab: React.FC<ExportTabProps> = ({
  profile,
  week,
  dateStart,
  dateEnd,
  chinhKhoaData,
  tangCuongData
}) => {

  const getWeekStr = () => {
    return week < 10 ? '0' + week : week.toString();
  };

  const getFormattedDates = () => {
    let sFormatted = ".....";
    let eFormatted = ".....";
    if (dateStart) {
      const ds = new Date(dateStart);
      sFormatted = `${ds.getDate() < 10 ? '0'+ds.getDate() : ds.getDate()}/${(ds.getMonth()+1) < 10 ? '0'+(ds.getMonth()+1) : (ds.getMonth()+1)}`;
    }
    if (dateEnd) {
      const de = new Date(dateEnd);
      eFormatted = `${de.getDate() < 10 ? '0'+de.getDate() : de.getDate()}/${(de.getMonth()+1) < 10 ? '0'+(de.getMonth()+1) : (de.getMonth()+1)}/${de.getFullYear()}`;
    }
    return { start: sFormatted, end: eFormatted };
  };

  const formattedDates = getFormattedDates();

  const getSignatureDateText = () => {
    const today = new Date();
    const loc = profile.location || 'Vinh';
    return `${loc}, ngày ${today.getDate() < 10 ? '0'+today.getDate() : today.getDate()} tháng ${(today.getMonth()+1) < 10 ? '0'+(today.getMonth()+1) : (today.getMonth()+1)} năm ${today.getFullYear()}`;
  };

  // Browser-based .doc Word Export with Page Breaks
  const exportToWord = () => {
    const page1Html = document.getElementById('print-page-1')?.innerHTML || '';
    const page2Html = document.getElementById('print-page-2')?.innerHTML || '';
    
    const wordPageBreak = '<br style="page-break-before:always; clear:both; mso-break-type:section-break;" />';
    const combinedContent = page1Html + wordPageBreak + page2Html;
    
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>" +
                   "<head><title>Lịch báo giảng</title><meta charset='utf-8'><style>" +
                   "@page { size: A4 portrait; margin: 1.5cm 1.5cm 1.5cm 1.5cm; }" +
                   "body { font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.35; color: black; }" +
                   "table { border-collapse: collapse; width: 100%; border: 1.5px solid black; }" +
                   "th { border: 1.5px solid black; padding: 5px; font-weight: bold; text-align: center; font-size: 10pt; background-color: #f2f2f2; }" +
                   "td { padding: 4.5px; font-size: 10pt; }" +
                   "</style></head><body>";
    const footer = "</body></html>";
    
    const finalHtml = header + combinedContent + footer;
    const blob = new Blob(['\ufeff' + finalHtml], { type: 'application/msword;charset=utf-8' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Lich_Bao_Giang_Tuan_${getWeekStr()}_DHVinh.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Browser-based .xls Excel Export of integrated sheets
  const exportToExcel = () => {
    let htmlTable = `<meta charset="utf-8">`;
    
    // Regular Curriculum Section
    htmlTable += `<table><thead><tr><th colspan="7" style="font-weight: bold; font-size: 13pt; text-align: center; font-family: 'Times New Roman';">LỊCH BÁO GIẢNG - CHÍNH KHÓA</th></tr>`;
    htmlTable += `<tr><th colspan="7" style="font-size: 10.5pt; text-align: center; font-family: 'Times New Roman'; font-style: italic;">Tuần ${getWeekStr()} (Từ ${formattedDates.start} đến ${formattedDates.end}) - Giáo viên: ${profile.name}</th></tr></thead><tbody>`;
    htmlTable += buildExcelHeader();
    htmlTable += buildExcelRows(chinhKhoaData);
    htmlTable += `</tbody></table>`;

    // Empty Gap Rows
    htmlTable += `<br><br><table><tr><td colspan="7" style="height:30px;"></td></tr></table><br><br>`;

    // Extra Curriculum Section
    htmlTable += `<table><thead><tr><th colspan="7" style="font-weight: bold; font-size: 13pt; text-align: center; font-family: 'Times New Roman';">LỊCH BÁO GIẢNG - CHƯƠNG TRÌNH TĂNG CƯỜNG, HỌC THÊM, HỌC BÙ</th></tr>`;
    htmlTable += `<tr><th colspan="7" style="font-size: 10.5pt; text-align: center; font-family: 'Times New Roman'; font-style: italic;">Tuần ${getWeekStr()} (Từ ${formattedDates.start} đến ${formattedDates.end}) - Giáo viên: ${profile.name}</th></tr></thead><tbody>`;
    htmlTable += buildExcelHeader();
    htmlTable += buildExcelRows(tangCuongData);
    htmlTable += `</tbody></table>`;

    const blob = new Blob(['\ufeff' + htmlTable], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Lich_Bao_Giang_Tuan_${getWeekStr()}_DHVinh.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const buildExcelHeader = () => {
    return `<tr>
      <td style="font-weight: bold; border: 1.5px solid black; background-color: #f2f2f2; font-family: 'Times New Roman'; padding: 6px;">Thứ, ngày</td>
      <td style="font-weight: bold; border: 1.5px solid black; background-color: #f2f2f2; text-align: center; font-family: 'Times New Roman'; padding: 6px;">Tiết TKB</td>
      <td style="font-weight: bold; border: 1.5px solid black; background-color: #f2f2f2; font-family: 'Times New Roman'; padding: 6px;">Môn</td>
      <td style="font-weight: bold; border: 1.5px solid black; background-color: #f2f2f2; text-align: center; font-family: 'Times New Roman'; padding: 6px;">Lớp</td>
      <td style="font-weight: bold; border: 1.5px solid black; background-color: #f2f2f2; text-align: center; font-family: 'Times New Roman'; padding: 6px;">Tiết PPCT</td>
      <td style="font-weight: bold; border: 1.5px solid black; background-color: #f2f2f2; font-family: 'Times New Roman'; padding: 6px;">Tên bài dạy</td>
      <td style="font-weight: bold; border: 1.5px solid black; background-color: #f2f2f2; font-family: 'Times New Roman'; padding: 6px;">Ghi chú</td>
    </tr>`;
  };

  const buildExcelRows = (dataset: DayBlock[]) => {
    let rowsHtml = '';
    dataset.forEach(block => {
      block.rows.forEach((row, rIdx) => {
        let borderBottom = (rIdx === 4) ? "1.5px solid black" : "1px dashed black";
        let dayCell = rIdx === 0 ? `<td style="border-left: 1.5px solid black; border-right: 1.5px solid black; border-bottom: 1.5px solid black; vertical-align: middle; text-align: center; font-weight: bold; font-family: 'Times New Roman'; padding: 5px;" rowspan="5">${block.dayName}<br>${block.dateStr}</td>` : '';
        
        rowsHtml += `<tr>
          ${dayCell}
          <td style="border-right: 1.1px solid black; border-bottom: ${borderBottom}; text-align: center; font-weight: bold; font-family: 'Times New Roman'; padding: 5px;">${row.period}</td>
          <td style="border-right: 1.1px solid black; border-bottom: ${borderBottom}; font-family: 'Times New Roman'; padding: 5px;">${row.subject}</td>
          <td style="border-right: 1.1px solid black; border-bottom: ${borderBottom}; text-align: center; font-family: 'Times New Roman'; padding: 5px;">${row.class}</td>
          <td style="border-right: 1.1px solid black; border-bottom: ${borderBottom}; text-align: center; font-family: 'Times New Roman'; padding: 5px;">${row.ppctNum || ''}</td>
          <td style="border-right: 1.1px solid black; border-bottom: ${borderBottom}; font-family: 'Times New Roman'; padding: 5px;">${row.title}</td>
          <td style="border-right: 1.5px solid black; border-bottom: ${borderBottom}; font-family: 'Times New Roman'; padding: 5px;">${row.note || ''}</td>
        </tr>`;
      });
    });
    return rowsHtml;
  };

  const renderTableRows = (dataset: DayBlock[]) => {
    if (dataset.length === 0) {
      return (
        <tr>
          <td colSpan={7} style={{ border: '1.5px solid black', padding: '12px', textAlign: 'center' }}>
            Chưa có dữ liệu thời khóa biểu cho bảng biểu này.
          </td>
        </tr>
      );
    }

    return dataset.map((block) => (
      block.rows.map((row, rIdx) => {
        const isLastRowOfBlock = rIdx === 4;
        const bottomBorderStyle = isLastRowOfBlock 
          ? "border-bottom: 1.5px solid black;" 
          : "border-bottom: 1px dashed black;";

        return (
          <tr key={`${block.dayNum}-${row.period}`} className="text-black">
            {rIdx === 0 && (
              <td 
                style={{ 
                  border: '1.5px solid black', 
                  fontWeight: 'bold', 
                  textAlign: 'center', 
                  verticalAlign: 'middle', 
                  padding: '5px' 
                }} 
                rowSpan={5}
              >
                <div style={{ fontFamily: 'Times New Roman' }}>
                  <span>Thứ {block.dayName}</span>
                  <br />
                  <span className="text-[10px] text-slate-800">{block.dateStr}</span>
                  {block.sessionTag && (
                    <div style={{ fontSize: '9px', fontWeight: 'normal', color: '#555', marginTop: '2px' }}>
                      {block.sessionTag}
                    </div>
                  )}
                </div>
              </td>
            )}
            
            <td 
              style={{ 
                borderRight: '1.5px solid black', 
                borderLeft: '1.5px solid black', 
                borderBottom: isLastRowOfBlock ? '1.5px solid black' : '1px dashed black',
                padding: '4.5px', 
                textAlign: 'center', 
                fontWeight: 'bold' 
              }}
            >
              {row.period}
            </td>
            
            <td style={{ borderRight: '1.5px solid black', borderBottom: isLastRowOfBlock ? '1.5px solid black' : '1px dashed black', padding: '4.5px', textAlign: 'left' }}>
              {row.subject}
            </td>
            
            <td style={{ borderRight: '1.5px solid black', borderBottom: isLastRowOfBlock ? '1.5px solid black' : '1px dashed black', padding: '4.5px', textAlign: 'center', fontWeight: 'bold' }}>
              {row.class}
            </td>
            
            <td style={{ borderRight: '1.5px solid black', borderBottom: isLastRowOfBlock ? '1.5px solid black' : '1px dashed black', padding: '4.5px', textAlign: 'center', fontWeight: 'bold' }}>
              {row.ppctNum || ''}
            </td>
            
            <td style={{ borderRight: '1.5px solid black', borderBottom: isLastRowOfBlock ? '1.5px solid black' : '1px dashed black', padding: '4.5px', textAlign: 'left', fontFamily: 'Times New Roman' }}>
              {row.title}
            </td>
            
            <td style={{ borderRight: '1.5px solid black', borderBottom: isLastRowOfBlock ? '1.5px solid black' : '1px dashed black', padding: '4.5px', textAlign: 'left', fontSize: '10px' }}>
              {row.note}
            </td>
          </tr>
        );
      })
    ));
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <CheckSquare className="text-sky-600 shrink-0" size={17} />
            <span>Bước 5: Xem trước mẫu bản in & Tải file Word/Excel</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">Bản in ngắt trang vật lý chuẩn hành chính quốc gia, sẵn sàng nộp ký.</p>
        </div>
        
        <div className="flex flex-wrap gap-2 shrink-0">
          <button 
            onClick={exportToWord}
            className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm transition flex items-center gap-1.5"
          >
            <FileText size={14} />
            <span>Tải File Word (.doc)</span>
          </button>
          <button 
            onClick={exportToExcel}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm transition flex items-center gap-1.5"
          >
            <FileSpreadsheet size={14} />
            <span>Tải File Excel (.xls)</span>
          </button>
          <button 
            onClick={() => window.print()}
            className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm transition flex items-center gap-1.5"
          >
            <Printer size={14} />
            <span>In 2 trang lịch</span>
          </button>
        </div>
      </div>

      {/* Simulated Stacked Sheets */}
      <div className="bg-slate-100 p-4 md:p-8 rounded-xl border border-slate-200 flex flex-col items-center gap-8 overflow-x-auto">
        <div id="print-area" className="w-full max-w-[780px] flex flex-col gap-6">
          
          {/* ================= PAGE 1 ================= */}
          <div 
            id="print-page-1"
            className="bg-white p-6 md:p-10 shadow-lg border border-slate-300 text-black min-h-[1020px] text-xs flex flex-col justify-between"
            style={{ fontFamily: "Times New Roman" }}
          >
            <div>
              {/* Header */}
              <div className="w-full flex justify-between items-start mb-2">
                <div className="text-left max-w-[60%]">
                  <span className="font-extrabold uppercase text-[10px] inline-block tracking-tight underline">
                    {profile.school || 'Trường TH, THCS&THPT THSP Đại học Vinh'}
                  </span>
                </div>
              </div>

              {/* Title group */}
              <div className="text-center my-4 space-y-1">
                <h2 className="text-sm font-bold uppercase tracking-wide" style={{ fontSize: '13px', letterSpacing: '0.5px' }}>
                  LỊCH BÁO GIẢNG - CHÍNH KHÓA
                </h2>
                <p className="text-[10px] font-semibold">
                  GV: <span className="uppercase font-bold">{profile.name || 'Trần Thị Hồng Minh'}</span> &nbsp;-&nbsp; TUẦN {getWeekStr()} &nbsp;&nbsp;&nbsp;&nbsp; (Từ ngày {formattedDates.start} đến ngày {formattedDates.end})
                </p>
              </div>

              {/* Lề table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1.5px solid black', color: 'black', fontSize: '11px', lineHeight: '1.25' }}>
                <thead>
                  <tr className="bg-slate-50 font-bold text-center">
                    <th style={{ border: '1.5px solid black', padding: '4px', width: '14%', fontSize: '10px' }}>Thứ, Ngày</th>
                    <th style={{ border: '1.5px solid black', padding: '4px', width: '7%', fontSize: '10px' }}>Tiết</th>
                    <th style={{ border: '1.5px solid black', padding: '4px', width: '14%', fontSize: '10px' }}>Môn</th>
                    <th style={{ border: '1.5px solid black', padding: '4px', width: '10%', fontSize: '10px' }}>Lớp</th>
                    <th style={{ border: '1.5px solid black', padding: '4px', width: '8%', fontSize: '10px' }}>Tiết PPCT</th>
                    <th style={{ border: '1.5px solid black', padding: '4px', fontSize: '10px' }}>Tên bài dạy</th>
                    <th style={{ border: '1.5px solid black', padding: '4px', width: '13%', fontSize: '10px' }}>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {renderTableRows(chinhKhoaData)}
                </tbody>
              </table>
            </div>

            {/* Bottom block signatures */}
            <div className="pt-6">
              <table className="w-full border-0" style={{ border: 'none', fontSize: '11px', lineHeight: '1.3' }}>
                <tbody>
                  <tr style={{ border: 'none' }}>
                    <td style={{ width: '50%', verticalAlign: 'top', border: 'none', padding: '0' }}>
                      <p className="font-extrabold uppercase text-[10px] my-0 mb-1">Kiểm tra, nhận xét:</p>
                      <div className="border-b border-dashed border-black h-4 w-[90%]"></div>
                      <div className="border-b border-dashed border-black h-4 w-[90%] mt-1"></div>
                    </td>
                    <td style={{ width: '50%', textAlign: 'center', verticalAlign: 'top', border: 'none', padding: '0', paddingLeft: '15px' }}>
                      <p className="italic text-[10px] text-slate-700 my-0 mb-1">{getSignatureDateText()}</p>
                      <p className="font-extrabold uppercase text-[10px] my-0 mb-10">Hiệu trưởng</p>
                      <p className="font-extrabold uppercase text-[10px] my-0">{profile.principal}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* PAGE BREAK (Physical page separator) */}
          <div className="page-break my-4 border-t-2 border-dashed border-slate-300 opacity-80 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-100 px-3 py-0.5 rounded text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
              <Sparkles size={10} /> Trang tiếp theo (Vật lý)
            </span>
          </div>

          {/* ================= PAGE 2 ================= */}
          <div 
            id="print-page-2"
            className="bg-white p-6 md:p-10 shadow-lg border border-slate-300 text-black min-h-[1020px] text-xs flex flex-col justify-between"
            style={{ fontFamily: "Times New Roman" }}
          >
            <div>
              {/* Header */}
              <div className="w-full flex justify-between items-start mb-2">
                <div className="text-left max-w-[60%]">
                  <span className="font-extrabold uppercase text-[10px] inline-block tracking-tight underline">
                    {profile.school || 'Trường TH, THCS&THPT THSP Đại học Vinh'}
                  </span>
                </div>
              </div>

              {/* Title group */}
              <div className="text-center my-4 space-y-1">
                <h2 className="text-sm font-bold uppercase tracking-wide" style={{ fontSize: '13px', letterSpacing: '0.5px' }}>
                  LỊCH BÁO GIẢNG - CT TĂNG CƯỜNG, HỌC THÊM, HỌC BÙ
                </h2>
                <p className="text-[10px] font-semibold">
                  GV: <span className="uppercase font-bold">{profile.name || 'Trần Thị Hồng Minh'}</span> &nbsp;-&nbsp; TUẦN {getWeekStr()} &nbsp;&nbsp;&nbsp;&nbsp; (Từ ngày {formattedDates.start} đến ngày {formattedDates.end})
                </p>
              </div>

              {/* Lề table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1.5px solid black', color: 'black', fontSize: '11px', lineHeight: '1.25' }}>
                <thead>
                  <tr className="bg-slate-50 font-bold text-center">
                    <th style={{ border: '1.5px solid black', padding: '4px', width: '14%', fontSize: '10px' }}>Thứ, Ngày</th>
                    <th style={{ border: '1.5px solid black', padding: '4px', width: '7%', fontSize: '10px' }}>Tiết</th>
                    <th style={{ border: '1.5px solid black', padding: '4px', width: '14%', fontSize: '10px' }}>Môn</th>
                    <th style={{ border: '1.5px solid black', padding: '4px', width: '10%', fontSize: '10px' }}>Lớp</th>
                    <th style={{ border: '1.5px solid black', padding: '4px', width: '8%', fontSize: '10px' }}>Tiết PPCT</th>
                    <th style={{ border: '1.5px solid black', padding: '4px', fontSize: '10px' }}>Tên bài dạy</th>
                    <th style={{ border: '1.5px solid black', padding: '4px', width: '13%', fontSize: '10px' }}>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {renderTableRows(tangCuongData)}
                </tbody>
              </table>
            </div>

            {/* Bottom block signatures */}
            <div className="pt-6">
              <table className="w-full border-0" style={{ border: 'none', fontSize: '11px', lineHeight: '1.3' }}>
                <tbody>
                  <tr style={{ border: 'none' }}>
                    <td style={{ width: '50%', verticalAlign: 'top', border: 'none', padding: '0' }}>
                      <p className="font-extrabold uppercase text-[10px] my-0 mb-1">Kiểm tra, nhận xét:</p>
                      <div className="border-b border-dashed border-black h-4 w-[90%]"></div>
                      <div className="border-b border-dashed border-black h-4 w-[90%] mt-1"></div>
                    </td>
                    <td style={{ width: '50%', textAlign: 'center', verticalAlign: 'top', border: 'none', padding: '0', paddingLeft: '15px' }}>
                      <p className="italic text-[10px] text-slate-700 my-0 mb-1">{getSignatureDateText()}</p>
                      <p className="font-extrabold uppercase text-[10px] my-0 mb-10">Hiệu trưởng</p>
                      <p className="font-extrabold uppercase text-[10px] my-0">{profile.principal}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
