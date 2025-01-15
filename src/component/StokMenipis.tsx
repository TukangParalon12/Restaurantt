import React from "react";
import infoIcon from "../assets/info.png";

interface LowStockItem {
  no: number;
  bahanBaku: string;
  jenis: string;
  stok: number;
  satuan: string;
}

interface StokMenipisProps {
  data: LowStockItem[];
}

const StokMenipis: React.FC<StokMenipisProps> = ({ data }) => {
  return (
    <div className="bg-white p-3 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-gray-500 flex items-center">
          <img src={infoIcon} alt="Info" className="w-8 h-8 mr-3" /> Daftar Stok
          Menipis
        </h3>
        <button className="bg-[#1f1f1f] px-4 py-1 text-sm rounded-full hover:bg-[#2d2d2d] transition text-gray-100 mr-20">
          Pengaturan
        </button>
      </div>
      {/* Wrapper for scrollable table */}
      <div className="overflow-y-auto">
        <table className="w-full text-sm text-left text-gray-100 border-collapse border-spacing-0 mt-[3px]">
          <thead>
            <tr className="bg-[#111315] text-gray-white text-xs font-medium">
              <th className="p-3 border-b border-gray-600">No</th>
              <th className="p-3 border-b border-gray-600">Bahan Baku</th>
              <th className="p-3 border-b border-gray-600">Jenis</th>
              <th className="p-3 border-b border-gray-600">Stok</th>
              <th className="p-3 border-b border-gray-600">Satuan</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-[#1c1c1c]" : "bg-[#2a2a2a]"
                } hover:bg-[#333333] transition`}
              >
                <td className="p-3 border-b border-gray-700 text-gray-300">
                  {item.no}
                </td>
                <td className="p-3 border-b border-gray-700">
                  {item.bahanBaku}
                </td>
                <td className="p-3 border-b border-gray-700">{item.jenis}</td>
                <td className="p-3 border-b border-gray-700">{item.stok}</td>
                <td className="p-3 border-b border-gray-700">{item.satuan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StokMenipis;
