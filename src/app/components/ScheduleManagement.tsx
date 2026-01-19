import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faChalkboardTeacher,
  faBook,
  faUsers,
  faLocationDot,
  faCalendarWeek,
} from "@fortawesome/free-solid-svg-icons";

interface ClassSchedule {
  id: number;
  day: string;
  time: string;
  subject: string;
  teacher: string;
  class: string;
  room: string;
  color: string;
}

const scheduleData: ClassSchedule[] = [
  { id: 1, day: "الأحد", time: "08:00 - 08:50", subject: "الرياضيات", teacher: "أ. محمد أحمد", class: "الصف الثالث أ", room: "غرفة 201", color: "#3498DB" },
  { id: 2, day: "الأحد", time: "09:00 - 09:50", subject: "اللغة العربية", teacher: "أ. فاطمة حسن", class: "الصف الثالث أ", room: "غرفة 105", color: "#2ECC71" },
  { id: 3, day: "الأحد", time: "10:00 - 10:50", subject: "العلوم", teacher: "د. خالد محمود", class: "الصف الثالث أ", room: "مختبر 3", color: "#F9AB00" },
  { id: 4, day: "الأحد", time: "11:00 - 11:50", subject: "التاريخ", teacher: "أ. سارة يوسف", class: "الصف الثالث أ", room: "غرفة 302", color: "#9B59B6" },
  { id: 5, day: "الأحد", time: "12:00 - 12:50", subject: "استراحة", teacher: "-", class: "الكافتيريا", room: "-", color: "#95A5A6" },
  { id: 6, day: "الأحد", time: "13:00 - 13:50", subject: "التربية البدنية", teacher: "كابتن عمر", class: "الصف الثالث أ", room: "الصالة الرياضية", color: "#E74C3C" },
  
  { id: 7, day: "الاثنين", time: "08:00 - 08:50", subject: "اللغة الإنجليزية", teacher: "أ. ليلى عبدالله", class: "الصف الثالث أ", room: "غرفة 201", color: "#3498DB" },
  { id: 8, day: "الاثنين", time: "09:00 - 09:50", subject: "الرياضيات", teacher: "أ. محمد أحمد", class: "الصف الثالث أ", room: "غرفة 105", color: "#2ECC71" },
  { id: 9, day: "الاثنين", time: "10:00 - 10:50", subject: "الفيزياء", teacher: "د. أحمد سعيد", class: "الصف الثالث أ", room: "مختبر 1", color: "#F9AB00" },
  { id: 10, day: "الاثنين", time: "11:00 - 11:50", subject: "الكيمياء", teacher: "د. نور الدين", class: "الصف الثالث أ", room: "مختبر 2", color: "#9B59B6" },
  
  { id: 11, day: "الثلاثاء", time: "08:00 - 08:50", subject: "الأحياء", teacher: "د. مريم علي", class: "الصف الثالث أ", room: "مختبر 3", color: "#2ECC71" },
  { id: 12, day: "الثلاثاء", time: "09:00 - 09:50", subject: "الرياضيات", teacher: "أ. محمد أحمد", class: "الصف الثالث أ", room: "غرفة 201", color: "#3498DB" },
  { id: 13, day: "الثلاثاء", time: "10:00 - 10:50", subject: "الجغرافيا", teacher: "أ. يوسف خالد", class: "الصف الثالث أ", room: "غرفة 205", color: "#F9AB00" },
  
  { id: 14, day: "الأربعاء", time: "08:00 - 08:50", subject: "الرياضيات", teacher: "أ. محمد أحمد", class: "الصف الثالث أ", room: "غرفة 201", color: "#3498DB" },
  { id: 15, day: "الأربعاء", time: "09:00 - 09:50", subject: "اللغة العربية", teacher: "أ. فاطمة حسن", class: "الصف الثالث أ", room: "غرفة 105", color: "#2ECC71" },
  { id: 16, day: "الأربعاء", time: "10:00 - 10:50", subject: "التربية الإسلامية", teacher: "أ. عبدالله محمد", class: "الصف الثالث أ", room: "غرفة 110", color: "#27AE60" },
  
  { id: 17, day: "الخميس", time: "08:00 - 08:50", subject: "اللغة الإنجليزية", teacher: "أ. ليلى عبدالله", class: "الصف الثالث أ", room: "غرفة 201", color: "#3498DB" },
  { id: 18, day: "الخميس", time: "09:00 - 09:50", subject: "الفنون", teacher: "أ. سامي حسن", class: "الصف الثالث أ", room: "مرسم الفنون", color: "#E67E22" },
  { id: 19, day: "الخميس", time: "10:00 - 10:50", subject: "الحاسوب", teacher: "م. أحمد علي", class: "الصف الثالث أ", room: "مختبر الحاسوب", color: "#16A085" },
];

const days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس"];

