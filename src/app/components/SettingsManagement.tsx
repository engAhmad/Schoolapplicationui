import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBell,
  faShield,
  faPalette,
  faGlobe,
  faDatabase,
  faSave,
  faRotateRight,
  faDownload,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

export function SettingsManagement() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    weekly: true,
  });

  const tabs = [
    { id: "profile", label: "الملف الشخصي", icon: faUser },
    { id: "notifications", label: "الإشعارات", icon: faBell },
    { id: "security", label: "الأمان", icon: faShield },
    { id: "appearance", label: "المظهر", icon: faPalette },
    { id: "language", label: "اللغة", icon: faGlobe },
    { id: "data", label: "البيانات", icon: faDatabase },
  ];

  return (
    <div className="p-6" style={{ fontFamily: "Cairo, sans-serif" }}>
      {/* Header */}
      <div className="mb-6">
        <h1 style={{ fontSize: "24pt", fontWeight: 700 }} className="text-[#2C3E50] mb-2">
          الإعدادات
        </h1>
        <p style={{ fontSize: "11pt" }} className="text-gray-600">
          تخصيص وإدارة إعدادات النظام
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-[12px] border border-gray-200 overflow-hidden" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all border-r-4 ${
                  activeTab === tab.id
                    ? "bg-[#3498DB]/10 border-[#3498DB] text-[#3498DB]"
                    : "bg-white border-transparent text-[#2D3748] hover:bg-gray-50"
                }`}
              >
                <FontAwesomeIcon icon={tab.icon} style={{ fontSize: "11pt" }} />
                <span style={{ fontSize: "11pt", fontWeight: 700 }}>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-[12px] border border-gray-200 p-6" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h2 style={{ fontSize: "16pt", fontWeight: 700 }} className="text-[#2C3E50] mb-4">
                    معلومات الملف الشخصي
                  </h2>
                </div>

                <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#3498DB] to-[#2C3E50] rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    م.أ
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-[#3498DB] text-white rounded-[8px] hover:bg-[#2980B9] transition-all mr-2"
                      style={{ fontSize: "11pt", fontWeight: 700 }}
                    >
                      <FontAwesomeIcon icon={faUpload} className="ml-2" />
                      تغيير الصورة
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-[#2D3748] rounded-[8px] hover:bg-gray-200 transition-all"
                      style={{ fontSize: "11pt", fontWeight: 700 }}
                    >
                      حذف
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label style={{ fontSize: "11pt", fontWeight: 700 }} className="block text-[#2D3748] mb-2">
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      defaultValue="محمد أحمد علي"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-[8px] focus:border-[#3498DB] focus:ring-2 focus:ring-[#3498DB]/20 transition-all"
                      style={{ fontSize: "11pt" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11pt", fontWeight: 700 }} className="block text-[#2D3748] mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      defaultValue="mohamed.ahmed@school.edu.jo"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-[8px] focus:border-[#3498DB] focus:ring-2 focus:ring-[#3498DB]/20 transition-all"
                      style={{ fontSize: "11pt" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11pt", fontWeight: 700 }} className="block text-[#2D3748] mb-2">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      defaultValue="+962 79 123 4567"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-[8px] focus:border-[#3498DB] focus:ring-2 focus:ring-[#3498DB]/20 transition-all"
                      style={{ fontSize: "11pt" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11pt", fontWeight: 700 }} className="block text-[#2D3748] mb-2">
                      المسمى الوظيفي
                    </label>
                    <input
                      type="text"
                      defaultValue="مدرس رياضيات"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-[8px] focus:border-[#3498DB] focus:ring-2 focus:ring-[#3498DB]/20 transition-all"
                      style={{ fontSize: "11pt" }}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label style={{ fontSize: "11pt", fontWeight: 700 }} className="block text-[#2D3748] mb-2">
                      نبذة مختصرة
                    </label>
                    <textarea
                      rows={4}
                      defaultValue="مدرس رياضيات بخبرة 10 سنوات في التعليم الثانوي"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-[8px] focus:border-[#3498DB] focus:ring-2 focus:ring-[#3498DB]/20 transition-all"
                      style={{ fontSize: "11pt" }}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button className="px-6 py-3 bg-gray-100 text-[#2D3748] rounded-[8px] hover:bg-gray-200 transition-all"
                    style={{ fontSize: "11pt", fontWeight: 700 }}
                  >
                    <FontAwesomeIcon icon={faRotateRight} className="ml-2" />
                    إعادة تعيين
                  </button>
                  <button className="px-6 py-3 bg-[#2ECC71] text-white rounded-[8px] hover:bg-[#27AE60] transition-all"
                    style={{ fontSize: "11pt", fontWeight: 700 }}
                  >
                    <FontAwesomeIcon icon={faSave} className="ml-2" />
                    حفظ التغييرات
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 style={{ fontSize: "16pt", fontWeight: 700 }} className="text-[#2C3E50] mb-2">
                    إعدادات الإشعارات
                  </h2>
                  <p style={{ fontSize: "11pt" }} className="text-gray-600">
                    إدارة كيفية تلقي الإشعارات
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-[12px]">
                    <div>
                      <h3 style={{ fontSize: "11pt", fontWeight: 700 }} className="text-[#2D3748] mb-1">
                        إشعارات البريد الإلكتروني
                      </h3>
                      <p style={{ fontSize: "10pt" }} className="text-gray-600">
                        تلقي إشعارات عبر البريد الإلكتروني
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#3498DB]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#2ECC71]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-[12px]">
                    <div>
                      <h3 style={{ fontSize: "11pt", fontWeight: 700 }} className="text-[#2D3748] mb-1">
                        إشعارات الرسائل النصية
                      </h3>
                      <p style={{ fontSize: "10pt" }} className="text-gray-600">
                        تلقي إشعارات عبر SMS
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.sms}
                        onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#3498DB]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#2ECC71]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-[12px]">
                    <div>
                      <h3 style={{ fontSize: "11pt", fontWeight: 700 }} className="text-[#2D3748] mb-1">
                        الإشعارات الفورية
                      </h3>
                      <p style={{ fontSize: "10pt" }} className="text-gray-600">
                        تلقي إشعارات فورية داخل التطبيق
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.push}
                        onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#3498DB]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#2ECC71]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-[12px]">
                    <div>
                      <h3 style={{ fontSize: "11pt", fontWeight: 700 }} className="text-[#2D3748] mb-1">
                        التقرير الأسبوعي
                      </h3>
                      <p style={{ fontSize: "10pt" }} className="text-gray-600">
                        تلقي تقرير أسبوعي بالنشاطات
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.weekly}
                        onChange={(e) => setNotifications({...notifications, weekly: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#3498DB]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#2ECC71]"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button className="px-6 py-3 bg-[#2ECC71] text-white rounded-[8px] hover:bg-[#27AE60] transition-all"
                    style={{ fontSize: "11pt", fontWeight: 700 }}
                  >
                    <FontAwesomeIcon icon={faSave} className="ml-2" />
                    حفظ الإعدادات
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h2 style={{ fontSize: "16pt", fontWeight: 700 }} className="text-[#2C3E50] mb-2">
                    الأمان وكلمة المرور
                  </h2>
                  <p style={{ fontSize: "11pt" }} className="text-gray-600">
                    إدارة إعدادات الأمان وتغيير كلمة المرور
                  </p>
                </div>

                <div className="bg-[#2ECC71]/10 border border-[#2ECC71] rounded-[12px] p-4">
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faShield} className="text-[#2ECC71] text-2xl" />
                    <div>
                      <p style={{ fontSize: "11pt", fontWeight: 700 }} className="text-[#2D3748]">
                        حسابك محمي
                      </p>
                      <p style={{ fontSize: "10pt" }} className="text-gray-600">
                        آخر تغيير لكلمة المرور: منذ 30 يوماً
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label style={{ fontSize: "11pt", fontWeight: 700 }} className="block text-[#2D3748] mb-2">
                      كلمة المرور الحالية
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-[8px] focus:border-[#3498DB] focus:ring-2 focus:ring-[#3498DB]/20 transition-all"
                      style={{ fontSize: "11pt" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11pt", fontWeight: 700 }} className="block text-[#2D3748] mb-2">
                      كلمة المرور الجديدة
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-[8px] focus:border-[#3498DB] focus:ring-2 focus:ring-[#3498DB]/20 transition-all"
                      style={{ fontSize: "11pt" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11pt", fontWeight: 700 }} className="block text-[#2D3748] mb-2">
                      تأكيد كلمة المرور
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-[8px] focus:border-[#3498DB] focus:ring-2 focus:ring-[#3498DB]/20 transition-all"
                      style={{ fontSize: "11pt" }}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button className="px-6 py-3 bg-[#3498DB] text-white rounded-[8px] hover:bg-[#2980B9] transition-all"
                    style={{ fontSize: "11pt", fontWeight: 700 }}
                  >
                    <FontAwesomeIcon icon={faSave} className="ml-2" />
                    تحديث كلمة المرور
                  </button>
                </div>
              </div>
            )}

            {/* Data Management */}
            {activeTab === "data" && (
              <div className="space-y-6">
                <div>
                  <h2 style={{ fontSize: "16pt", fontWeight: 700 }} className="text-[#2C3E50] mb-2">
                    إدارة البيانات
                  </h2>
                  <p style={{ fontSize: "11pt" }} className="text-gray-600">
                    تصدير واستيراد البيانات
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-[12px] p-6 border border-gray-200">
                    <FontAwesomeIcon icon={faDownload} className="text-[#3498DB] text-3xl mb-4" />
                    <h3 style={{ fontSize: "14pt", fontWeight: 700 }} className="text-[#2C3E50] mb-2">
                      تصدير البيانات
                    </h3>
                    <p style={{ fontSize: "10pt" }} className="text-gray-600 mb-4">
                      تصدير جميع بياناتك بصيغة Excel أو PDF
                    </p>
                    <button className="w-full px-4 py-3 bg-[#3498DB] text-white rounded-[8px] hover:bg-[#2980B9] transition-all"
                      style={{ fontSize: "11pt", fontWeight: 700 }}
                    >
                      تصدير البيانات
                    </button>
                  </div>

                  <div className="bg-gray-50 rounded-[12px] p-6 border border-gray-200">
                    <FontAwesomeIcon icon={faUpload} className="text-[#2ECC71] text-3xl mb-4" />
                    <h3 style={{ fontSize: "14pt", fontWeight: 700 }} className="text-[#2C3E50] mb-2">
                      استيراد البيانات
                    </h3>
                    <p style={{ fontSize: "10pt" }} className="text-gray-600 mb-4">
                      استيراد بيانات الطلاب من ملف Excel
                    </p>
                    <button className="w-full px-4 py-3 bg-[#2ECC71] text-white rounded-[8px] hover:bg-[#27AE60] transition-all"
                      style={{ fontSize: "11pt", fontWeight: 700 }}
                    >
                      اختيار ملف
                    </button>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-[12px] p-6">
                  <h3 style={{ fontSize: "14pt", fontWeight: 700 }} className="text-red-600 mb-2">
                    منطقة الخطر
                  </h3>
                  <p style={{ fontSize: "11pt" }} className="text-gray-600 mb-4">
                    حذف جميع البيانات بشكل نهائي (لا يمكن التراجع عن هذا الإجراء)
                  </p>
                  <button className="px-6 py-3 bg-red-500 text-white rounded-[8px] hover:bg-red-600 transition-all"
                    style={{ fontSize: "11pt", fontWeight: 700 }}
                  >
                    حذف جميع البيانات
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
