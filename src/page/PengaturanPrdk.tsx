import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaArrowLeft, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  img_product: string;
  category: string;
  stock: number;
  discount?: number;
  displayOnSidebar?: boolean; // Tambahkan properti ini
}

const ProductSettingsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const navigate = useNavigate();

  // Fetch produk dari backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://bg8tgnl0-3001.asse.devtunnels.ms/product/show_product"
      );

      const fetchedProducts: Product[] = response.data.data.map(
        (product: Product) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          img_product: product.img_product
            ? `https://bg8tgnl0-3001.asse.devtunnels.ms/${product.img_product}`
            : "",
          category: product.category,
          stock: product.stock,
          discount: product.discount || 0,
          displayOnSidebar: false, // Tambahkan default false
        })
      );

      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fungsi edit produk
  const handleEdit = (product: Product) => {
    setEditProduct(product);
  };

  // Fungsi hapus produk
  const handleDelete = (id: number) => {
    console.log(`Delete product with ID: ${id}`);
    // Tambahkan logika hapus produk di sini
  };

  // Fungsi simpan perubahan
  const handleSave = async () => {
    if (!editProduct) return; // Pastikan ada produk yang sedang diedit

    try {
      // Kirim request PUT ke server untuk memperbarui data produk
      const response = await axios.put(
        `https://bg8tgnl0-3001.asse.devtunnels.ms/product/update_product_discount/${editProduct.id}`,
        {
          price: editProduct.price,
          discount: editProduct.discount,
          displayOnSidebar: editProduct.displayOnSidebar,
        }
      );

      console.log("Product updated:", response.data);

      // Update produk di state setelah berhasil disimpan
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editProduct.id
            ? { ...product, ...editProduct }
            : product
        )
      );

      setEditProduct(null); // Kembali ke tampilan default setelah disimpan
    } catch (error) {
      console.error("Error updating product:", error);
      // Menangani error jika terjadi masalah saat melakukan request
      alert("Terjadi kesalahan saat memperbarui produk. Silakan coba lagi.");
    }
  };

  // Fungsi batal edit
  const handleCancel = () => {
    setEditProduct(null);
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#111315] text-white">
      <h1 className="text-2xl font-bold mt-6 mb-4">Pengaturan Produk</h1>

      {/* Back button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
          title="Kembali"
          aria-label="Kembali ke halaman produk"
        >
          <FaArrowLeft size={20} />
        </button>
      </div>

      <div className="space-y-4 w-full px-4">
        {editProduct ? (
          <div className="bg-[#00C1FF] rounded-lg p-4 flex flex-col space-y-4">
            <h2 className="text-xl font-semibold">Edit Produk</h2>
            <input
              type="text"
              value={editProduct.title || ""}
              onChange={(e) =>
                setEditProduct({ ...editProduct, title: e.target.value })
              }
              className="p-2 rounded bg-gray-100 text-black"
              placeholder="Edit Title"
            />
            <input
              type="number"
              value={editProduct.price || 0}
              onChange={(e) =>
                setEditProduct({ ...editProduct, price: +e.target.value })
              }
              className="p-2 rounded bg-gray-100 text-black"
              placeholder="Edit Price"
            />
            <input
              type="number"
              value={editProduct.discount || 0}
              onChange={(e) =>
                setEditProduct({ ...editProduct, discount: +e.target.value })
              }
              className="p-2 rounded bg-gray-100 text-black"
              placeholder="Edit Discount"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={editProduct.displayOnSidebar || false}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    displayOnSidebar: e.target.checked,
                  })
                }
                className="hidden"
              />
              <div className="flex items-center justify-center w-5 h-5 bg-white rounded">
                {editProduct.displayOnSidebar && (
                  <FaCheck className="text-green-500" />
                )}
              </div>
              <span>Tampilkan di Sidebar</span>
            </label>
            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Simpan
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
            </div>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-[#00C1FF] rounded-lg p-4 flex justify-between items-center"
            >
              <div className="flex items-center space-x-6">
                <img
                  src={product.img_product}
                  alt={product.title}
                  className="w-24 h-24 rounded object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">{product.title}</h2>
                  <p className="text-lg">
                    IDR {product.price.toLocaleString()}
                  </p>
                  <p className="text-md">Diskon: {product.discount || 0}%</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-white hover:text-gray-800"
                  title={`Edit ${product.title}`}
                  aria-label={`Edit ${product.title}`}
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-white hover:text-red-500"
                  title={`Hapus ${product.title}`}
                  aria-label={`Hapus ${product.title}`}
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductSettingsPage;
