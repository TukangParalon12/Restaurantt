import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#111315]">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Login</h1>
      <form
        className="mt-6 space-y-6"
        ref={formRef}
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            name: { value: string };
            password: { value: string };
          };
          const name = target.name.value;
          const password = target.password.value;

          axios
            .post(
              "https://bg8tgnl0-3001.asse.devtunnels.ms/users/login",
              { name, password },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((response) => {
              console.log("Login Page Rendered");

              console.log("Login berhasil:", response.data);
              const { token, role } = response.data;

              // Simpan token ke localStorage
              localStorage.setItem("token", token);

              // Arahkan ke dashboard sesuai role
              if (role === "admin") {
                navigate("/owner");
              } else if (role === "kasir") {
                navigate("/kasir");
              } else if (role === "gudang") {
                navigate("/gudang");
              } else {
                alert("Peran tidak dikenali. Hubungi admin.");
              }
            })
            .catch((error) => {
              console.error(
                "Login gagal:",
                error.response?.data || error.message
              );

              // Cek apakah error karena nama atau password salah
              if (error.response?.data?.error === "name or password failed") {
                alert("Nama atau kata sandi Anda salah.");
              } else {
                alert(
                  error.response?.data?.message ||
                    "Terjadi kesalahan saat login."
                );
              }
            });
        }}
      >
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
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[100px] px-4 py-2 text-black hover:text-white font-bold bg-[#37CAE4] rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Masuk
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
