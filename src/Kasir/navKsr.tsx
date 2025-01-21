import React from "react";
import { useLocation } from "react-router-dom";
import dsh from "../assets/dashboard.png";
import prl from "../assets/profile.png";
import mksr from "../assets/modekasir.png";
import pdk from "../assets/produk.png";
import trs from "../assets/transaksi.png";

interface NavbarKsrProps {
  children: React.ReactNode;
}

const NavbarKsr: React.FC<NavbarKsrProps> = ({ children }) => {
  const location = useLocation();

  // Tentukan background berdasarkan lokasi
  const mainBgClass =
    location.pathname === "/kasir" ? "bg-[#363636]" : "bg-[#111315]";

  return (
    <div className="flex min-h-screen text-white">
      {/* Sidebar (Navbar) */}
      <aside className="w-48 bg-black flex flex-col p-4 fixed top-0 left-0 h-full z-40">
        <h1 className="text-xl font-bold mb-6">The Ivory Plate</h1>
        <nav className="space-y-6">
          {/* Menu Section */}
          <div>
            <h3 className="text-sm font-semibold uppercase mb-3">Menu</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/kasir"
                  className="flex items-center space-x-2 py-2 px-3 rounded hover:bg-gray-700 transition"
                >
                  <img src={dsh} alt="" className="w-6 h-6" />
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="/modekasir"
                  className="flex items-center space-x-2 py-2 px-3 rounded hover:bg-gray-700 transition"
                >
                  <img src={mksr} alt="" className="w-6 h-6" />
                  <span>Mode Kasir</span>
                </a>
              </li>
              <li>
                <a
                  href="/kasir/produk"
                  className="flex items-center space-x-2 py-2 px-3 rounded hover:bg-gray-700 transition"
                >
                  <img src={pdk} alt="" className="w-6 h-6" />
                  <span>Produk</span>
                </a>
              </li>{" "}
              <li className="ml-4">
                {" "}
                {/* Menambahkan margin left untuk indentasi */}
                <a
                  href="#"
                  className="flex items-center space-x-2 py-1.5 px-2 rounded hover:bg-gray-700 transition w-8 h-8"
                >
                  <img src={trs} alt="" />
                  <span className="text-md">Histori</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Profile Section */}
          <div>
            <a
              href="/kasir/profile"
              className="flex items-center space-x-2 py-2 px-3 rounded hover:bg-gray-700 transition"
            >
              <img src={prl} alt="" className="w-6 h-6" />
              <span>Profile</span>
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-48">
        {/* Header */}
        <header className="bg-[#111315] p-3 flex justify-between items-center fixed top-0 left-48 right-0 z-50">
          <h2 className="ml-[950px] text-md ">Today: 18-04-2024</h2>
          <div className="p-1 rounded-full cursor-pointer">
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
        <main className={`flex-1 p-4 mt-12 ${mainBgClass}`}>{children}</main>
      </div>
    </div>
  );
};

export default NavbarKsr;
