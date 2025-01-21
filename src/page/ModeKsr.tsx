import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import ProdukMdKsr from "../component/ProdukMdKsr";

interface Product {
  title: string;
  price: string; // Tetap sebagai string
  img_product: string;
  rating: number;
  quantity: number;
}

interface APIProduct {
  title: string;
  price: number; // Dari backend berupa number
  img_product: string;
}

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State untuk query pencarian
  const [tunai, setTunai] = useState<number>(0); // State untuk menyimpan input tunai
  const [kembalian, setKembalian] = useState<number>(0); // State untuk menyimpan kembalian

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://bg8tgnl0-3001.asse.devtunnels.ms/product/show_product"
        );

        const fetchedProducts = response.data.data.map(
          (product: APIProduct) => ({
            title: product.title,
            price: product.price.toString(), // Konversi price menjadi string
            img_product: `https://bg8tgnl0-3001.asse.devtunnels.ms/${product.img_product}`,
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

  // Menghitung Total harga produk dengan quantity lebih dari 0
  const total = products
    .filter((product) => product.quantity > 0)
    .reduce((total, product) => {
      const price = parseInt(String(product.price).replace(/[^0-9]/g, ""));
      return total + price * product.quantity;
    }, 0);

  // Menghitung kembalian jika tunai lebih besar atau sama dengan total
  const handleTunaiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredTunai = parseFloat(event.target.value);
    setTunai(enteredTunai);
    setKembalian(enteredTunai >= total ? enteredTunai - total : 0);
  };

  // Menyaring produk berdasarkan query pencarian
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h1 className="text-2xl font-semibold">Menu List</h1>
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#1E1E1E] h-[40px] p-3 rounded-full text-sm text-white outline-white focus:ring-2 focus:ring-[#005A80] w-1/2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Menangani perubahan input pencarian
          />
        </header>

        {/* Product List */}
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
      <aside className="w-64 bg-[#222222] p-6 fixed top-0 right-0 h-full text-white shadow-xl rounded-lg">
        <h2 className="text-xl font-semibold mb-6">Tagihan</h2>
        <ul className="space-y-4">
          {products
            .filter((product) => product.quantity > 0)
            .map((product, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span>{product.title}</span>
                <span>
                  IDR{" "}
                  {(
                    parseInt(String(product.price).replace(/[^0-9]/g, "")) *
                    product.quantity
                  ).toLocaleString()}
                </span>
              </li>
            ))}
        </ul>

        {/* Garis Pemisah antara Total dan Produk */}
        <hr className="my-4 border-gray-700" />

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Total</span>
            <span>IDR {total.toLocaleString()}</span>
          </div>

          {/* Input Tunai yang lebih kecil */}
          <div className="flex justify-between items-center text-sm">
            <span>Tunai</span>
            <input
              type="number"
              value={tunai}
              onChange={handleTunaiChange}
              className="bg-gray-800 p-2 rounded-md text-sm text-gray-300 w-1/2"
              placeholder="Masukkan Nominal"
            />
          </div>
          <textarea
            placeholder="Tambahkan Catatan"
            className="bg-gray-800 w-full mt-4 p-3 rounded-md text-sm text-gray-300 resize-none"
          ></textarea>
        </div>

        {/* Garis Pemisah antara Kembalian dan Button Beli */}
        <hr className="my-4 border-gray-700" />

        {/* Menampilkan Kembalian */}
        {tunai >= total && (
          <div className="flex justify-between text-sm font-semibold">
            <span>Kembalian</span>
            <span>IDR {kembalian.toLocaleString()}</span>
          </div>
        )}

        <button className="w-full bg-[#005A80] py-2 mt-6 rounded-md text-white font-semibold hover:bg-[#004e70] text-sm">
          Beli
        </button>
      </aside>
    </div>
  );
};

export default ProductListPage;
