import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/app/components/ui/button";
import { DataTable, Column } from "@/app/components/ui/data-table";

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
  { id: 9, name: "يوسف محمد", class: "الصف الثالث ج", attendance: 76, grade: "C+", status: "inactive" },
  { id: 10, name: "هدى سالم", class: "الصف الثالث أ", attendance: 99, grade: "A+", status: "active" },
  { id: 11, name: "زينب علي", class: "الصف الثالث ب", attendance: 82, grade: "B-", status: "active" },
  { id: 12, name: "كريم وايل", class: "الصف الثالث ج", attendance: 65, grade: "D", status: "active" },
];

export function StudentManagement() {
  const [students] = useState<Student[]>(mockStudents);

  const columns: Column<Student>[] = [
    { key: "id", title: "الرقم", sortable: true },
    { key: "name", title: "اسم الطالب", sortable: true, render: (s) => <span className="font-semibold text-[#2C3E50]">{s.name}</span> },
    { key: "class", title: "الصف", sortable: true },
    {
      key: "attendance",
      title: "نسبة الحضور",
      sortable: true,
      render: (s) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${s.attendance >= 90 ? "bg-[#2ECC71]" : s.attendance >= 75 ? "bg-[#F1C40F]" : "bg-[#E74C3C]"}`}
              style={{ width: `${s.attendance}%` }}
            />
          </div>
          <span className="text-sm font-semibold">{s.attendance}%</span>
        </div>
      ),
    },
    {
      key: "grade",
      title: "التقدير",
      sortable: true,
      render: (s) => (
        <span
          className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${s.grade.startsWith("A")
            ? "bg-[#2ECC71] text-white"
            : s.grade.startsWith("B")
              ? "bg-[#3498DB] text-white"
              : s.grade.startsWith("C")
                ? "bg-[#F1C40F] text-white"
                : s.grade.startsWith("D")
                  ? "bg-[#E67E22] text-white"
                  : "bg-[#E74C3C] text-white"
            }`}
        >
          {s.grade}
        </span>
      ),
    },
    {
      key: "status",
      title: "الحالة",
      sortable: true,
      render: (s) => (
        <span
          className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${s.status === "active"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
            }`}
        >
          {s.status === "active" ? "نشط" : "غير نشط"}
        </span>
      ),
    },
  ];

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

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-1">
        <DataTable
          data={students}
          columns={columns}
          searchKey="name"
          pageSize={8}
          enableSelection={true}
          onSelectionChange={(selected) => console.log('Selected:', selected)}
          className="p-4"
        />
      </div>
    </div>
  );
}