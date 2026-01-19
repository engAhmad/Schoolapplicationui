import { useState } from "react";
import { Lock, KeyRound } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import logoImage from "figma:asset/2385e0ff98680b3e955b9264c7f5c41cac92b29c.png";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = () => {
    setIsOtpSent(true);
  };

  const handleLogin = () => {
    // Simulate login
    onLogin();
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#2C3E50] to-[#3498DB] flex items-center justify-center p-6"
      style={{ fontFamily: "Cairo, sans-serif" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={logoImage} alt="AJYALPRO" className="w-48 h-48 mx-auto mb-4 object-contain" />
          <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">أجيال برو</h1>
          <p className="text-gray-600">نظام إدارة المدارس الذكي</p>
        </div>

        {/* Login Form */}
        <div className="space-y-4" dir="rtl">
          {!isOtpSent ? (
            <>
              <div>
                <label className="block text-sm font-semibold text-[#2C3E50] mb-2">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="أدخل بريدك الإلكتروني"
                    className="w-full pr-12 h-12 rounded-xl border-gray-300 focus:border-[#3498DB] focus:ring-[#3498DB]"
                    style={{ fontFamily: "Cairo, sans-serif", textAlign: "right" }}
                  />
                  <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              <Button
                onClick={handleSendOtp}
                className="w-full bg-[#3498DB] hover:bg-[#2980B9] text-white h-12 rounded-xl font-semibold"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                إرسال رمز التحقق
              </Button>
            </>
          ) : (
            <>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-green-700 text-center">
                  تم إرسال رمز التحقق إلى بريدك الإلكتروني
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2C3E50] mb-2">
                  رمز التحقق (OTP)
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="أدخل رمز التحقق"
                    className="w-full pr-12 h-12 rounded-xl border-gray-300 focus:border-[#3498DB] focus:ring-[#3498DB] text-center text-2xl tracking-widest"
                    style={{ fontFamily: "Cairo, sans-serif" }}
                    maxLength={6}
                  />
                  <KeyRound className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              <Button
                onClick={handleLogin}
                className="w-full bg-[#2ECC71] hover:bg-[#27AE60] text-white h-12 rounded-xl font-semibold"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                تسجيل الدخول
              </Button>

              <button
                onClick={() => setIsOtpSent(false)}
                className="w-full text-[#3498DB] hover:text-[#2980B9] text-sm font-medium"
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
