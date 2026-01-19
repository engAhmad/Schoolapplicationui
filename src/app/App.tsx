import { useState } from "react";
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
import { ThemeToggle } from "@/app/components/ui/theme-toggle";
import { CommandPalette } from "@/app/components/ui/command-palette";

type Screen = "dashboard" | "students" | "attendance" | "schedule" | "settings";

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

  const menuItems = [
    { id: "dashboard" as Screen, label: "لوحة التحكم", icon: faHouse },
    { id: "students" as Screen, label: "الطلاب", icon: faUserGraduate },
    { id: "attendance" as Screen, label: "الحضور", icon: faClipboardUser },
    { id: "schedule" as Screen, label: "الجدول", icon: faCalendarDays },
    { id: "settings" as Screen, label: "الإعدادات", icon: faGear },
  ];

  return (
    <Sidebar collapsible="icon" side="right" variant="sidebar" className="glass-panel border-l-0 ml-4 my-4 rounded-xl">
      <SidebarHeader className="h-16 border-b border-sidebar-border/50 flex items-center justify-center pt-4 pb-2">
        <div className="flex items-center gap-2 overflow-hidden w-full px-2">
          <div className={`flex items-center justify-center w-full transition-all duration-300 ${state === 'collapsed' ? 'scale-75' : ''}`}>
            <img
              src={logoImage}
              alt="Logo"
              className={`object-contain transition-all duration-300 ${state === 'collapsed' ? 'w-10 h-10' : 'w-32 h-auto'}`}
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu className="gap-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={currentScreen === item.id}
                onClick={() => setCurrentScreen(item.id)}
                tooltip={item.label}
                size="lg"
                className="font-medium"
              >
                <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t border-sidebar-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSync}
              size="lg"
              className="text-[#2ECC71] hover:text-[#27AE60] hover:bg-[#2ECC71]/10"
              tooltip="مزامنة البيانات"
            >
              <FontAwesomeIcon icon={faSync} className="w-5 h-5" />
              <span>مزامنة البيانات</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              size="lg"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              tooltip="تسجيل الخروج"
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="w-5 h-5" />
              <span>تسجيل الخروج</span>
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
          "--sidebar-width": "16rem",
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
                    أجيال برو
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{getPageTitle()}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mr-auto flex items-center gap-4">
              <CommandPalette />
              <ThemeToggle />

              <button className="p-2 hover:bg-muted rounded-lg transition-colors relative">
                <FontAwesomeIcon icon={faBell} className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="text-right hidden md:block">
                <p className="text-xs text-muted-foreground">مرحباً،</p>
                <p className="text-sm font-bold text-foreground">أستاذ محمد أحمد</p>
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
    </SidebarProvider>
  );
}