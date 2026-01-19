import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface StatTileProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: IconDefinition;
  color: "blue" | "green" | "navy";
}

export function StatTile({ title, value, subtitle, icon, color }: StatTileProps) {
  const colorClasses = {
    blue: "bg-[#3498DB]",
    green: "bg-[#2ECC71]",
    navy: "bg-[#2C3E50]",
  };

  return (
    <div
      className="bg-white rounded-[12px] p-6 border border-gray-200"
      style={{
        fontFamily: "Cairo, sans-serif",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p style={{ fontSize: "11pt" }} className="text-gray-600 mb-2">{title}</p>
          <h3 style={{ fontSize: "24pt", fontWeight: 700 }} className="text-[#2D3748] mb-1">{value}</h3>
          {subtitle && <p style={{ fontSize: "11pt" }} className="text-gray-500">{subtitle}</p>}
        </div>
        <div className={`w-[48px] h-[48px] rounded-[12px] ${colorClasses[color]} flex items-center justify-center`}>
          <FontAwesomeIcon icon={icon} className="text-white text-[24px]" />
        </div>
      </div>
    </div>
  );
}
