import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faExclamationTriangle,
    faArrowDown,
    faUserInjured,
    faEnvelope,
    faBell
} from "@fortawesome/free-solid-svg-icons";

export function InsightsWidget() {
    const atRiskStudents = [
        { id: 1, name: "عمر خالد", grade: "الثاني الثانوي", issue: "غياب متكرر (5 أيام)", type: "attendance" },
        { id: 2, name: "يوسف أحمد", grade: "الأول الثانوي", issue: "انخفاض حاد في الرياضيات", type: "academic" },
        { id: 3, name: "سالم محمد", grade: "الثالث الثانوي", issue: "غياب متكرر (4 أيام)", type: "attendance" },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full font-['Cairo']">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 text-lg" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[#2C3E50]">تنبيهات هامة</h3>
                        <p className="text-xs text-gray-500 font-medium">طلاب يحتاجون للمتابعة الفورية</p>
                    </div>
                </div>
                <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full">3 تنبيهات</span>
            </div>

            <div className="space-y-4">
                {atRiskStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-red-100 hover:bg-red-50/30 transition-all group">
                        <div className="flex items-center gap-4">
                            <div className={`w-2 h-12 rounded-full ${student.type === 'attendance' ? 'bg-orange-400' : 'bg-red-500'}`} />
                            <div>
                                <h4 className="font-bold text-[#2C3E50] text-sm">{student.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-gray-500">{student.grade}</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                    <span className={`text-xs font-medium ${student.type === 'attendance' ? 'text-orange-600' : 'text-red-600'}`}>
                                        {student.issue}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                title="إرسال تنبيه لولي الأمر"
                                className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-200 transition-colors"
                            >
                                <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                            </button>
                            <button
                                title="إشعار للمرشد الطلابي"
                                className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-200 transition-colors"
                            >
                                <FontAwesomeIcon icon={faBell} className="text-xs" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-3 text-sm font-bold text-gray-500 hover:text-[#3498DB] hover:bg-blue-50 rounded-xl transition-all">
                عرض جميع التنبيهات
            </button>
        </div>
    );
}
