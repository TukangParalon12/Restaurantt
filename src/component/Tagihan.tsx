import React from "react";

interface Product {
  title: string;
  price: string;
  quantity: number;
}

interface TagihanProps {
  idMeja: string;
  setIdMeja: React.Dispatch<React.SetStateAction<string>>;
  products: Product[];
  total: number;
  tunai: number;
  kembalian: number;
  handleTunaiChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBuy: () => Promise<void>;
}

const Tagihan: React.FC<TagihanProps> = ({
  idMeja,
  setIdMeja,
  products,
  total,
  tunai,
  handleTunaiChange,
  handleBuy, // Pastikan handleBuy dipanggil
}) => {
  return (
    <aside className="w-64 bg-[#222222] p-6 fixed top-0 right-0 h-full text-white shadow-xl rounded-lg flex flex-col">
      {/* Bagian Atas: Informasi dan Produk */}
      <div className="flex-1 overflow-auto">
        <h2 className="text-xl font-semibold mb-6 border-b pb-2 border-gray-700">
          Tagihan
        </h2>

        {/* Input ID Meja */}
        <div className="mb-4">
          <label htmlFor="idMeja" className="text-sm font-medium block mb-1">
            ID Meja
          </label>
          <input
            id="idMeja"
            type="text"
            value={idMeja}
            onChange={(e) => setIdMeja(e.target.value)}
            className="bg-gray-800 p-2 rounded-md text-sm text-gray-300 w-full"
            placeholder="Masukkan ID Meja"
          />
        </div>

        <hr className="my-4 border-gray-700" />

        {/* Produk yang Dibeli */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Produk yang Dibeli</h3>
          {products.filter((product) => product.quantity > 0).length > 0 ? (
            <ul className="space-y-2">
              {products
                .filter((product) => product.quantity > 0)
                .map((product, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-sm p-2 bg-gray-800 rounded-md"
                  >
                    <div>
                      <p className="font-medium">{product.title}</p>
                      <p className="text-gray-400 text-xs">
                        {product.quantity} x IDR{" "}
                        {parseInt(
                          String(product.price).replace(/[^0-9]/g, "")
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      IDR{" "}
                      {(
                        parseInt(String(product.price).replace(/[^0-9]/g, "")) *
                        product.quantity
                      ).toLocaleString()}
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-sm">
              Belum ada produk yang dipilih.
            </p>
          )}
        </div>
      </div>

      {/* Bagian Bawah: Total, Tunai, Kembalian, dan Tombol */}
      <div className="border-t border-gray-700 pt-4 sticky bottom-0 bg-[#222222]">
        <div className="flex justify-between text-sm font-semibold mb-4">
          <span>Total</span>
          <span>IDR {total.toLocaleString()}</span>
        </div>

        {/* Input Tunai */}
        <div className="mb-4">
          <label htmlFor="tunai" className="text-sm font-medium block mb-1">
            Tunai
          </label>
          <input
            id="tunai"
            type="number"
            value={tunai}
            onChange={handleTunaiChange}
            className="bg-gray-800 p-2 rounded-md text-sm text-gray-300 w-full"
            placeholder="Masukkan Nominal"
          />
        </div>

        {/* Kembalian */}
        {tunai >= total && (
          <div className="flex justify-between text-sm font-semibold mb-4">
            <span>Kembalian</span>
            <span>IDR {(tunai - total).toLocaleString()}</span>
          </div>
        )}

        {/* Tombol Beli */}
        <button
          onClick={handleBuy} // Pastikan fungsi handleBuy dipanggil
          className="w-full bg-[#005A80] py-2 mt-2 rounded-md text-white font-semibold hover:bg-[#004e70] text-sm"
        >
          Beli
        </button>
      </div>
    </aside>
  );
};

export default Tagihan;
