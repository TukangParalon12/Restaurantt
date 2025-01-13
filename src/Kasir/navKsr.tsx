import React from "react";

interface NavbarKsrProps {
  children: React.ReactNode;
}

const NavbarKsr: React.FC<NavbarKsrProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#363636] text-white">
      {/* Sidebar (Navbar) */}
      <aside className="w-64 bg-black flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">The Ivory Plate</h1>
        <nav className="space-y-4">
          <a
            href="#"
            className="block py-2 px-4 rounded hover:bg-gray-700 transition"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block py-2 px-4 rounded hover:bg-gray-700 transition"
          >
            Mode Kasir
          </a>
          <a
            href="#"
            className="block py-2 px-4 rounded hover:bg-gray-700 transition"
          >
            Produk
          </a>
          <a
            href="#"
            className="block py-2 px-4 rounded hover:bg-gray-700 transition"
          >
            Profile
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-black p-4 flex justify-between items-center">
          <h2 className="ml-[850px] text-lg">Today: 18-04-2024</h2>
          <div className=" p-2 rounded-full cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="24"
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
        <main className="flex-1 p-6 rounded-full bg-[#363636]">
          {children} {/* Render children di sini */}
        </main>
      </div>
    </div>
  );
};

export default NavbarKsr;
