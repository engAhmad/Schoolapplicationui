import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClipboardCheck,
    faStar,
    faBullhorn,
    faPlus,
    faHistory
} from "@fortawesome/free-solid-svg-icons";

export function QuickActionsWidget() {
    const actions = [
        {
            id: 1,
            title: "رصد غياب اليوم",
            subtitle: "3 حصص متبقية",
            icon: faClipboardCheck,
            color: "bg-blue-50 text-blue-600",
            hover: "hover:bg-blue-100 hover:border-blue-200"
        },
        {
            id: 2,
            title: "إدخال الدرجات",
            subtitle: "اختبار الفترة الأولى",
            icon: faStar,
            color: "bg-orange-50 text-orange-600",
            hover: "hover:bg-orange-100 hover:border-orange-200"
        },
        {
            id: 3,
            title: "إرسال تعميم",
            subtitle: "لأولياء الأمور",
            icon: faBullhorn,
            color: "bg-purple-50 text-purple-600",
            hover: "hover:bg-purple-100 hover:border-purple-200"
        },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 font-['Cairo'] h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#2C3E50]">إجراءات سريعة</h3>
                <button className="text-xs text-[#3498DB] font-bold hover:underline">
                    تخصيص
                </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {actions.map((action) => (
                    <button
                        key={action.id}
                        className={`flex items-center gap-4 p-3 rounded-xl border border-transparent transition-all duration-200 group text-right ${action.hover} bg-gray-50`}
                    >
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${action.color} transition-transform group-hover:scale-110`}>
                            <FontAwesomeIcon icon={action.icon} className="text-lg" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-[#2C3E50] text-sm group-hover:text-[#3498DB] transition-colors">{action.title}</h4>
                            <p className="text-xs text-gray-400 mt-1">{action.subtitle}</p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <FontAwesomeIcon icon={faPlus} className="text-gray-300" />
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>آخر إجراء: رصد غياب (2د)</span>
                <FontAwesomeIcon icon={faHistory} />
            </div>
        </div>
    );
}
