import React, { useEffect, useState } from "react";

import upArrow from "../assets/naik.png"; // Gambar panah naik
import downArrow from "../assets/turun.png"; // Gambar panah turun
import axios from "axios";

interface Statistic {
  label: string;
  value: string;
  trend?: string;
}

interface StatisticGudangProps {
  stats: Statistic[];
}

const StatisticGudang: React.FC<StatisticGudangProps> = ({ stats }) => {
  const [totalPemasukan, setTotalPemasukan] = useState<string>("Loading...");
  const [trend, setTrend] = useState<string>("0%");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ambil data total pemasukan dari API
    axios
      .get("https://bg8tgnl0-3001.asse.devtunnels.ms/transaksi/data_pendapatan")
      .then((response) => {
        const data = response.data;

        // Validasi dan atur nilai data
        if (data && typeof data.total_pendapatan === "number") {
          setTotalPemasukan(
            `IDR ${data.total_pendapatan.toLocaleString() || 0}`
          );
          setTrend(data.trend || "0%");
        } else {
          console.warn("Data tidak valid atau kosong.");
          setTotalPemasukan("IDR 0");
          setTrend("0%");
        }
      })
      .catch((error) => {
        console.error("Error fetching total pemasukan:", error);
        setError("Gagal memuat data pendapatan. Silakan coba lagi nanti.");
        setTotalPemasukan("IDR 0");
        setTrend("0%");
      });
  }, []);

  // Perbarui nilai stats untuk Total Pemasukan
  const updatedStats = stats.map((stat) =>
    stat.label === "Total Pemasukan"
      ? { ...stat, value: totalPemasukan, trend: trend }
      : stat
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 bg-[#363636]">
      {/* Tampilkan error jika ada */}
      {error && (
        <div className="col-span-3 bg-red-500 text-white p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {updatedStats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#111315] p-4 rounded-lg flex flex-col items-center"
        >
          {/* Label */}
          <h3 className="text-2xl font-bold text-white">{stat.label}</h3>

          {/* Value */}
          <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>

          {/* Subtext dan Trend */}
          <div className="flex justify-between items-center w-full mt-2">
            {!["Jenis Produk", "Barang Masuk", "Barang Keluar"].includes(
              stat.label
            ) && <p className="text-gray-400 text-xs">minggu terakhir</p>}
            {stat.trend && (
              <div className="flex items-center space-x-1">
                <p className="text-sm font-semibold text-white">{stat.trend}</p>
                <img
                  src={stat.trend.startsWith("+") ? upArrow : downArrow}
                  alt={
                    stat.trend.startsWith("+")
                      ? "Upward Trend"
                      : "Downward Trend"
                  }
                  className="w-4 h-4"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticGudang;
