import React from "react";

const DashboardGdg: React.FC = () => {
  const stats = [
    {
      label: "Total Supplier",
      value: "300",
      trend: "-5%",
      trendColor: "text-red-500",
    },
    {
      label: "Bahan Baku",
      value: "40",
      trend: "+5%",
      trendColor: "text-green-500",
    },
    {
      label: "Total Pemasukkan",
      value: "$3.000",
      trend: "+5%",
      trendColor: "text-green-500",
    },
    { label: "Jenis Produk", value: "3" },
    { label: "Barang Masuk", value: "40" },
    { label: "Barang Keluar", value: "15" },
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
    <div className="p-4 bg-[#363636] h-[100%] text-white">
      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#111315] p-4 rounded-lg flex flex-col items-start"
          >
            <h3 className="text-sm font-bold">{stat.label}</h3>
            <p className="text-2xl justify-center font-bold">{stat.value}</p>
            {stat.trend && (
              <p className={`text-xs mt-2 ${stat.trendColor}`}>{stat.trend}</p>
            )}
            <p className="text-gray-400 text-xs mt-1">minggu terakhir</p>
          </div>
        ))}
      </div>

      {/* Low Stock Table */}
      <div className="bg-[#111315] p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Daftar Stok Menipis</h3>
          <button className="bg-gray-700 px-4 py-1 text-sm rounded hover:bg-gray-600 transition">
            Setting
          </button>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-2">No</th>
              <th className="p-2">Bahan Baku</th>
              <th className="p-2">Jenis</th>
              <th className="p-2">Stok</th>
              <th className="p-2">Satuan</th>
            </tr>
          </thead>
          <tbody>
            {lowStockData.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600 transition`}
              >
                <td className="p-2">{item.no}</td>
                <td className="p-2">{item.bahanBaku}</td>
                <td className="p-2">{item.jenis}</td>
                <td className="p-2">{item.stok}</td>
                <td className="p-2">{item.satuan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardGdg;
