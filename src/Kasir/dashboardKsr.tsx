import React from "react";

const Dashboard: React.FC = () => {
  const stats = [
    { label: "Total Pemasukan", value: "$3.000", trend: "+5%" },
    { label: "Total Pengeluaran", value: "$3.000", trend: "+5%" },
    { label: "Total Pembeli", value: "3.000", trend: "-5%" },
  ];

  return (
    <>
      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 bg-[#363636]">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-black p-6 rounded-lg flex flex-col items-center"
          >
            <h3 className="text-xl font-bold text-white">{stat.label}</h3>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p
              className={`mt-2 text-sm ${
                stat.trend.startsWith("+") ? "text-green-500" : "text-red-500"
              }`}
            >
              {stat.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="bg-black p-4 md:p-6 rounded-lg max-w-lg mx-auto lg:mx-0">
          <h3 className="text-xl font-bold mb-4 text-white">Data Penjualan</h3>
          <div className="h-64 bg-black rounded-lg flex items-center justify-center"></div>
        </div>

        {/* Popular Products Section */}
        <div className="bg-black p-4 md:p-6 rounded-lg max-w-lg mx-auto lg:mx-0">
          <h3 className="text-xl font-bold mb-4 text-white">Produk Populer</h3>
          <div className="space-y-4">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex items-center bg-black p-4 rounded-lg"
                >
                  {/* Product Image */}
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-300 rounded mr-4"></div>

                  {/* Product Details */}
                  <div>
                    <h4 className="font-bold text-white">Judul Produk</h4>
                    <p className="text-gray-300">IDR 0.000</p>
                    <p className="text-gray-300">Terjual: 0</p>

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
                            className="w-4 h-4"
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
      </div>
    </>
  );
};

export default Dashboard;
