import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCog, FaPlus } from "react-icons/fa";

interface Product {
  name: string;
  stock: number;
  imageUrl: string;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch data dari API menggunakan Axios
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://bg8tgnl0-3001.asse.devtunnels.ms/product/show_product"
        );
        const fetchedProducts = response.data; // Sesuaikan jika struktur data API berbeda

        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="h-[100%] text-white p-6 relative">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-3xl font-bold">Stok Produk</h1>
        <button
          className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
          title="Pengaturan"
        >
          <FaCog size={20} />
        </button>
      </div>

      {loading ? (
        // Tampilkan pesan loading jika data sedang dimuat
        <div className="text-center text-gray-400">Loading ...</div>
      ) : products.length === 0 ? (
        // Tampilkan pesan jika tidak ada produk
        <div className="text-center text-gray-400 mt-10">
          <p>Belum ada produk yang ditambahkan</p>
        </div>
      ) : (
        // Tampilkan produk jika ada
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {products.map((product, indedx) => (
            <div
              key={index}
              className="bg-[#1c1c1c] rounded-lg overflow-hidden text-center p-4"
            >
              <img
                src={product.imageUrl || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-32 object-cover mb-4 rounded-md"
              />
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-400">Stock: {product.stock}</p>
            </div>
          ))}
        </div>
      )}

      <button
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-400 text-white p-4 rounded-full shadow-lg transition"
        title="Tambah Produk"
      >
        <FaPlus size={24} />
      </button>
    </div>
  );
};

export default ProductPage;
