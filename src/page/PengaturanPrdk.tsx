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
  displayOnSidebar?: boolean;
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
          displayOnSidebar: false,
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

  const handleEdit = (product: Product) => {
    setEditProduct(product);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `https://bg8tgnl0-3001.asse.devtunnels.ms/product/delete/${id}`
      );
      setProducts(products.filter((product) => product.id !== id));
      alert("Produk berhasil dihapus");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Terjadi kesalahan saat menghapus produk.");
    }
  };

  const handleSave = async () => {
    if (!editProduct) return;

    try {
      // Pastikan ID produk terkirim dengan benar
      const response = await axios.put(
        `https://bg8tgnl0-3001.asse.devtunnels.ms/product/update_product_discount/${editProduct.id}`,
        {
          id: editProduct.id,
          price: editProduct.price,
          discount: editProduct.discount,
          displayOnSidebar: editProduct.displayOnSidebar,
        }
      );

      console.log("Product updated:", response.data);

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editProduct.id
            ? { ...product, ...editProduct }
            : product
        )
      );

      setEditProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Terjadi kesalahan saat memperbarui produk. Silakan coba lagi.");
    }
  };

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
          aria-label="Kembali ke halaman sebelumnya"
          title="Kembali"
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
                type="button"
              >
                Simpan
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded"
                type="button"
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
                  aria-label={`Edit produk ${product.title}`}
                  title={`Edit produk ${product.title}`}
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-white hover:text-red-500"
                  aria-label={`Hapus produk ${product.title}`}
                  title={`Hapus produk ${product.title}`}
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
