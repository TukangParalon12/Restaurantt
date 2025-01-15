import React from "react";
import dsh from "../assets/dashboard.png";
import sup from "../assets/supplier.png";
import pdk from "../assets/produk.png";
import kar from "../assets/karyawan.png";
import trs from "../assets/transaksi.png";
import prl from "../assets/profile.png";

interface NavbarOwnProps {
  children: React.ReactNode;
}

const NavbarOwn: React.FC<NavbarOwnProps> = ({ children }) => {
  return (
    <div className="flex h-screen text-white">
      {/* Sidebar (Navbar) */}
      <aside className="w-48 bg-black flex flex-col p-3">
        <h1 className="text-lg font-bold mb-4">The Ivory Plate</h1>
        <nav className="space-y-3">
          {/* Menu Section */}
          <div>
            <h3 className="text-sm font-semibold uppercase mb-2">Menu</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/owner"
                  className="flex items-center space-x-2 py-1 px-3 rounded hover:bg-gray-700 transition"
                >
                  <img src={dsh} alt="" />
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-2 py-1 px-3 rounded hover:bg-gray-700 transition"
                >
                  <img src={sup} alt="" />
                  <span>Supplier</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-2 py-1 px-3 rounded hover:bg-gray-700 transition"
                >
                  <img src={pdk} alt="" />
                  <span> Produk</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-2 py-1 px-3 rounded hover:bg-gray-700 transition"
                >
                  <img src={kar} alt="" />
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
                  className="flex items-center space-x-2 py-1 px-3 rounded hover:bg-gray-700 transition"
                >
                  <img src={trs} alt="" />
                  <span>Barang Masuk</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-2 py-1 px-3 rounded hover:bg-gray-700 transition"
                >
                  <img src={trs} alt="" />
                  <span>Barang Keluar</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-2 py-1 px-3 rounded hover:bg-gray-700 transition"
                >
                  <img src={trs} alt="" />
                  <span>Jenis Produk</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-2 py-1 px-3 rounded hover:bg-gray-700 transition"
                >
                  <img src={trs} alt="" />
                  <span>Histori</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Profile Section */}
          <div>
            <a
              href="owner/profile"
              className="flex items-center space-x-2 py-1 px-3 rounded hover:bg-gray-700 transition"
            >
              <img src={prl} alt="" />
              <span>Profile</span>
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#111315] p-3 flex justify-between items-center">
          <h2 className="text-sm ml-[1000px]">Today: 18-04-2024</h2>
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

export default NavbarOwn;
