import { motion } from "motion/react";
import { Loader2, CheckCircle2 } from "lucide-react";

interface SyncOverlayProps {
  isVisible: boolean;
  status: string;
  progress: number;
  isComplete?: boolean;
}

export function SyncOverlay({ isVisible, status, progress, isComplete }: SyncOverlayProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      style={{ fontFamily: "Cairo, sans-serif" }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
      >
        <div className="text-center">
          {isComplete ? (
            <div className="mb-6">
              <div className="w-20 h-20 bg-[#2ECC71] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-2">تمت المزامنة بنجاح</h3>
              <p className="text-gray-600">تم تحديث جميع البيانات من بوابة المدرسة</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="w-20 h-20 bg-[#3498DB] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-2">جاري المزامنة...</h3>
                <p className="text-gray-600 mb-6">{status}</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#3498DB] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">{progress}%</p>
              </div>
            </>
          )}

          <p className="text-xs text-gray-500 mt-6">
            {isComplete ? "يمكنك الآن العودة إلى العمل" : "الرجاء عدم إغلاق النافذة"}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