export function ScheduleManagement() {
  const [selectedDay, setSelectedDay] = useState("الأحد");

  const daySchedule = scheduleData.filter(item => item.day === selectedDay);

  return (
    <div className="p-6" style={{ fontFamily: "Cairo, sans-serif" }}>
      {/* Header */}
      <div className="mb-6">
        <h1 style={{ fontSize: "24pt", fontWeight: 700 }} className="text-[#2C3E50] mb-2">
          الجدول الدراسي
        </h1>
        <p style={{ fontSize: "11pt" }} className="text-gray-600">
          جدول الحصص الأسبوعي للصف الثالث أ
        </p>
      </div>

      {/* Weekly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        {days.map((day) => {
          const dayClasses = scheduleData.filter(item => item.day === day).length;
          const isSelected = day === selectedDay;
          
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`rounded-[12px] p-4 border-2 transition-all ${
                isSelected
                  ? "bg-[#3498DB] border-[#3498DB] text-white"
                  : "bg-white border-gray-200 text-[#2D3748] hover:border-[#3498DB]"
              }`}
              style={{ boxShadow: isSelected ? "0 4px 8px rgba(52, 152, 219, 0.2)" : "0 2px 4px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="text-center">
                <FontAwesomeIcon icon={faCalendarWeek} className="text-2xl mb-2" />
                <p style={{ fontSize: "14pt", fontWeight: 700 }} className="mb-1">{day}</p>
                <p style={{ fontSize: "10pt" }} className={isSelected ? "text-white/80" : "text-gray-600"}>
                  {dayClasses} حصة
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Daily Schedule */}
      <div className="bg-white rounded-[12px] border border-gray-200 p-6 mb-6" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <div className="w-12 h-12 bg-[#3498DB] rounded-[8px] flex items-center justify-center">
            <FontAwesomeIcon icon={faCalendarWeek} className="text-white text-xl" />
          </div>
          <div>
            <h2 style={{ fontSize: "16pt", fontWeight: 700 }} className="text-[#2C3E50]">
              جدول يوم {selectedDay}
            </h2>
            <p style={{ fontSize: "11pt" }} className="text-gray-600">
              {daySchedule.length} حصة دراسية
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {daySchedule.map((classItem, index) => (
            <div
              key={classItem.id}
              className="relative rounded-[12px] p-4 border-2 hover:shadow-md transition-all"
              style={{
                borderColor: classItem.color,
                backgroundColor: `${classItem.color}08`,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {/* Time */}
                  <div className="flex items-center gap-2 min-w-[140px]">
                    <div
                      className="w-10 h-10 rounded-[8px] flex items-center justify-center"
                      style={{ backgroundColor: classItem.color }}
                    >
                      <FontAwesomeIcon icon={faClock} className="text-white" />
                    </div>
                    <div>
                      <p style={{ fontSize: "10pt", fontWeight: 700 }} className="text-[#2D3748]">
                        {classItem.time}
                      </p>
                      <p style={{ fontSize: "9pt" }} className="text-gray-600">الحصة {index + 1}</p>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex items-center gap-2 flex-1">
                    <FontAwesomeIcon icon={faBook} className="text-[#2C3E50]" />
                    <div>
                      <p style={{ fontSize: "11pt", fontWeight: 700 }} className="text-[#2C3E50]">
                        {classItem.subject}
                      </p>
                      <p style={{ fontSize: "10pt" }} className="text-gray-600">{classItem.class}</p>
                    </div>
                  </div>

                  {/* Teacher */}
                  <div className="flex items-center gap-2 flex-1">
                    <FontAwesomeIcon icon={faChalkboardTeacher} className="text-[#3498DB]" />
                    <div>
                      <p style={{ fontSize: "11pt", fontWeight: 700 }} className="text-[#2D3748]">
                        {classItem.teacher}
                      </p>
                      <p style={{ fontSize: "10pt" }} className="text-gray-600">المعلم</p>
                    </div>
                  </div>

                  {/* Room */}
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faLocationDot} className="text-[#2ECC71]" />
                    <div>
                      <p style={{ fontSize: "11pt", fontWeight: 700 }} className="text-[#2D3748]">
                        {classItem.room}
                      </p>
                      <p style={{ fontSize: "10pt" }} className="text-gray-600">المكان</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress indicator for current class */}
              {index === 1 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontSize: "10pt", fontWeight: 700 }} className="text-[#3498DB]">
                      الحصة الجارية
                    </span>
                    <span style={{ fontSize: "10pt", fontWeight: 700 }} className="text-[#3498DB]">
                      35 دقيقة متبقية
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: classItem.color,
                        width: "65%",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white rounded-[12px] p-6 border border-gray-200" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: "14pt", fontWeight: 700 }} className="text-[#2C3E50]">
              إجمالي الحصص الأسبوعية
            </h3>
            <FontAwesomeIcon icon={faBook} className="text-[#3498DB] text-2xl" />
          </div>
          <p style={{ fontSize: "28pt", fontWeight: 700 }} className="text-[#2D3748] mb-2">
            {scheduleData.length}
          </p>
          <p style={{ fontSize: "11pt" }} className="text-gray-600">حصة دراسية</p>
        </div>

        <div className="bg-white rounded-[12px] p-6 border border-gray-200" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: "14pt", fontWeight: 700 }} className="text-[#2C3E50]">
              عدد المعلمين
            </h3>
            <FontAwesomeIcon icon={faUsers} className="text-[#2ECC71] text-2xl" />
          </div>
          <p style={{ fontSize: "28pt", fontWeight: 700 }} className="text-[#2D3748] mb-2">
            12
          </p>
          <p style={{ fontSize: "11pt" }} className="text-gray-600">معلم ومعلمة</p>
        </div>

        <div className="bg-white rounded-[12px] p-6 border border-gray-200" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: "14pt", fontWeight: 700 }} className="text-[#2C3E50]">
              ساعات التدريس
            </h3>
            <FontAwesomeIcon icon={faClock} className="text-[#F9AB00] text-2xl" />
          </div>
          <p style={{ fontSize: "28pt", fontWeight: 700 }} className="text-[#2D3748] mb-2">
            {scheduleData.length * 0.83}
          </p>
          <p style={{ fontSize: "11pt" }} className="text-gray-600">ساعة أسبوعياً</p>
        </div>
      </div>
    </div>
  );
}
