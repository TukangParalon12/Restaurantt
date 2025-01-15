// src/component/ProdukPopuler.tsx
import React from "react";

const ProdukPopuler: React.FC = () => {
  return (
    <div className="bg-[#111315] p-4 rounded-lg">
      <h3 className="text-2xl font-bold mb-4 text-white">Produk Populer</h3>
      <div className="space-y-2">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-800 p-3 rounded-lg"
            >
              {/* Product Image */}
              <div className="w-10 h-10 bg-gray-500 rounded mr-3"></div>

              {/* Product Details */}
              <div>
                <h4 className="text-white font-semibold text-sm">
                  Judul Produk
                </h4>
                <p className="text-gray-400 text-xs">IDR 0.000</p>
                <p className="text-gray-400 text-xs">Terjual: 0</p>

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
    </div>
  );
};

export default ProdukPopuler;
