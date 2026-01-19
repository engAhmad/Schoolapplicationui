import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faEdit,
  faTrash,
  faEllipsisV,
  faFileExport,
  faFilter,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

interface Student {
  id: number;
  name: string;
  class: string;
  attendance: number;
  grade: string;
  status: "active" | "inactive";
}

const mockStudents: Student[] = [
  { id: 1, name: "أحمد محمد علي", class: "الصف الثالث أ", attendance: 96, grade: "A", status: "active" },
  { id: 2, name: "فاطمة حسن", class: "الصف الثالث أ", attendance: 94, grade: "A-", status: "active" },
  { id: 3, name: "محمود خالد", class: "الصف الثالث ب", attendance: 88, grade: "B+", status: "active" },
  { id: 4, name: "نور الدين سامي", class: "الصف الثالث أ", attendance: 92, grade: "A", status: "active" },
  { id: 5, name: "سارة يوسف", class: "الصف الثالث ب", attendance: 98, grade: "A", status: "active" },
  { id: 6, name: "عمر إبراهيم", class: "الصف الثالث ج", attendance: 85, grade: "B", status: "active" },
  { id: 7, name: "ليلى عبدالله", class: "الصف الثالث أ", attendance: 91, grade: "A-", status: "active" },
  { id: 8, name: "خالد أحمد", class: "الصف الثالث ب", attendance: 87, grade: "B+", status: "active" },
];

export function StudentManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [students] = useState<Student[]>(mockStudents);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6" style={{ fontFamily: "Cairo, sans-serif" }}>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">إدارة الطلاب</h1>
          <p className="text-gray-600">عرض وإدارة بيانات الطلاب</p>
        </div>
        <Button
          className="bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-xl px-6 h-11 gap-2"
          style={{ fontFamily: "Cairo, sans-serif" }}
        >
          <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
          إضافة طالب جديد
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
        />
        <Input
          type="text"
          placeholder="البحث عن طالب..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pr-12 h-12 rounded-xl border-gray-300 focus:border-[#3498DB] focus:ring-[#3498DB]"
          style={{ fontFamily: "Cairo, sans-serif", textAlign: "right" }}
        />
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" dir="rtl">
            <thead className="bg-[#2C3E50] text-white">
              <tr>
                <th className="py-4 px-6 text-right font-semibold">الرقم</th>
                <th className="py-4 px-6 text-right font-semibold">اسم الطالب</th>
                <th className="py-4 px-6 text-right font-semibold">الصف</th>
                <th className="py-4 px-6 text-center font-semibold">نسبة الحضور</th>
                <th className="py-4 px-6 text-center font-semibold">التقدير</th>
                <th className="py-4 px-6 text-center font-semibold">الحالة</th>
                <th className="py-4 px-6 text-center font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr
                  key={student.id}
                  className={`border-b border-gray-100 hover:bg-[#E8EAED] transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-4 px-6 text-gray-600">{student.id}</td>
                  <td className="py-4 px-6 text-[#2C3E50] font-semibold">{student.name}</td>
                  <td className="py-4 px-6 text-gray-600">{student.class}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#2ECC71] rounded-full"
                          style={{ width: `${student.attendance}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${
                        student.grade.startsWith("A")
                          ? "bg-[#2ECC71] text-white"
                          : student.grade.startsWith("B")
                          ? "bg-[#3498DB] text-white"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      {student.grade}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${
                        student.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.status === "active" ? "نشط" : "غير نشط"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 hover:bg-[#3498DB] hover:text-white rounded-lg transition-colors text-gray-600">
                        <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-500 hover:text-white rounded-lg transition-colors text-gray-600">
                        <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600">
                        <FontAwesomeIcon icon={faEllipsisV} className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">عرض 1-8 من 89 طالب</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="rounded-lg"
              style={{ fontFamily: "Cairo, sans-serif" }}
            >
              السابق
            </Button>
            <Button
              className="bg-[#3498DB] hover:bg-[#2980B9] text-white rounded-lg"
              style={{ fontFamily: "Cairo, sans-serif" }}
            >
              التالي
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}