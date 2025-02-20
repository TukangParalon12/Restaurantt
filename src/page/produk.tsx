import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import Modal from "../component/tambahproduk";
import PengaturanPrdk from "../component/PengaturanPrdk";

interface Product {
  id: number;
  title: string;
  stock: number;
  price?: number;
  discount?: number;
  img_product: string;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductModalOpen, setProductModalOpen] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token tidak ditemukan. Silakan login.");
      setLoading(false);
      return;
    }

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
        console.error("Gagal mendekode token:", e);
        return null;
      }
    };

    const decoded = decodeToken();
    if (decoded && decoded.role) {
      setRole(decoded.role);
    }

    axios
      .get<{ data: Product[] }>(
        "https://nrmlm6dh-3001.asse.devtunnels.ms/product/show_product",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Respons API:", response.data);

        if (!response.data || !response.data.data) {
          console.error("Format respons API tidak sesuai:", response.data);
          setError("Format data dari server tidak sesuai.");
          return;
        }

        const fetchedProducts = response.data.data.map((product) => {
          if (!product.id) {
            console.error("Produk tanpa ID ditemukan:", product);
          }
          return {
            id: product.id,
            title: product.title,
            stock: product.stock,
            price: product.price,
            discount: product.discount,
            img_product: `https://nrmlm6dh-3001.asse.devtunnels.ms/${product.img_product}`,
          };
        });

        setProducts(fetchedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gagal mengambil data produk:", error);
        setError("Gagal mengambil data produk.");
        setLoading(false);
      });
  }, []);

  // Fungsi untuk mengambil detail produk berdasarkan ID
  const fetchProductById = async (productId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token tidak ditemukan. Silakan login.");
        return null;
      }

      const response = await axios.get(
        `https://nrmlm6dh-3001.asse.devtunnels.ms/product/cek_product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.data) {
        console.log("Produk ditemukan:", response.data.data);
        return response.data.data; // Mengembalikan satu produk
      } else {
        console.error("Produk tidak ditemukan:", response.data);
        return null;
      }
    } catch (error) {
      console.error("Gagal mengambil data produk:", error);
      return null;
    }
  };

  const handleProductClick = async (productId: number | undefined) => {
    if (!productId) {
      console.error("ID Produk tidak valid:", productId);
      return;
    }

    console.log("Mengambil data produk dengan ID:", productId);

    const productData = await fetchProductById(productId);
    if (!productData) {
      console.error("Produk tidak ditemukan.");
      return;
    }

    setSelectedProductId(productData.id); // Pastikan ID valid sebelum disimpan
    setProductModalOpen(true);
  };

  return (
    <div className="h-[100%] text-white p-6 relative">
      <div className="flex justify-center items-center mb-3">
        <h1 className="text-3xl font-bold">Stok Produk</h1>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">Memuat...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          <p>Belum ada produk yang ditambahkan</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg overflow-hidden text-center p-4 cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <img
                src={product.img_product}
                alt={product.title}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h2 className="text-xl font-semibold mb-1">{product.title}</h2>
              <p className="text-gray-400 text-md">Stock: {product.stock}</p>
            </div>
          ))}
        </div>
      )}

      {role === "owner" || role === "admin" ? (
        <button
          className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-400 text-white p-4 rounded-full shadow-lg"
          onClick={() => setModalOpen(true)}
        >
          <FaPlus size={24} />
        </button>
      ) : null}

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <PengaturanPrdk
        isOpen={isProductModalOpen}
        onClose={() => setProductModalOpen(false)}
        productId={selectedProductId}
      />
    </div>
  );
};

export default ProductPage;
