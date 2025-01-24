import React from "react";

interface HistoryItem {
  id: string; // ID Transaksi
  paymentMethod: string; // Metode Pembayaran
  products: {
    title: string; // Nama Produk
    price: string; // Harga Produk
    quantity: number; // Jumlah Produk
    level: number; // Level Produk (jika ada)
  }[];
}

const mockHistoryData: HistoryItem[] = [
  {
    id: "#001",
    paymentMethod: "BRI",
    products: [
      { title: "Product Title", price: "IDR 0.000", quantity: 1, level: 2 },
      { title: "Product Title", price: "IDR 0.000", quantity: 1, level: 2 },
    ],
  },
  {
    id: "#002",
    paymentMethod: "Dana",
    products: [
      { title: "Product Title", price: "IDR 0.000", quantity: 1, level: 2 },
      { title: "Product Title", price: "IDR 0.000", quantity: 1, level: 2 },
    ],
  },
];

const HistoryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#111315] text-white p-6">
      <div className="space-y-6">
        {mockHistoryData.map((history) => (
          <div
            key={history.id}
            className="bg-[#00CFFF] p-4 rounded-lg space-y-4 text-black"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{history.id}</h2>
              <span className="text-sm font-medium">
                {history.paymentMethod}
              </span>
            </div>
            <div className="space-y-4">
              {history.products.map((product, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="bg-white w-12 h-12 rounded-md" />
                  <div className="flex-1">
                    <h3 className="font-medium">{product.title}</h3>
                    <p className="text-sm">{product.price}</p>
                    <p className="text-xs text-gray-700">
                      Level {product.level} - {product.quantity} items
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
