import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCog, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Modal from "../component/tambahproduk";

interface Product {
  title: string;
  stock: number;
  img_product: string;
}

interface ApiResponse {
  data: Product[];
}

const ProductPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null); // Menyimpan role pengguna

  const navigate = useNavigate(); // Inisialisasi useNavigate

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token not found. Please login.");
      setLoading(false);
      return;
    }

    // Mendekode token untuk mendapatkan role
    const decodeToken = () => {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        return JSON.parse(jsonPayload);
      } catch (e) {
        console.error("Failed to decode token:", e);
        return null;
      }
    };

    const decoded = decodeToken();
    if (decoded && decoded.role) {
      setRole(decoded.role); // Mengambil role dari token
    }

    axios
      .get<ApiResponse>(
        "https://bg8tgnl0-3001.asse.devtunnels.ms/product/show_product",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Respons dari API:", response.data);

        // Mapping the API response to match the Product type
        const fetchedProducts = response.data.data.map((product) => ({
          title: product.title,
          stock: product.stock,
          img_product: `https://bg8tgnl0-3001.asse.devtunnels.ms/${product.img_product}`,
        }));

        setProducts(fetchedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to fetch product data.");
        setLoading(false);
      });
  }, []);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const goToSettings = () => {
    navigate("/pengaturan"); // Navigasi ke halaman pengaturan
  };

  return (
    <div className="h-[100%] text-white p-6 relative">
      <div className="flex justify-center items-center mb-3">
        <h1 className="text-3xl font-bold">Stok Produk</h1>
      </div>

      {/* Tampilkan tombol pengaturan hanya jika role adalah owner/admin */}
      {role === "owner" || role === "admin" ? (
        <div className="absolute top-6 right-6">
          <button
            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
            title="Pengaturan"
            onClick={goToSettings} // Panggil fungsi navigasi
          >
            <FaCog size={20} />
          </button>
        </div>
      ) : null}

      {loading ? (
        <div className="text-center text-gray-400">Loading ...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          <p>Belum ada produk yang ditambahkan</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden text-center p-4"
            >
              <img
                src={product.img_product}
                alt={product.title}
                className="w-full h-48 object-cover mb-4 rounded-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/150";
                }}
              />
              <h2 className="text-xl font-semibold mb-1">{product.title}</h2>
              <p className="text-gray-400 text-md">Stock: {product.stock}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tampilkan tombol tambah produk hanya jika role adalah owner/admin */}
      {role === "owner" || role === "admin" ? (
        <button
          className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-400 text-white p-4 rounded-full shadow-lg transition"
          title="Tambah Produk"
          onClick={() => setModalOpen(true)}
        >
          <FaPlus size={24} />
        </button>
      ) : null}

      <Modal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default ProductPage;
