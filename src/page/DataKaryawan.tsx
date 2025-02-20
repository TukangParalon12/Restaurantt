import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaTrash, FaPlus } from "react-icons/fa";

interface Employee {
  id: number;
  name: string;
  role: string;
  isActive: boolean;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get<{ data: Employee[] }>(
          "https://nrmlm6dh-3001.asse.devtunnels.ms/users/show_data_karyawan"
        );

        // Pastikan data sesuai dengan Employee
        const employeeData: Employee[] = response.data.data.map((employee) => ({
          id: employee.id,
          name: employee.name,
          role: employee.role || "Tidak diketahui",
          isActive: employee.isActive,
        }));

        setEmployees(employeeData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
        setError("Gagal mengambil data karyawan");
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus karyawan ini?")) {
      setEmployees((prevEmployees) => prevEmployees.filter((e) => e.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#111315] text-white flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Data Karyawan</h1>

      {loading ? (
        <p className="text-gray-400">Memuat data...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <div className="space-y-4 w-full max-w-3xl">
          {employees.length > 0 ? (
            employees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center justify-between p-4 bg-white text-black rounded-lg shadow-md w-full"
              >
                {/* Kiri: Ikon User & Info */}
                <div className="flex items-center space-x-3">
                  <FaUser className="text-2xl" />
                  <div>
                    <p className="font-semibold">Nama: {employee.name}</p>
                    <p className="text-sm text-gray-600">{employee.role}</p>
                  </div>
                </div>

                {/* Kanan: Status & Tombol Hapus */}
                <div className="flex items-center space-x-3">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      employee.isActive ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Hapus Karyawan"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">Tidak ada data karyawan.</p>
          )}
        </div>
      )}

      {/* Floating Add Button */}
      <button
        className="fixed bottom-6 right-6 bg-[#5BC0DE] p-4 rounded-full shadow-lg hover:bg-[#48A9C5] transition"
        title="Tambah Karyawan"
        aria-label="Tambah Karyawan"
      >
        <FaPlus className="text-white text-lg" />
      </button>
    </div>
  );
};

export default EmployeeList;
