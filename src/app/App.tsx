import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUserGraduate,
  faClipboardUser,
  faCalendarDays,
  faGear,
  faRightFromBracket,
  faSync,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Dashboard } from "@/app/components/Dashboard";
import { StudentManagement } from "@/app/components/StudentManagement";
import { AttendanceManagement } from "@/app/components/AttendanceManagement";
import { ScheduleManagement } from "@/app/components/ScheduleManagement";
import { SettingsManagement } from "@/app/components/SettingsManagement";
import { Login } from "@/app/components/Login";
import { SyncOverlay } from "@/app/components/SyncOverlay";

type Screen = "dashboard" | "students" | "attendance" | "schedule" | "settings";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncStatus, setSyncStatus] = useState("");
  const [isSyncComplete, setIsSyncComplete] = useState(false);

  const menuItems = [
    { id: "dashboard" as Screen, label: "لوحة التحكم", icon: faHouse },
    { id: "students" as Screen, label: "الطلاب", icon: faUserGraduate },
    { id: "attendance" as Screen, label: "الحضور", icon: faClipboardUser },
    { id: "schedule" as Screen, label: "الجدول", icon: faCalendarDays },
    { id: "settings" as Screen, label: "الإعدادات", icon: faGear },
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setSyncProgress(0);
    setIsSyncComplete(false);
    setSyncStatus("جاري الاتصال بخادم بوابة أجيال...");

    // Simulate sync progress
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setSyncStatus("تم تحديث البيانات بنجاح");
          setIsSyncComplete(true);
          setTimeout(() => {
            setIsSyncing(false);
          }, 2000);
          return 100;
        }
        
        // Update status based on progress
        if (prev < 30) {
          setSyncStatus("جاري تحميل بيانات الطلاب...");
        } else if (prev < 60) {
          setSyncStatus("جاري تحميل سجلات الحضور...");
        } else if (prev < 90) {
          setSyncStatus("جاري تحديث الدرجات والتقييمات...");
        }
        
        return prev + 10;
      });
    }, 500);
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div
      className="h-screen bg-[#E8EAED] flex"
      style={{ fontFamily: "Cairo, sans-serif" }}
      dir="rtl"
    >
      {/* Sidebar - Fixed on the RIGHT side */}
      <aside
        className={`bg-[#2C3E50] text-white transition-all duration-300 flex-shrink-0 ${
          isSidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo/Header */}
          <div className="p-6 border-b border-[#34495e]">
            <div className="flex items-center justify-between">
              {!isSidebarCollapsed && (
                <div>
                  <h2 className="text-xl font-bold">أجيال برو</h2>
                  <p className="text-xs text-gray-400 mt-1">إدارة المدارس</p>
                </div>
              )}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-2 hover:bg-[#34495e] rounded-lg transition-colors"
              >
                {isSidebarCollapsed ? <FontAwesomeIcon icon={faHouse} className="w-5 h-5" /> : <FontAwesomeIcon icon={faRightFromBracket} className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-[8px] transition-all ${
                    isActive
                      ? "bg-[#3498DB] text-white"
                      : "hover:bg-[#34495e] text-gray-300"
                  } ${isSidebarCollapsed ? "justify-center" : ""}`}
                  style={isActive ? { opacity: 1 } : {}}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = "rgba(52, 152, 219, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = "";
                  }}
                >
                  <FontAwesomeIcon icon={item.icon} style={{ fontSize: "11pt" }} className="flex-shrink-0" />
                  {!isSidebarCollapsed && <span style={{ fontSize: "11pt", fontWeight: 700 }}>{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-[#34495e] space-y-2">
            <button
              onClick={handleSync}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all bg-[#2ECC71] hover:bg-[#27AE60] text-white ${
                isSidebarCollapsed ? "justify-center" : ""
              }`}
            >
              <FontAwesomeIcon icon={faSync} className="w-5 h-5 flex-shrink-0" />
              {!isSidebarCollapsed && <span className="font-medium">مزامنة البيانات</span>}
            </button>
            <button
              onClick={() => setIsLoggedIn(false)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-red-600 text-gray-300 ${
                isSidebarCollapsed ? "justify-center" : ""
              }`}
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="w-5 h-5 flex-shrink-0" />
              {!isSidebarCollapsed && <span className="font-medium">تسجيل الخروج</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <FontAwesomeIcon icon={faBell} className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="text-right">
              <p style={{ fontSize: "11pt" }} className="text-gray-600">مرحباً،</p>
              <p style={{ fontSize: "14pt", fontWeight: 700 }} className="text-[#2C3E50]">أستاذ محمد أحمد</p>
            </div>
          </div>
          <div className="text-left">
            <p style={{ fontSize: "11pt" }} className="text-gray-600">الأحد، 18 يناير 2026</p>
            <p style={{ fontSize: "10pt" }} className="text-gray-500">الفصل الدراسي الثاني</p>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {currentScreen === "dashboard" && <Dashboard />}
          {currentScreen === "students" && <StudentManagement />}
          {currentScreen === "attendance" && <AttendanceManagement />}
          {currentScreen === "schedule" && <ScheduleManagement />}
          {currentScreen === "settings" && <SettingsManagement />}
        </main>
      </div>

      {/* Sync Overlay */}
      <SyncOverlay
        isVisible={isSyncing}
        status={syncStatus}
        progress={syncProgress}
        isComplete={isSyncComplete}
      />
    </div>
  );
}