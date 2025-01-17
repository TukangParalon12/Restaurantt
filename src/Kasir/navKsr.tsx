import React from "react";
import dsh from "../assets/dashboard.png";
import prl from "../assets/profile.png";
import mksr from "../assets/modekasir.png";
import pdk from "../assets/produk.png";

interface NavbarKsrProps {
  children: React.ReactNode;
}

const NavbarKsr: React.FC<NavbarKsrProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen text-white">
      {/* Sidebar (Navbar) */}
      <aside className="w-48 bg-black flex flex-col p-3">
        <h1 className="text-lg font-bold mb-4">The Ivory Plate</h1>
        <nav className="space-y-6">
          <a
            href="/kasir"
            className="flex mt-5 items-center space-x-2 py-1 px-3 rounded hover:bg-gray-700 transition"
          >
            <img src={dsh} alt="" />
            <span>Dashboard</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 py-1 px-3 rounded hover:bg-gray-700 transition"
          >
            <img src={mksr} alt="" />
            <span>Mode Kasir</span>
          </a>
          <a
            href="/kasir/produk"
            className="flex items-center space-x-2 py-1 px-3 rounded hover:bg-gray-700 transition"
          >
            <img src={pdk} alt="" />
            <span>Produk</span>
          </a>
          <a
            href="/kasir/profile"
            className="flex items-center space-x-2 py-1 px-3 rounded hover:bg-gray-700 transition"
          >
            <img src={prl} alt="" />
            <span>Profile</span>
          </a>
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
        <main className="flex-1 p-4 bg-[#363636]">
          {children} {/* Render children di sini */}
        </main>
      </div>
    </div>
  );
};

export default NavbarKsr;
