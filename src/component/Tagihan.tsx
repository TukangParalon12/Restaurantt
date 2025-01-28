import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  title: string;
  price: string; // Anda bisa mengubah ini menjadi number jika ingin memudahkan perhitungan
  quantity: number;
}

interface TagihanProps {
  idMeja: string;
  setIdMeja: React.Dispatch<React.SetStateAction<string>>;
  products: Product[];
  total: number;
  tunai: number;
  handleTunaiChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBuy: () => Promise<void>;
}

const Tagihan: React.FC<TagihanProps> = ({
  idMeja,
  setIdMeja,
  products,
  total,
  tunai,
  handleTunaiChange,
  handleBuy,
}) => {
  const [kasir, setKasir] = useState<{ id: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKasirData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        console.log("Token dari localStorage:", token);
        if (!token) {
          setError("Token tidak ditemukan. Silakan login kembali.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://bg8tgnl0-3001.asse.devtunnels.ms/users/show_data",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Respons API Lengkap:", response);

        if (response.data?.id && response.data?.name) {
          setKasir(response.data);
        } else {
          setError("Data kasir tidak valid.");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios Error:", error.response);
          setError(
            error.response?.data?.message ||
              `Error ${error.response?.status || "tidak diketahui"}`
          );
          console.error("Detail Error:", error);
        } else {
          console.error("Unexpected Error:", error);
          setError("Gagal mengambil data kasir. Silakan coba lagi.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchKasirData();
  }, []);

  return (
    <aside className="w-64 bg-[#222222] p-6 fixed top-0 right-0 h-full text-white shadow-xl rounded-lg flex flex-col">
      {/* Informasi Kasir */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Kasir</h2>
        {loading ? (
          <p className="text-sm text-gray-400">Memuat data kasir...</p>
        ) : error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : (
          <p className="text-sm">
            ID: {kasir?.id} <br />
            Nama: {kasir?.name}
          </p>
        )}
      </div>

      {/* Input ID Meja */}
      <div className="mb-4">
        <label htmlFor="idMeja" className="text-sm font-medium block mb-1">
          ID Meja
        </label>
        <input
          id="idMeja"
          type="text"
          value={idMeja}
          onChange={(e) => setIdMeja(e.target.value)}
          className="bg-gray-800 p-2 rounded-md text-sm text-gray-300 w-full"
          placeholder="Masukkan ID Meja"
        />
      </div>

      {/* Produk yang Dibeli */}
      <div className="flex-1 overflow-auto">
        <h3 className="text-lg font-semibold mb-2">Produk yang Dibeli</h3>
        {products.filter((product) => product.quantity > 0).length > 0 ? (
          <ul className="space-y-2">
            {products
              .filter((product) => product.quantity > 0)
              .map((product, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-sm p-2 bg-gray-800 rounded-md"
                >
                  <div>
                    <p className="font-medium">{product.title}</p>
                    <p className="text-gray-400 text-xs">
                      {product.quantity} x IDR{" "}
                      {parseInt(
                        String(product.price).replace(/[^0-9]/g, "")
                      ).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    IDR{" "}
                    {(
                      parseInt(String(product.price).replace(/[^0-9]/g, "")) *
                      product.quantity
                    ).toLocaleString()}
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-sm">
            Belum ada produk yang dipilih.
          </p>
        )}
      </div>

      {/* Total, Tunai, dan Tombol Beli */}
      <div className="border-t border-gray-700 pt-4 sticky bottom-0 bg-[#222222]">
        <div className="flex justify-between text-sm font-semibold mb-4">
          <span>Total</span>
          <span>IDR {total.toLocaleString()}</span>
        </div>

        <div className="mb-4">
          <label htmlFor="tunai" className="text-sm font-medium block mb-1">
            Tunai
          </label>
          <input
            id="tunai"
            type="number"
            value={tunai}
            onChange={handleTunaiChange}
            className="bg-gray-800 p-2 rounded-md text-sm text-gray-300 w-full"
            placeholder="Masukkan Nominal"
          />
        </div>

        {tunai >= total && (
          <div className="flex justify-between text-sm font-semibold mb-4">
            <span>Kembalian</span>
            <span>IDR {(tunai - total).toLocaleString()}</span>
          </div>
        )}

        <button
          onClick={handleBuy}
          className="w-full bg-[#005A80] py-2 mt-2 rounded-md text-white font-semibold hover:bg-[#004e70] text-sm"
        >
          Beli
        </button>
      </div>
    </aside>
  );
};

export default Tagihan;
