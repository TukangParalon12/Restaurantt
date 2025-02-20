import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price?: number;
  discount?: number;
  img_product?: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number | null;
}

const PengaturanPrdk: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  productId,
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !productId) return;

    setLoading(true);
    setError(null);

    axios
      .get<{ data: Product }>(
        `https://nrmlm6dh-3001.asse.devtunnels.ms/product/show_product`,
        {
          params: { id: productId }, // Jika API membutuhkan parameter ID
        }
      )
      .then((response) => {
        console.log("Data produk dari API:", response.data.data);
        setProduct(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setError("Gagal mengambil data produk");
        setLoading(false);
      });
  }, [isOpen, productId]);

  if (!isOpen || !productId) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96 relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        {loading ? (
          <div className="text-center text-gray-700">Memuat...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : product ? (
          <>
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden shadow-md">
                <img
                  src={product.img_product || "https://via.placeholder.com/150"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.currentTarget.src = "https://via.placeholder.com/150")
                  }
                />
              </div>
              <h2 className="text-xl font-semibold mt-4 text-gray-900">
                {product.title}
              </h2>
            </div>

            <div className="mb-6 text-center text-gray-700">
              <p className="text-lg">
                <strong>Harga:</strong>{" "}
                {product.price
                  ? `Rp ${product.price.toLocaleString()}`
                  : "Harga tidak tersedia"}
              </p>
              {product.discount ? (
                <p className="text-lg text-red-500">
                  <strong>Diskon:</strong> {product.discount}%
                </p>
              ) : (
                <p className="text-lg text-gray-400">Tidak ada diskon</p>
              )}
            </div>

            <div className="flex justify-between">
              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition">
                Hapus
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition">
                Edit
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-700">
            Produk tidak ditemukan.
          </div>
        )}
      </div>
    </div>
  );
};

export default PengaturanPrdk;
