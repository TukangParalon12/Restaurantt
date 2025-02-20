import React from "react";

export interface ProdukMdKsrProps {
  title: string;
  price: string;
  rating: number;
  quantity: number;
  img_product: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onAddToCart: () => void;
}

const ProdukMdKsr: React.FC<ProdukMdKsrProps> = ({
  title,
  price,
  rating,
  quantity,
  img_product,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="flex items-center bg-[#00BFFF] text-black p-4 rounded-md shadow-md">
      {/* Gambar Produk */}
      <div className="w-32 h-32 rounded-md flex-shrink-0 overflow-hidden">
        <img
          src={img_product}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/150";
          }}
        />
      </div>

      {/* Detail Produk */}
      <div className="flex flex-col flex-1 ml-4">
        <h2 className="text-2xl font-semibold mb-1">{title}</h2>
        <p className="text-xl mb-1">{price}</p>
        <div className="text-yellow-500 text-xs">
          {"★".repeat(rating).padEnd(5, "☆")}
        </div>
      </div>

      {/* Kontrol Jumlah dan Tombol Tambah ke Keranjang */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <button
            className="px-2 py-1 bg-black text-white rounded-md text-xs"
            aria-label="Kurangi jumlah produk"
            onClick={onDecrease}
          >
            -
          </button>
          <span className="text-xs">{quantity}</span>
          <button
            className="px-2 py-1 bg-black text-white rounded-md text-xs"
            aria-label="Tambah jumlah produk"
            onClick={onIncrease}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProdukMdKsr;
