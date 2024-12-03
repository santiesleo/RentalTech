import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Navbar from "../../components/NavBar";

const GenerateCertificate = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const [form, setForm] = useState({
    delivery_date: "",
    notes: "",
    nit: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    try {
      await axiosInstance.post(`/contracts/${contractId}/certificates`, form);
      alert("Certificate created successfully");
    } catch (error) {
      console.error("Error creating certificate", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header Section with helpful context */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Generar Certificado
            </h1>
            <p className="text-gray-600">Contrato ID: {contractId}</p>
            <p className="text-gray-500 mt-2 text-sm">
              Complete los detalles del certificado para el contrato
              seleccionado
            </p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Company Information Section */}
                <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Información de la Empresa
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        NIT de la Empresa
                      </label>
                      <input
                        type="text"
                        name="nit"
                        placeholder="Ej: 900.123.456-7"
                        value={form.nit}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Ingrese el NIT de la empresa que recibirá el certificado
                      </p>
                    </div>
                  </div>
                </div>

                {/* Certificate Details Section */}
                <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Detalles del Certificado
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de Entrega
                      </label>
                      <input
                        type="date"
                        name="delivery_date"
                        value={form.delivery_date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Seleccione la fecha en que se entregó el certificado
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notas Adicionales
                      </label>
                      <textarea
                        name="notes"
                        placeholder="Ingrese cualquier observación o detalle importante sobre la entrega..."
                        value={form.notes}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                        rows={4}
                      ></textarea>
                      <p className="mt-1 text-sm text-gray-500">
                        Incluya cualquier información relevante sobre la entrega
                        o el certificado
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
                  >
                    Generar Certificado
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Asegúrese de verificar toda la información antes de generar el
              certificado
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateCertificate;
