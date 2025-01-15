import React from "react";
import StatisticGudang from "../component/StatisticGudang"; // Import the StatisticGudang component
import StokMenipis from "../component/StokMenipis"; // Import the StokMenipis component

const DashboardGdg: React.FC = () => {
  const stats = [
    {
      label: "Total Supplier",
      value: "0",
      trend: "0%",
    },
    {
      label: "Bahan Baku",
      value: "0",
      trend: "0%",
    },
    {
      label: "Total Pemasukkan",
      value: "IDR 0",
      trend: "0%",
    },
    { label: "Jenis Produk", value: "0" },
    { label: "Barang Masuk", value: "0" },
    { label: "Barang Keluar", value: "0" },
  ];

  const lowStockData = [
    {
      no: 1,
      bahanBaku: "Bahan Baku 1",
      jenis: "eat",
      stok: 20,
      satuan: "pack",
    },
    {
      no: 2,
      bahanBaku: "Bahan Baku 2",
      jenis: "drink",
      stok: 10,
      satuan: "packet",
    },
    {
      no: 3,
      bahanBaku: "Bahan Baku 3",
      jenis: "snack",
      stok: 2,
      satuan: "lusin",
    },
  ];

  return (
    <div className="p-2 bg-[#363636] h-[100%] text-white">
      {/* Statistics Section */}
      <StatisticGudang stats={stats} />

      {/* Low Stock Table */}
      <StokMenipis data={lowStockData} />
    </div>
  );
};

export default DashboardGdg;
