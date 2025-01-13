import React from "react";

interface NavbarKsrProps {
  children: React.ReactNode;
}

const NavbarKsr: React.FC<NavbarKsrProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#363636] text-white">
      {/* Sidebar (Navbar) */}
      <aside className="w-64 bg-black flex flex-col p-4 ">
        <h1 className="text-xl font-bold mb-6">The Ivory Plate</h1>
        <nav className="space-y-6">
          {/* Menu Section */}
          <div>
            <h3 className="text-sm font-semibold uppercase mb-2">Menu</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3h18v18H3z" />
                  </svg>
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 12h6M8 6h8M4 18h16" />
                  </svg>
                  <span>Supplier</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6H4v14h16z" />
                  </svg>
                  <span>Produk</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9m-9-7h9m-9-7h9m-9-7h9" />
                  </svg>
                  <span>Karyawan</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Transaksi Section */}
          <div>
            <h3 className="text-sm font-semibold uppercase mb-2">Transaksi</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 pl-8 rounded hover:bg-gray-700 transition"
                >
                  Barang Masuk
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 pl-8 rounded hover:bg-gray-700 transition"
                >
                  Barang Keluar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 pl-8 rounded hover:bg-gray-700 transition"
                >
                  Jenis Produk
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 pl-8 rounded hover:bg-gray-700 transition"
                >
                  History
                </a>
              </li>
            </ul>
          </div>

          {/* Profile Section */}
          <div>
            <h3 className="text-sm font-semibold uppercase mb-2">Profile</h3>
            <a
              href="#"
              className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M14 14s1.5 1.5 0 3c-1 1-2-1.5-4-1.5-2 0-3 2.5-4 3 0-1.5 0-3 0-3m8-8h.01" />
              </svg>
              <span>
                <a href="profile">Profile</a>
              </span>
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-black p-4 flex justify-between items-center">
          <h2 className="ml-[850px] text-lg">Today: 18-04-2024</h2>
          <div className="p-2 rounded-full cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 7 7.388 7 8.764v5.394c0 .538-.214 1.055-.595 1.437L5 17h5m5 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-[#363636]">{children}</main>
      </div>
    </div>
  );
};

export default NavbarKsr;
