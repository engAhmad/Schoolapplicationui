import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faClipboardUser,
  faCalendarDays,
  faChartLine,
  faBook,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { StatTile } from "@/app/components/StatTile";

export function Dashboard() {
  return (
    <div className="p-6" style={{ fontFamily: "Cairo, sans-serif" }}>
      <div className="mb-6">
        <h1 style={{ fontSize: "24pt", fontWeight: 700 }} className="text-[#2C3E50] mb-2">لوحة التحكم</h1>
        <p style={{ fontSize: "11pt" }} className="text-gray-600">مرحباً بك في نظام أجيال برو لإدارة المدارس</p>
      </div>

      {/* Stats Grid - 12px gutter */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        <StatTile
          title="إجمالي الطلاب"
          value="89"
          subtitle="طالب مسجل"
          icon={faUserGraduate}
          color="blue"
        />
        <StatTile
          title="نسبة الحضور"
          value="94%"
          subtitle="اليوم: الأحد، 18 يناير"
          icon={faClipboardUser}
          color="green"
        />
        <StatTile
          title="الدروس اليوم"
          value="6"
          subtitle="3 دروس متبقية"
          icon={faCalendarDays}
          color="navy"
        />
        <StatTile
          title="معدل الأداء"
          value="87%"
          subtitle="تحسن بنسبة 5%"
          icon={faChartLine}
          color="blue"
        />
        <StatTile
          title="الواجبات المعلقة"
          value="12"
          subtitle="بحاجة للمراجعة"
          icon={faBook}
          color="green"
        />
        <StatTile
          title="الطلاب المتفوقون"
          value="23"
          subtitle="معدل A أو أعلى"
          icon={faTrophy}
          color="navy"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-[#2C3E50] mb-4">النشاطات الأخيرة</h2>
        <div className="space-y-4">
          {[
            { text: "تم تسجيل حضور الصف الثالث أ", time: "منذ 5 دقائق", color: "green" },
            { text: "تم إضافة واجب جديد لمادة الرياضيات", time: "منذ 15 دقيقة", color: "blue" },
            { text: "تم تحديث درجات امتحان العلوم", time: "منذ ساعة", color: "navy" },
            { text: "تم مزامنة البيانات مع بوابة أجيال", time: "منذ ساعتين", color: "green" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
              <div
                className={`w-2 h-2 rounded-full ${
                  activity.color === "green"
                    ? "bg-[#2ECC71]"
                    : activity.color === "blue"
                    ? "bg-[#3498DB]"
                    : "bg-[#2C3E50]"
                }`}
              />
              <div className="flex-1">
                <p className="text-[#2C3E50] text-sm">{activity.text}</p>
                <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}