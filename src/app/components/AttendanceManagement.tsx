import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmarkCircle,
  faClockRotateLeft,
  faFilter,
  faDownload,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

interface AttendanceRecord {
  id: number;
  studentName: string;
  class: string;
  status: "present" | "absent" | "late" | "excused";
  time?: string;
  date: string;
}

const attendanceData: AttendanceRecord[] = [
  { id: 1, studentName: "أحمد محمد علي", class: "الصف الثالث أ", status: "present", time: "07:45", date: "2026-01-18" },
  { id: 2, studentName: "فاطمة حسن", class: "الصف الثالث أ", status: "present", time: "07:50", date: "2026-01-18" },
  { id: 3, studentName: "محمود خالد", class: "الصف الثالث ب", status: "late", time: "08:15", date: "2026-01-18" },
  { id: 4, studentName: "نور الدين سامي", class: "الصف الثالث أ", status: "present", time: "07:42", date: "2026-01-18" },
  { id: 5, studentName: "سارة يوسف", class: "الصف الثالث ب", status: "present", time: "07:48", date: "2026-01-18" },
  { id: 6, studentName: "عمر إبراهيم", class: "الصف الثالث ج", status: "absent", date: "2026-01-18" },
  { id: 7, studentName: "ليلى عبدالله", class: "الصف الثالث أ", status: "present", time: "07:55", date: "2026-01-18" },
  { id: 8, studentName: "خالد أحمد", class: "الصف الثالث ب", status: "excused", date: "2026-01-18" },
  { id: 9, studentName: "مريم سعيد", class: "الصف الثالث ج", status: "present", time: "07:52", date: "2026-01-18" },
  { id: 10, studentName: "يوسف علي", class: "الصف الثالث أ", status: "late", time: "08:20", date: "2026-01-18" },
];

