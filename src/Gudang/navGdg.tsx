import React from "react";

interface NavbarGdgProps {
  children: React.ReactNode;
}

const NavbarGdg: React.FC<NavbarGdgProps> = ({ children }) => {
  return (
    <div className="flex h-screen text-white">
      {/* Sidebar (Navbar) */}
      <aside className="w-48 bg-black flex flex-col p-3">
        <h1 className="text-lg font-bold mb-4">The Ivory Plate</h1>
        <nav className="space-y-4">
          {/* Menu Section */}
          <div>
            <h3 className="text-sm font-semibold uppercase mb-2">Menu</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/gudang"
                  className="flex items-center space-x-2 py-1 px-3 rounded hover:bg-gray-700 transition"
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
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  </svg>
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-2 py-1 px-3 rounded hover:bg-gray-700 transition"
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
                    <circle cx="12" cy="8" r="4" />
                    <path d="M16 16v1a4 4 0 01-8 0v-1" />
                  </svg>
                  <span>Supplier</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-2 py-1 px-3 rounded hover:bg-gray-700 transition"
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
                    <path d="M21 16V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2z" />
                    <line x1="7" y1="20" x2="17" y2="20" />
                    <line x1="9" y1="16" x2="9" y2="20" />
                    <line x1="15" y1="16" x2="15" y2="20" />
                  </svg>
                  <span>Bahan Baku</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Transaksi Section */}
          <div>
            <h3 className="text-sm font-semibold uppercase mb-2">Transaksi</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="block py-1 px-3 rounded hover:bg-gray-700 transition"
                >
                  ↪ Barang Masuk
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-1 px-3 rounded hover:bg-gray-700 transition"
                >
                  ↪ Barang Keluar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-1 px-3 rounded hover:bg-gray-700 transition"
                >
                  ↪ Jenis Produk
                </a>
              </li>
            </ul>
          </div>

          {/* Profile Section */}
          <div>
            <a
              href="gudang/profile"
              className="flex items-center space-x-2 py-1 px-3 rounded hover:bg-gray-700 transition"
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
              <span>Profile</span>
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#111315] p-3 flex justify-between items-center">
          <h2 className="text-sm">Today: 18-04-2024</h2>
          <div className="p-1 rounded-full cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
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
        <main className="flex-1 p-4 bg-[#363636]">{children}</main>
      </div>
    </div>
  );
};

export default NavbarGdg;
