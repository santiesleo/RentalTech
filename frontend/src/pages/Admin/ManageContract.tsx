import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Navbar from "../../components/NavBar";

const ManageContract = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const [form, setForm] = useState({
    contract_number: "",
    nit: "",
    start_date: "",
    end_date: "",
    monthly_value: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    try {
      const { data } = await axiosInstance.post(
        `/contracts/from-request/${requestId}`,
        form
      );
      alert(`Contract Created: ID ${data.contract_id}`);
    } catch (error) {
      console.error("Error creating contract", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Crear Contrato
            </h1>
            <p className="text-gray-600">Solicitud ID: {requestId}</p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contract Number Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Número de Contrato
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="contract_number"
                      placeholder="Ej: CONT-2024-001"
                      value={form.contract_number}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-900"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Ingrese el número único de identificación del contrato
                  </p>
                </div>

                {/* NIT Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    NIT
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="nit"
                      placeholder="Ej: 900.123.456-7"
                      value={form.nit}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-900"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Número de Identificación Tributaria del contratista
                  </p>
                </div>

                {/* Date Range Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Fecha de Inicio
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      value={form.start_date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Fecha de Finalización
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      value={form.end_date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-900"
                    />
                  </div>
                </div>

                {/* Monthly Value Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Valor Mensual
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="monthly_value"
                      placeholder="0.00"
                      value={form.monthly_value}
                      onChange={handleChange}
                      className="w-full pl-7 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-900"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Valor mensual del contrato en pesos colombianos
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
                  >
                    Crear Contrato
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Todos los campos son obligatorios. Si tiene dudas, contacte al
              administrador.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageContract;
