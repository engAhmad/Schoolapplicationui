import { useState } from "react";
import {
  faHome,
  faUserGraduate,
  faChalkboardTeacher,
  faUsers,
  faSitemap,
  faDatabase,
  faCog,
  faBars,
  faSignOutAlt,
  faBrain,
  faSync,
  faBell,
  faChevronRight,
  faChevronLeft,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dashboard } from "@/app/components/Dashboard";
import { StudentManagement } from "@/app/components/StudentManagement";
import { AttendanceManagement } from "@/app/components/AttendanceManagement";
import { ScheduleManagement } from "@/app/components/ScheduleManagement";
import { SettingsManagement } from "@/app/components/SettingsManagement";
import { Login } from "@/app/components/Login";
import { SyncOverlay } from "@/app/components/SyncOverlay";
import logoImage from "@/assets/sidebar-logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/app/components/ui/sidebar";
import { Separator } from "@/app/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";


type Screen = "dashboard" | "students" | "attendance" | "schedule" | "settings" | "teachers" | "staff" | "academicRelations" | "database" | "manualImport";

function AppSidebar({
  currentScreen,
  setCurrentScreen,
  handleSync,
  handleLogout,
}: {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  handleSync: () => void;
  handleLogout: () => void;
}) {
  const { state } = useSidebar();

  // Menu Items Definition
  const items = [
    { title: "لوحة التحكم", url: "#", icon: faHome, component: "dashboard" as Screen },
    { title: "سجلات المعلمين", url: "#", icon: faChalkboardTeacher, component: "teachers" as Screen },
    { title: "الطلاب", url: "#", icon: faUserGraduate, component: "students" as Screen },
    { title: "موظفو المدرسة", url: "#", icon: faUsers, component: "staff" as Screen },
    { title: "العلاقات التدريسية", url: "#", icon: faSitemap, component: "academicRelations" as Screen },
    { title: "قاعدة البيانات", url: "#", icon: faDatabase, component: "database" as Screen },
    { title: "الإعدادات", url: "#", icon: faCog, component: "settings" as Screen },
  ];

  return (
    <Sidebar collapsible="icon" side="right" variant="sidebar" className="border-l-0 border-t-0 border-r-0 bg-[#2C3E50] text-white overflow-hidden">
      <SidebarHeader className="h-32 flex flex-col items-center justify-center p-0 mb-4 border-b border-white/5 pt-6">
        <div className="flex flex-col items-center justify-center w-full h-full py-4 gap-3">
          <div className={`transition-all duration-300 ${state === 'collapsed' ? 'hidden' : 'flex flex-col items-center justify-center'}`}>
            <img
              src={logoImage}
              alt="Logo"
              className="w-[120px] object-contain mb-4"
            />
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group backdrop-blur-sm shadow-sm hover:shadow-md">
              <FontAwesomeIcon icon={faChevronRight} className="text-slate-400 text-[10px]" />
              <span className="text-sm font-bold text-slate-100 tracking-wide font-['Cairo']">مدرسة النموذجية الثانوية</span>
            </div>
          </div>
          {state === 'collapsed' && (
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3498DB] to-[#2980B9] flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-white/10">
              <span className="text-white text-2xl font-extrabold font-['Cairo'] select-none">م</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 pb-2 overflow-y-hidden flex flex-col items-center">
        {/* Navigation Group 1 */}
        <div className={`w-full transition-opacity duration-300 ${state === 'collapsed' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          <div className="mt-2 mb-2 px-4 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            الرئيسية
          </div>
        </div>
        <SidebarMenu className={`gap-1 mb-4 ${state === 'collapsed' ? 'w-full flex flex-col items-center' : ''}`}>
          {items.slice(0, 1).map((item) => {
            const isActive = currentScreen === item.component;

            return (
              <SidebarMenuItem key={item.title} className={state === 'collapsed' ? 'w-auto' : 'w-full'}>
                <SidebarMenuButton
                  isActive={isActive}
                  onClick={() => setCurrentScreen(item.component)}
                  tooltip={item.title}
                  size="lg"
                  className={`relative flex items-center ${state === 'collapsed' ? 'justify-center w-12 h-12' : 'justify-start h-10'} rounded-xl transition-all duration-300 ${isActive
                    ? state === 'collapsed'
                      ? "bg-gradient-to-br from-[#3498DB] to-[#2980B9] text-white shadow-lg shadow-[#3498DB]/30"
                      : "bg-[#3498DB]/10 text-[#3498DB] shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <div className={`flex items-center justify-center ${state === 'collapsed' ? '' : 'min-w-[40px] h-full'} ${isActive && !state ? 'text-[#3498DB]' : state === 'collapsed' && isActive ? 'text-white' : 'text-slate-400'}`}>
                    <FontAwesomeIcon icon={item.icon} className={state === 'collapsed' ? 'text-xl' : 'text-lg'} />
                  </div>
                  {state !== 'collapsed' && (
                    <>
                      <span className="font-bold text-sm transition-all duration-300 opacity-100">
                        {item.title}
                      </span>
                      {isActive && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#3498DB] rounded-l-full shadow-[0_0_15px_rgba(52,152,219,0.5)]" />
                      )}
                    </>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        {/* Navigation Group 2 */}
        <div className={`w-full transition-opacity duration-300 ${state === 'collapsed' ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          <div className="mt-2 mb-2 px-4 text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            إدارة المدرسة
          </div>
        </div>
        <SidebarMenu className={`gap-1 ${state === 'collapsed' ? 'w-full flex flex-col items-center' : ''}`}>
          {items.slice(1).map((item) => {
            const isActive = currentScreen === item.component;
            return (
              <SidebarMenuItem key={item.title} className={state === 'collapsed' ? 'w-auto' : 'w-full'}>
                <SidebarMenuButton
                  isActive={isActive}
                  onClick={() => setCurrentScreen(item.component)}
                  tooltip={item.title}
                  size="lg"
                  className={`relative flex items-center ${state === 'collapsed' ? 'justify-center w-12 h-12' : 'justify-start h-10'} rounded-xl transition-all duration-300 ${isActive
                    ? state === 'collapsed'
                      ? "bg-gradient-to-br from-[#3498DB] to-[#2980B9] text-white shadow-lg shadow-[#3498DB]/30"
                      : "bg-[#3498DB]/10 text-[#3498DB] shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <div className={`flex items-center justify-center ${state === 'collapsed' ? '' : 'min-w-[40px] h-full'} ${isActive && !state ? 'text-[#3498DB]' : state === 'collapsed' && isActive ? 'text-white' : 'text-slate-400'}`}>
                    <FontAwesomeIcon icon={item.icon} className={state === 'collapsed' ? 'text-xl' : 'text-lg'} />
                  </div>
                  {state !== 'collapsed' && (
                    <>
                      <span className="font-bold text-sm transition-all duration-300 opacity-100">
                        {item.title}
                      </span>
                      {isActive && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#3498DB] rounded-l-full shadow-[0_0_15px_rgba(52,152,219,0.5)]" />
                      )}
                    </>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2 bg-[#0f172a] border-t border-white/5">
        <SidebarMenu className={`gap-1 ${state === 'collapsed' ? 'flex flex-col items-center' : ''}`}>
          <SidebarMenuItem className={state === 'collapsed' ? 'w-auto' : 'w-full'}>
            <SidebarMenuButton
              onClick={handleSync}
              size="lg"
              className={`${state === 'collapsed' ? 'w-12 h-12 justify-center' : 'h-9'} rounded-xl text-[#2ECC71] hover:text-[#27AE60] hover:bg-[#2ECC71]/10 transition-all`}
              tooltip="مزامنة البيانات"
            >
              <div className={`flex items-center justify-center ${state === 'collapsed' ? '' : 'min-w-[40px]'}`}>
                <FontAwesomeIcon icon={faSync} className={state === 'collapsed' ? 'text-xl' : 'text-base'} />
              </div>
              {state !== 'collapsed' && (
                <span className="font-bold text-sm">مزامنة البيانات</span>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className={state === 'collapsed' ? 'w-auto' : 'w-full'}>
            <SidebarMenuButton
              onClick={handleLogout}
              size="lg"
              className={`${state === 'collapsed' ? 'w-12 h-12 justify-center' : 'h-9'} rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all`}
              tooltip="خروج من النظام"
            >
              <div className={`flex items-center justify-center ${state === 'collapsed' ? '' : 'min-w-[40px]'}`}>
                <FontAwesomeIcon icon={faSignOutAlt} className={state === 'collapsed' ? 'text-xl' : 'text-base'} />
              </div>
              {state !== 'collapsed' && (
                <span className="font-bold text-sm">تسجيل الخروج</span>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncStatus, setSyncStatus] = useState("");
  const [isSyncComplete, setIsSyncComplete] = useState(false);

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
    return (
      <Login
        onLogin={() => setIsLoggedIn(true)}
        onOffline={() => setIsLoggedIn(true)}
      />
    );
  }

  const getPageTitle = () => {
    switch (currentScreen) {
      case "dashboard": return "لوحة التحكم";
      case "students": return "الطلاب";
      case "attendance": return "الحضور";
      case "schedule": return "الجدول";
      case "settings": return "الإعدادات";
      default: return "";
    }
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "250px",
          "--sidebar-width-mobile": "18rem",
        } as React.CSSProperties
      }
      dir="rtl"
    >
      <AppSidebar
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        handleSync={handleSync}
        handleLogout={() => setIsLoggedIn(false)}
      />

      <SidebarInset className="overflow-hidden flex flex-col h-full">
        {/* Top Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 shadow-sm transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-mr-1 ml-2" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    مدرسة النموذجية الثانوية
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{getPageTitle()}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mr-auto flex items-center gap-6">
              <div className="text-left hidden lg:flex flex-col items-start border-l border-gray-200 pl-4">
                <p className="text-sm font-bold text-[#2C3E50]">الأثنين، 19 يناير 2026</p>
                <p className="text-xs text-muted-foreground font-semibold">الفصل الدراسي الثاني</p>
              </div>

              <button className="p-2 hover:bg-muted rounded-lg transition-colors relative">
                <FontAwesomeIcon icon={faBell} className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="text-right hidden md:block">
                <p className="text-xs text-muted-foreground font-semibold">مرحباً،</p>
                <p className="text-sm font-bold text-[#2C3E50]">أستاذ محمد أحمد</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl w-full">
            {currentScreen === "dashboard" && <Dashboard />}
            {currentScreen === "students" && <StudentManagement />}
            {currentScreen === "attendance" && <AttendanceManagement />}
            {currentScreen === "schedule" && <ScheduleManagement />}
            {currentScreen === "settings" && <SettingsManagement />}
          </div>
        </main>

        <SyncOverlay
          isVisible={isSyncing}
          status={syncStatus}
          progress={syncProgress}
          isComplete={isSyncComplete}
        />
      </SidebarInset>
    </SidebarProvider >
  );
}