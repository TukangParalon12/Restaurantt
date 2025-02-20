import React, { useState } from "react";
import axios from "axios";

interface TambahProdukProps {
  isOpen: boolean;
  onClose: () => void;
}

const TambahProduk: React.FC<TambahProdukProps> = ({ isOpen, onClose }) => {
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const categories = ["makanan", "minuman", "lain-lain"];

  const categoryMap: { [key: string]: number } = {
    makanan: 1,
    minuman: 2,
    "lain-lain": 3,
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      setProductImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName || !productPrice || !productImage || !productCategory) {
      setError("All fields are required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token not found. Please login.");
      return;
    }

    const formData = new FormData();
    formData.append("title", productName);
    formData.append("price", productPrice);
    formData.append("category", categoryMap[productCategory].toString());
    formData.append("img_product", productImage);

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "https://nrmlm6dh-3001.asse.devtunnels.ms/product/add_product",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Product added successfully:", response.data);
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[350px] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black font-bold text-lg"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Image Upload */}
        <div className="flex justify-center items-center mb-4">
          <div className="relative">
            <div
              className={`w-20 h-20 bg-gray-200 rounded-full flex justify-center items-center ${
                imagePreview ? "" : "text-gray-500"
              }`}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span>img</span>
              )}
            </div>
            {/* Invisible input for file with a title attribute */}
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              title="Upload image"
            />
            {/* Button to trigger file input */}
            <label
              htmlFor="file-upload"
              className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-6 h-6 flex justify-center items-center cursor-pointer"
              aria-label="Add image"
            >
              +
            </label>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div className="flex items-center">
            <label htmlFor="product-name" className="w-20 text-black">
              Nama:
            </label>
            <input
              id="product-name"
              type="text"
              placeholder="Masukkan nama produk"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 flex-1 text-black"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="product-price" className="w-20 text-black">
              Harga:
            </label>
            <input
              id="product-price"
              type="text"
              placeholder="Masukkan harga produk"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 flex-1 text-black"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="product-category" className="w-20 text-black">
              Kategori:
            </label>
            <select
              id="product-category"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 flex-1 text-black"
            >
              <option value="">Pilih kategori</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error or loading message */}
        {error && <div className="text-red-500 mt-2">{error}</div>}

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TambahProduk;
