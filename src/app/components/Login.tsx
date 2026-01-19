import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faKey } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import logoImage from "@/assets/ajyal-pro-logo.png";
import { Loader2 } from "lucide-react"; // Keeping Loader2 as it's used for spinner, or should I replace it? Custom spinner used in code.

interface LoginProps {
  onLogin: () => void;
  onOffline?: () => void;
}

export function Login({ onLogin, onOffline }: LoginProps) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("يرجى إدخال البريد الإلكتروني");
      return;
    }
    if (!email.includes("@")) {
      toast.error("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsOtpSent(true);
      toast.success("تم إرسال رمز التحقق بنجاح");
    }, 1500);
  };

  const handleLogin = async () => {
    if (!otp) {
      toast.error("يرجى إدخال رمز التحقق");
      return;
    }
    if (otp.length < 6) {
      toast.error("رمز التحقق يجب أن يكون 6 أرقام");
      return;
    }

    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
      toast.success("تم تسجيل الدخول بنجاح");
    }, 1500);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[var(--color-brand-navy)] to-[var(--color-brand-blue)] flex items-center justify-center p-6"
      style={{ fontFamily: "var(--font-family-cairo)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={logoImage} alt="AJYALPRO" className="w-64 h-64 mx-auto mb-2 object-contain" />
          <p className="text-gray-600">نظام إدارة المدارس الذكي</p>
        </div>

        {/* Login Form */}
        <div className="space-y-4" dir="rtl">
          {!isOtpSent ? (
            <>
              <div>
                <label className="block text-sm font-semibold text-[#2C3E50] mb-2 dark:text-white">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="أدخل بريدك الإلكتروني"
                    className="w-full pr-12 h-12 rounded-xl border-gray-300 focus:border-[#3498DB] focus:ring-[#3498DB] dark:bg-gray-800 dark:border-gray-700"
                    style={{ fontFamily: "Cairo, sans-serif", textAlign: "right" }}
                    onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                  />
                  <FontAwesomeIcon icon={faLock} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              <Button
                onClick={handleSendOtp}
                disabled={isLoading}
                className="w-full bg-[#3498DB] hover:bg-[#2980B9] text-white h-12 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>جاري الإرسال...</span>
                  </div>
                ) : (
                  "إرسال رمز التحقق"
                )}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">أو</span>
                </div>
              </div>

              <Button
                onClick={onOffline}
                variant="outline"
                disabled={isLoading}
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-12 rounded-xl font-semibold transition-all active:scale-[0.98]"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                العمل بدون اتصال
              </Button>
            </>
          ) : (
            <>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 dark:bg-green-900/20 dark:border-green-800">
                <p className="text-sm text-green-700 text-center dark:text-green-400">
                  تم إرسال رمز التحقق إلى بريدك الإلكتروني
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2C3E50] mb-2 dark:text-white">
                  رمز التحقق (OTP)
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    value={otp}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
                    placeholder="أدخل رمز التحقق"
                    className="w-full pr-12 h-12 rounded-xl border-gray-300 focus:border-[#3498DB] focus:ring-[#3498DB] text-center text-2xl tracking-widest dark:bg-gray-800 dark:border-gray-700"
                    style={{ fontFamily: "Cairo, sans-serif" }}
                    maxLength={6}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  />
                  <FontAwesomeIcon icon={faKey} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              <Button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-[#2ECC71] hover:bg-[#27AE60] text-white h-12 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>جاري التحقق...</span>
                  </div>
                ) : (
                  "تسجيل الدخول"
                )}
              </Button>

              <button
                onClick={() => {
                  setIsOtpSent(false);
                  setOtp("");
                }}
                className="w-full text-[#3498DB] hover:text-[#2980B9] text-sm font-medium transition-colors"
                disabled={isLoading}
              >
                إرسال رمز جديد
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>© 2026 AJYALPRO. جميع الحقوق محفوظة</p>
          <p className="mt-1">نظام مطابق لمعايير وزارة التربية والتعليم الأردنية</p>
        </div>
      </div>
    </div>
  );
}
