import React from "react";

import upArrow from "../assets/naik.png"; // Gambar panah naik
import downArrow from "../assets/turun.png"; // Gambar panah turun

interface Stat {
  label: string;
  value: string;
  trend: string;
}

interface StatisticsSectionProps {
  stats: Stat[];
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 bg-[#363636]">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#111315] p-6 rounded-lg flex flex-col items-center"
        >
          {/* Label */}
          <h3 className="text-2xl font-bold text-white">{stat.label}</h3>

          {/* Value */}
          <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>

          {/* Subtext and Trend */}
          <div className="flex justify-between items-center w-full mt-2">
            <p className="text-gray-400 text-xs">minggu terakhir</p>
            <div className="flex items-center space-x-1">
              <p className="text-sm font-semibold text-white">{stat.trend}</p>
              {/* Ikon panah */}
              <img
                src={stat.trend.startsWith("+") ? upArrow : downArrow}
                alt={
                  stat.trend.startsWith("+") ? "Upward Trend" : "Downward Trend"
                }
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsSection;
