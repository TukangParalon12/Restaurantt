import React, { useEffect, useState } from "react";
import axios from "axios";

import upArrow from "../assets/naik.png";
import downArrow from "../assets/turun.png";

interface Stat {
  label: string;
  value: string;
  trend: string;
}

interface StatisticsSectionProps {
  stats: Stat[];
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ stats }) => {
  const [totalPemasukan, setTotalPemasukan] = useState("Loading...");
  const [trend, setTrend] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalPemasukan = async () => {
      try {
        const response = await axios.get(
          "https://nrmlm6dh-3001.asse.devtunnels.ms/transaksi/data_pendapatan"
        );
        const data = response.data;
        console.log("Cek API Response:", data);

        // Pastikan data memiliki struktur yang diharapkan
        if (data && typeof data.totalPendapatan === "number") {
          setTotalPemasukan(`IDR ${data.totalPendapatan.toLocaleString()}`);
          setTrend(data.trend ? `${data.trend}%` : "");
          setError(null);
        } else {
          console.warn("Data tidak valid atau kosong.");
          setTotalPemasukan("IDR 0");
          setTrend("");
        }
      } catch (error) {
        console.error("Error fetching total pemasukan:", error);
        setError("Gagal memuat data pendapatan. Silakan coba lagi nanti.");
        setTotalPemasukan("IDR 0");
        setTrend("");
      }
    };

    fetchTotalPemasukan();
  }, []);

  // Perbarui statistik dengan data terbaru
  const updatedStats = stats.map((stat) =>
    stat.label === "Total Pemasukan"
      ? { ...stat, value: totalPemasukan, trend: trend }
      : stat
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 bg-[#363636]">
      {/* Tampilkan pesan error jika ada */}
      {error && (
        <div className="col-span-3 bg-red-500 text-white p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {updatedStats.map((stat, index) => (
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
            <p className="text-gray-400 text-xs">Minggu terakhir</p>
            <div className="flex items-center space-x-1">
              <p className="text-sm font-semibold text-white">{stat.trend}</p>
              {/* Ikon panah */}
              <img
                src={stat.trend.startsWith("-") ? downArrow : upArrow}
                alt={
                  stat.trend.startsWith("-") ? "Downward Trend" : "Upward Trend"
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
