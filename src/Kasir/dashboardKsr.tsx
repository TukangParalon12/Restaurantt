import React from "react";
import GrafikChart from "../component/grafikBln";
import ProdukPopuler from "../component/ProdukPoluler";
import StatisticsSection from "../component/Statistics";

const DashboardKsr: React.FC = () => {
  const stats = [
    { label: "Total Pemasukan", value: "IDR 0", trend: "0%" },
    { label: "Total Pengeluaran", value: "IDR 0", trend: "0%" },
    { label: "Total Pembeli", value: "0", trend: "0%" },
  ];

  return (
    <>
      {/* Statistics Section */}
      <StatisticsSection stats={stats} />

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="bg-[#111315] p-4 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-white">Data Penjualan</h3>
          <div className="h-64 rounded-lg flex items-center justify-center">
            <GrafikChart />
          </div>
        </div>

        {/* Produk Populer Section */}
        <ProdukPopuler />
      </div>
    </>
  );
};

export default DashboardKsr;
