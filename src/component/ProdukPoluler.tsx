import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  img_product: string;
  qty: number;
}

const BASE_URL = "https://nrmlm6dh-3001.asse.devtunnels.ms/";

const ProdukPopuler: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await axios.get<{
          responseCode: number;
          data: Product[];
        }>(`${BASE_URL}product/popular`);

        console.log("Cek API Produk Populer:", response.data);

        if (response.data.responseCode === 200) {
          const updatedProducts = response.data.data.map((product) => ({
            ...product,
            img_product: product.img_product.startsWith("http")
              ? product.img_product
              : `${BASE_URL}${product.img_product}`, // Tambahkan BASE_URL
          }));

          setProducts(updatedProducts);
          setError(null);
        } else {
          setError("Data tidak valid.");
        }
      } catch (err) {
        console.error("Gagal mengambil data produk populer:", err);
        setError("Gagal memuat data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <div className="bg-[#111315] p-4 rounded-lg">
      <h3 className="text-2xl font-bold mb-4 text-white">Produk Populer</h3>

      {loading && <p className="text-gray-400">Memuat data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="space-y-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center bg-gray-800 p-3 rounded-lg"
            >
              {/* Product Image */}
              <div className="w-20 h-20 rounded-lg overflow-hidden mr-4">
                <img
                  src={product.img_product || "https://via.placeholder.com/150"}
                  alt={product.title}
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/150"; // Ganti jika gambar gagal dimuat
                  }}
                />
              </div>

              {/* Product Details */}
              <div>
                <h4 className="text-white font-semibold text-sm">
                  {product.title}
                </h4>
                <p className="text-gray-400 text-xs">
                  IDR {product.price.toLocaleString()}
                </p>
                <p className="text-gray-400 text-xs">Terjual: {product.qty}</p>

                {/* Rating Stars */}
                <div className="flex text-yellow-400 mt-1">
                  {Array(5)
                    .fill(null)
                    .map((_, starIndex) => (
                      <svg
                        key={starIndex}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3 h-3"
                      >
                        <path d="M12 .587l3.668 7.429 8.205 1.194-5.937 5.793 1.4 8.163L12 18.896l-7.336 3.87 1.4-8.163L.127 9.21l8.205-1.194L12 .587z" />
                      </svg>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProdukPopuler;
