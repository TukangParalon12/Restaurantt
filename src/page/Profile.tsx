import axios from "axios";
import React, { useEffect, useState } from "react";

const ProfilePage: React.FC = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    id: "",
    role: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token not found. Please login.");
      setLoading(false);
      return;
    }
    axios
      .get("https://bg8tgnl0-3001.asse.devtunnels.ms/users/show_data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData({
          name: response.data.data.name,
          id: response.data.data.id,
          role: response.data.data.role,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[100%] bg-[#111315] text-white">
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
        <p className="mt-4 text-md font-medium">
          {userData.id}/{userData.role}
        </p>

        {/* Nama Pengguna */}
        <p className="mt-2 text-2xl font-bold">{userData.name}</p>
      </div>

      {/* Tombol Keluar */}
      <div className="absolute bottom-8 right-8 ">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.assign("/");
          }}
          className="px-6 py-2 text-black font-bold bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Keluar
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
