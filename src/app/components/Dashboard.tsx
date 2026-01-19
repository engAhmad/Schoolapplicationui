import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faChalkboardTeacher,
  faSchool,
  faBook,
  faCalendarAlt,
  faDatabase,
  faBrain,
  faChevronLeft,
  faChevronRight,
  faArrowUp,
  faArrowDown,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { InsightsWidget } from "./dashboard/InsightsWidget";
import { QuickActionsWidget } from "./dashboard/QuickActionsWidget";
import { AttendanceChart } from "./ui/attendance-chart";
import { GradeDistributionChart } from "./ui/grade-chart";

export function Dashboard() {
  const stats = [
    {
      title: "عدد المعلمين",
      value: "142",
      icon: faChalkboardTeacher,
      color: "border-r-[#2C3E50]",
      iconColor: "bg-[#2C3E50]",
      trend: "+2 (هذا الشهر)",
      trendColor: "text-green-600",
      trendIcon: faArrowUp
    },
    {
      title: "عدد الطلاب",
      value: "10,245",
      icon: faUserGraduate,
      color: "border-r-[#2ECC71]",
      iconColor: "bg-[#2ECC71]",
      trend: "+15 (تسجيل جديد)",
      trendColor: "text-green-600",
      trendIcon: faArrowUp
    },
    {
      title: "نسبة الحضور",
      value: "65%",
      icon: faBook,
      color: "border-r-[#3498DB]",
      iconColor: "bg-[#3498DB]",
      trend: "-3% (عن الأسبوع الماضي)",
      trendColor: "text-red-500",
      trendIcon: faArrowDown
    },
    {
      title: "اكتمال الرصد",
      value: "98%",
      icon: faSchool,
      color: "border-r-[#F9AB00]",
      iconColor: "bg-[#F9AB00]",
      trend: "ممتاز",
      trendColor: "text-green-600",
      trendIcon: faCheckCircle
    },
  ];

  const comingSoon = [
    { title: "الجدول المدرسي", subtitle: "إدارة جداول الحصص", icon: faCalendarAlt },
    { title: "بنك الأسئلة", subtitle: "أسئلة لجميع المواد", icon: faDatabase },
    { title: "AI خطط", subtitle: "حصص مكتبية تلقائية", icon: faBrain },
  ];

  return (
    <div className="p-4 md:p-6 bg-[#E8EAED] min-h-screen" style={{ fontFamily: "Cairo, sans-serif" }}>
      {/* Page Header */}
      <div className="mb-12 px-4 flex flex-col items-end">
        <div className="flex items-center gap-4 mb-2 bg-white/40 p-3 rounded-2xl backdrop-blur-md border border-white/20 shadow-sm">
          <FontAwesomeIcon icon={faChevronRight} className="text-gray-400 text-lg" />
          <h1 className="text-2xl font-extrabold text-[#2C3E50] tracking-tight font-['Cairo']">مدرسة النموذجية الثانوية</h1>
        </div>
        <p className="text-gray-500 font-medium px-2">نظرة عامة على البيانات المستوردة من EMIS</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-r-[6px] ${stat.color} flex items-center justify-between relative overflow-hidden group hover:shadow-lg transition-all duration-300`}
          >
            <div className="z-10 text-left">
              <h3 className="text-4xl font-extrabold text-[#2C3E50] mb-1 tabular-nums">{stat.value}</h3>
              <p className="text-gray-500 font-bold text-xs">{stat.title}</p>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${stat.iconColor.replace('text-', 'bg-')}`}>
              <FontAwesomeIcon
                icon={stat.icon}
                className={`text-xl text-white`}
              />
            </div>
            <div className="absolute bottom-4 left-6 flex items-center gap-1 text-xs font-bold">
              <FontAwesomeIcon icon={stat.trendIcon} className={stat.trendColor} />
              <span className={stat.trendColor}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Insights Widget & Quick Actions */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <InsightsWidget />
          <QuickActionsWidget />
        </div>

        {/* Placeholder for Charts (Taking 2/3 width) */}
        {/* Charts Area */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <AttendanceChart />
          <GradeDistributionChart />
        </div>
      </div>

      {/* Premium Coming Soon Section */}
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#2C3E50] border-r-4 border-[#9B59B6] pr-4">قريباً في النظام</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {comingSoon.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden flex items-center justify-between"
            >
              <div className="relative z-10 text-right">
                <h4 className="text-xl font-bold text-[#2C3E50] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500 mb-6 font-medium">{item.subtitle}</p>
                <span className="bg-[#9B59B6] text-white text-xs px-6 py-2 rounded-lg font-bold shadow-lg shadow-[#9B59B6]/30 inline-block transform group-hover:scale-105 transition-transform">
                  قريباً
                </span>
              </div>
              <div className="relative z-10 bg-gray-50 p-6 rounded-2xl group-hover:bg-[#9B59B6]/5 transition-colors duration-500">
                <FontAwesomeIcon
                  icon={item.icon}
                  className="text-3xl text-gray-300 group-hover:text-[#9B59B6] transition-all duration-500"
                />
              </div>
              {/* Decorative background circle */}
              <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-[#9B59B6]/5 rounded-full blur-3xl group-hover:bg-[#9B59B6]/10 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
