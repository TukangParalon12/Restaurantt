import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import ProdukMdKsr from "../component/ProdukMdKsr";
import Tagihan from "../component/Tagihan";

interface Product {
  title: string;
  price: string;
  img_product: string;
  rating: number;
  quantity: number;
}

interface APIProduct {
  title: string;
  price: number;
  img_product: string;
}

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State untuk query pencarian
  const [tunai, setTunai] = useState<number>(0); // State untuk menyimpan input tunai
  const [kembalian, setKembalian] = useState<number>(0); // State untuk menyimpan kembalian
  const [idMeja, setIdMeja] = useState<string>(""); // State untuk ID meja

  // Fetch product data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://nrmlm6dh-3001.asse.devtunnels.ms/product/show_product"
        );

        const fetchedProducts = response.data.data.map(
          (product: APIProduct) => ({
            title: product.title,
            price: product.price.toString(), // Konversi price menjadi string
            img_product: `https://nrmlm6dh-3001.asse.devtunnels.ms/${product.img_product}`,
            rating: 5, // Default rating jika tidak ada
            quantity: 0, // Default quantity
          })
        );

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleIncrease = (index: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };

  const handleDecrease = (index: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const handleAddToCart = (index: number) => {
    const product = products[index];
    console.log(`Added ${product.title} to cart`);
  };

  const total = products
    .filter((product) => product.quantity > 0)
    .reduce((total, product) => {
      const price = parseInt(String(product.price).replace(/[^0-9]/g, ""));
      return total + price * product.quantity;
    }, 0);

  const handleTunaiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredTunai = parseFloat(event.target.value);
    setTunai(enteredTunai);
    setKembalian(enteredTunai >= total ? enteredTunai - total : 0);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuy = async () => {
    if (!idMeja) {
      alert("ID Meja belum diisi.");
      return;
    }

    if (tunai < total) {
      alert("Uang tunai tidak cukup.");
      return;
    }

    // Pastikan price dikirim sebagai angka
    const details = products
      .filter((product) => product.quantity > 0)
      .map((product) => ({
        product: product.title,
        price: parseInt(product.price.replace(/[^0-9]/g, ""), 10), // Konversi price ke number
        qty: product.quantity,
        id_category: 1,
      }));

    const transactionData = {
      no_meja: idMeja,
      id_payment_method: 1, // ID metode pembayaran (misalnya 1 untuk tunai)
      total_pembelian: total,
      nominal_pembayaran: tunai,
      nominal_pengembalian: kembalian, // Gunakan state kembalian langsung
      details,
    };

    try {
      const token = localStorage.getItem("token");
      console.log("cek token", token);
      if (!token) {
        alert("Token tidak ditemukan, silakan login kembali.");
        return;
      }

      const response = await axios.post(
        "https://nrmlm6dh-3001.asse.devtunnels.ms/transaksi",
        transactionData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Transaction created successfully:", response.data);
      alert("Transaksi berhasil!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response);
        alert(
          error.response?.data?.message || "Terjadi kesalahan saat transaksi."
        );
      } else {
        console.error("Unexpected Error:", error);
        alert("Transaksi gagal. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#111315] text-white">
      {/* Sidebar */}
      <aside className="w-16 bg-black flex flex-col p-4 fixed top-0 left-0 h-full z-40 space-y-6 items-center">
        <a href="/kasir">
          <button
            className="text-white hover:text-gray-400"
            aria-label="Kembali ke halaman kasir"
            title="Kembali ke halaman kasir"
          >
            <FaArrowLeft size={20} />
          </button>
        </a>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-16 mr-64 p-4">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Daftar Menu</h1>
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#1E1E1E] h-[40px] p-3 rounded-full text-sm text-white outline-white focus:ring-2 focus:ring-[#005A80] w-1/2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </header>

        <div className="space-y-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-400">
              Produk tidak ditemukan
            </div>
          ) : (
            filteredProducts.map((product, index) => (
              <ProdukMdKsr
                key={index}
                title={product.title}
                price={product.price}
                rating={product.rating}
                quantity={product.quantity}
                img_product={product.img_product}
                onIncrease={() => handleIncrease(index)}
                onDecrease={() => handleDecrease(index)}
                onAddToCart={() => handleAddToCart(index)}
              />
            ))
          )}
        </div>
      </div>

      {/* Tagihan */}
      <Tagihan
        idMeja={idMeja}
        setIdMeja={setIdMeja}
        products={products}
        total={total}
        tunai={tunai}
        // kembalian={kembalian}
        handleTunaiChange={handleTunaiChange}
        handleBuy={handleBuy}
      />
    </div>
  );
};

export default ProductListPage;
