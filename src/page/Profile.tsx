import React from "react";

const ProfilePage: React.FC = () => {
  const handleLogout = () => {
    // Tambahkan logika untuk logout
    console.log("Keluar...");
    // Contoh: redirect ke halaman login
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#111315] text-white">
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full border-2 border-white flex items-center justify-center">
          {/* Ikon Avatar */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 18.75a6 6 0 00-6-6H9a6 6 0 00-6 6"
            />
          </svg>
        </div>

        {/* Nomor Telepon */}
        <p className="mt-4 text-lg font-medium">2928329083</p>

        {/* Nama Pengguna */}
        <p className="mt-2 text-2xl font-bold">Nama Owner</p>
      </div>

      {/* Tombol Keluar */}
      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="px-6 py-2 text-black font-bold bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Keluar
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
