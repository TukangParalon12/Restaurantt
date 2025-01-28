import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      password: { value: string };
    };

    const name = target.name.value.trim();
    const password = target.password.value.trim();

    if (!name || !password) {
      setErrorMessage("Nama dan kata sandi tidak boleh kosong.");
      return;
    }

    try {
      setLoading(true); // Set state loading
      setErrorMessage(""); // Reset pesan error

      const response = await axios.post(
        "https://bg8tgnl0-3001.asse.devtunnels.ms/users/login",
        { name, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login berhasil:", response.data);
      const { token, role } = response.data;

      // Simpan token ke localStorage
      localStorage.setItem("authToken", token);

      // Arahkan ke halaman sesuai role
      if (role === "admin") {
        navigate("/owner");
      } else if (role === "kasir") {
        navigate("/kasir");
      } else if (role === "gudang") {
        navigate("/gudang");
      } else {
        alert("Peran tidak dikenali. Hubungi admin.");
      }
    } catch (error: unknown) {
      console.error("Login gagal:", error);

      // Gunakan pemeriksaan tipe untuk menangani error
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error === "password failed") {
          setErrorMessage("Kata sandi Anda salah.");
        } else if (error.response?.data?.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Terjadi kesalahan pada server.");
        }
      } else {
        setErrorMessage("Kesalahan jaringan. Periksa koneksi Anda.");
      }
    } finally {
      setLoading(false); // Matikan state loading
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#111315]">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Login</h1>
      <form className="mt-6 space-y-6" onSubmit={handleLogin}>
        <div>
          <label
            htmlFor="name"
            className="block text-xl font-medium text-white"
          >
            Nama:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-[500px] h-[50px] px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Masukkan nama Anda"
            required
          />
        </div>
        <div className="relative">
          <label
            htmlFor="password"
            className="block text-xl font-medium text-white"
          >
            Kata Sandi:
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="w-[500px] h-[50px] px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Masukkan kata sandi Anda"
            required
          />
          <div
            className="absolute top-3/4 right-4 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiFillEyeInvisible size={24} color="gray" />
            ) : (
              <AiFillEye size={24} color="gray" />
            )}
          </div>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-center text-sm">{errorMessage}</p>
        )}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[100px] px-4 py-2 text-black hover:text-white font-bold bg-[#37CAE4] rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          >
            {loading ? "Loading..." : "Masuk"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