export function AttendanceManagement() {
  const [selectedDate, setSelectedDate] = useState("2026-01-18");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredData = attendanceData.filter((record) => 
    filterStatus === "all" || record.status === filterStatus
  );

  const stats = {
    present: attendanceData.filter(r => r.status === "present").length,
    absent: attendanceData.filter(r => r.status === "absent").length,
    late: attendanceData.filter(r => r.status === "late").length,
    excused: attendanceData.filter(r => r.status === "excused").length,
    total: attendanceData.length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present": return "bg-[#2ECC71] text-white";
      case "absent": return "bg-red-500 text-white";
      case "late": return "bg-[#F9AB00] text-white";
      case "excused": return "bg-[#3498DB] text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "present": return "حاضر";
      case "absent": return "غائب";
      case "late": return "متأخر";
      case "excused": return "غياب بعذر";
      default: return status;
    }
  };

  return (
    <div className="p-6" style={{ fontFamily: "Cairo, sans-serif" }}>
      {/* Header */}
      <div className="mb-6">
        <h1 style={{ fontSize: "24pt", fontWeight: 700 }} className="text-[#2C3E50] mb-2">
          إدارة الحضور والغياب
        </h1>
        <p style={{ fontSize: "11pt" }} className="text-gray-600">
          تسجيل ومتابعة حضور الطلاب اليومي
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        <div className="bg-white rounded-[12px] p-4 border border-gray-200" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontSize: "10pt" }} className="text-gray-600 mb-1">إجمالي الطلاب</p>
              <p style={{ fontSize: "20pt", fontWeight: 700 }} className="text-[#2D3748]">{stats.total}</p>
            </div>
            <FontAwesomeIcon icon={faCalendarDays} className="text-[#2C3E50] text-2xl" />
          </div>
        </div>

        <div className="bg-[#2ECC71] rounded-[12px] p-4 text-white" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontSize: "10pt" }} className="mb-1">حاضر</p>
              <p style={{ fontSize: "20pt", fontWeight: 700 }}>{stats.present}</p>
            </div>
            <FontAwesomeIcon icon={faCheckCircle} className="text-2xl" />
          </div>
        </div>

        <div className="bg-red-500 rounded-[12px] p-4 text-white" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontSize: "10pt" }} className="mb-1">غائب</p>
              <p style={{ fontSize: "20pt", fontWeight: 700 }}>{stats.absent}</p>
            </div>
            <FontAwesomeIcon icon={faXmarkCircle} className="text-2xl" />
          </div>
        </div>

        <div className="bg-[#F9AB00] rounded-[12px] p-4 text-white" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontSize: "10pt" }} className="mb-1">متأخر</p>
              <p style={{ fontSize: "20pt", fontWeight: 700 }}>{stats.late}</p>
            </div>
            <FontAwesomeIcon icon={faClockRotateLeft} className="text-2xl" />
          </div>
        </div>

        <div className="bg-[#3498DB] rounded-[12px] p-4 text-white" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontSize: "10pt" }} className="mb-1">غياب بعذر</p>
              <p style={{ fontSize: "20pt", fontWeight: 700 }}>{stats.excused}</p>
            </div>
            <FontAwesomeIcon icon={faCheckCircle} className="text-2xl" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-[12px] p-4 mb-6 border border-gray-200" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faFilter} className="text-[#3498DB]" />
            <span style={{ fontSize: "11pt", fontWeight: 700 }} className="text-[#2D3748]">تصفية:</span>
          </div>
          
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-[8px] transition-all ${
              filterStatus === "all" ? "bg-[#3498DB] text-white" : "bg-gray-100 text-[#2D3748] hover:bg-gray-200"
            }`}
            style={{ fontSize: "11pt", fontWeight: 700 }}
          >
            الكل ({stats.total})
          </button>
          
          <button
            onClick={() => setFilterStatus("present")}
            className={`px-4 py-2 rounded-[8px] transition-all ${
              filterStatus === "present" ? "bg-[#2ECC71] text-white" : "bg-gray-100 text-[#2D3748] hover:bg-gray-200"
            }`}
            style={{ fontSize: "11pt", fontWeight: 700 }}
          >
            حاضر ({stats.present})
          </button>
          
          <button
            onClick={() => setFilterStatus("absent")}
            className={`px-4 py-2 rounded-[8px] transition-all ${
              filterStatus === "absent" ? "bg-red-500 text-white" : "bg-gray-100 text-[#2D3748] hover:bg-gray-200"
            }`}
            style={{ fontSize: "11pt", fontWeight: 700 }}
          >
            غائب ({stats.absent})
          </button>
          
          <button
            onClick={() => setFilterStatus("late")}
            className={`px-4 py-2 rounded-[8px] transition-all ${
              filterStatus === "late" ? "bg-[#F9AB00] text-white" : "bg-gray-100 text-[#2D3748] hover:bg-gray-200"
            }`}
            style={{ fontSize: "11pt", fontWeight: 700 }}
          >
            متأخر ({stats.late})
          </button>

          <div className="mr-auto">
            <button className="px-4 py-2 bg-[#3498DB] text-white rounded-[8px] hover:bg-[#2980B9] transition-all flex items-center gap-2"
              style={{ fontSize: "11pt", fontWeight: 700 }}
            >
              <FontAwesomeIcon icon={faDownload} />
              تصدير التقرير
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-[12px] border border-gray-200 overflow-hidden" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <div className="overflow-x-auto">
          <table className="w-full" dir="rtl">
            <thead className="bg-[#2C3E50] text-white">
              <tr>
                <th style={{ fontSize: "11pt", fontWeight: 700 }} className="py-3 px-6 text-right">الرقم</th>
                <th style={{ fontSize: "11pt", fontWeight: 700 }} className="py-3 px-6 text-right">اسم الطالب</th>
                <th style={{ fontSize: "11pt", fontWeight: 700 }} className="py-3 px-6 text-right">الصف</th>
                <th style={{ fontSize: "11pt", fontWeight: 700 }} className="py-3 px-6 text-center">التاريخ</th>
                <th style={{ fontSize: "11pt", fontWeight: 700 }} className="py-3 px-6 text-center">وقت الحضور</th>
                <th style={{ fontSize: "11pt", fontWeight: 700 }} className="py-3 px-6 text-center">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record, index) => (
                <tr
                  key={record.id}
                  className={`border-b border-gray-100 hover:bg-[#E8EAED] transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td style={{ fontSize: "10pt" }} className="py-3 px-6 text-[#2D3748]">{record.id}</td>
                  <td style={{ fontSize: "10pt", fontWeight: 700 }} className="py-3 px-6 text-[#2C3E50]">
                    {record.studentName}
                  </td>
                  <td style={{ fontSize: "10pt" }} className="py-3 px-6 text-gray-600">{record.class}</td>
                  <td style={{ fontSize: "10pt" }} className="py-3 px-6 text-center text-gray-600">
                    {new Date(record.date).toLocaleDateString("ar-SA")}
                  </td>
                  <td style={{ fontSize: "10pt" }} className="py-3 px-6 text-center text-gray-600">
                    {record.time || "-"}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-[8px] ${getStatusColor(record.status)}`}
                      style={{ fontSize: "10pt", fontWeight: 700 }}
                    >
                      {getStatusText(record.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Progress Bar */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: "11pt", fontWeight: 700 }} className="text-[#2D3748]">
              نسبة الحضور اليوم
            </span>
            <span style={{ fontSize: "11pt", fontWeight: 700 }} className="text-[#3498DB]">
              {Math.round((stats.present / stats.total) * 100)}%
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#3498DB] rounded-full transition-all duration-500"
              style={{ width: `${(stats.present / stats.total) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
