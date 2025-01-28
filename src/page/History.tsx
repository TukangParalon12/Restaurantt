import React, { useEffect, useState } from "react";
import axios from "axios";

// Tipe untuk produk
interface Product {
  title: string; // Nama Produk
  price: string; // Harga Produk
  quantity: number; // Jumlah Produk
  level: number; // Level Produk (jika ada)
}

// Tipe untuk setiap item dalam histori transaksi
interface HistoryItem {
  id: string; // ID Transaksi
  paymentMethod: string; // Metode Pembayaran
  products: Product[];
}

// Tipe untuk data response dari backend
interface BackendResponse {
  id: string;
  id_payment_method: string;
  details: {
    product: string;
    prince: string;
    qty: number;
    level?: number;
  }[];
}

const HistoryPage: React.FC = () => {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil data dari backend
  const fetchHistory = async () => {
    try {
      const response = await axios.get<{ data: BackendResponse[] }>(
        "https://bg8tgnl0-3001.asse.devtunnels.ms/history" // Ganti URL sesuai endpoint backend
      );

      // Transformasi data dari response backend ke struktur yang sesuai
      const transformedData: HistoryItem[] = response.data.data.map(
        (item: BackendResponse) => ({
          id: item.id,
          paymentMethod: item.id_payment_method,
          products: item.details.map((product) => ({
            title: product.product,
            price: `IDR ${parseInt(product.prince).toLocaleString()}`,
            quantity: product.qty,
            level: product.level || 0,
          })),
        })
      );

      setHistoryData(transformedData);
    } catch (err) {
      console.error("Error fetching history:", err);
      setError("Terjadi kesalahan saat mengambil data histori.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#111315] text-white p-6">
      <h1 className="text-xl font-bold mb-6">Riwayat Transaksi</h1>
      <div className="space-y-6">
        {historyData.length === 0 ? (
          <div className="text-center text-gray-400">
            Tidak ada data histori transaksi.
          </div>
        ) : (
          historyData.map((history) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
