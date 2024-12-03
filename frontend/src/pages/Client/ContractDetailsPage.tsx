import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Navbar from "../../components/NavBar";

const ContractDetailsPage = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContractDetails = async () => {
      setLoading(true);
      setError(null);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;

      try {
        const { data } = await axiosInstance.get(`/contracts/${contractId}`);
        setContract(data);
      } catch (error) {
        console.error("Error fetching contract details", error);
        setError(
          "No se pudieron cargar los detalles del contrato. Por favor, intente nuevamente."
        );
      } finally {
        setLoading(false);
      }
    };

    if (contractId) fetchContractDetails();
  }, [contractId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-8"></div>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-red-500 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Error al Cargar
              </h2>
              <p className="text-gray-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Detalles del Contrato
            </h1>
            <p className="text-gray-600">
              Contrato #{contract.contract_number}
            </p>
          </div>

          {/* Contract Details Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Status Banner */}
            <div className="bg-green-50 border-b border-green-100 px-8 py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Contrato Activo
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Contract Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Número de Contrato
                    </h3>
                    <p className="mt-2 text-lg font-medium text-gray-900">
                      {contract.contract_number}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">NIT</h3>
                    <p className="mt-2 text-lg font-medium text-gray-900">
                      {contract.nit}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Valor Mensual
                    </h3>
                    <p className="mt-2 text-lg font-medium text-gray-900">
                      ${contract.monthly_value.toLocaleString("es-CO")}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Fecha de Inicio
                    </h3>
                    <p className="mt-2 text-lg font-medium text-gray-900">
                      {new Date(contract.start_date).toLocaleDateString(
                        "es-CO",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Fecha de Finalización
                    </h3>
                    <p className="mt-2 text-lg font-medium text-gray-900">
                      {new Date(contract.end_date).toLocaleDateString("es-CO", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Duración
                    </h3>
                    <p className="mt-2 text-lg font-medium text-gray-900">
                      {Math.ceil(
                        (new Date(contract.end_date).getTime() -
                          new Date(contract.start_date).getTime()) /
                          (1000 * 60 * 60 * 24 * 30)
                      )}{" "}
                      meses
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`/contract/${contractId}/certificates`}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Ver Certificados
                  </a>
                  <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Descargar Contrato
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Para cualquier consulta sobre este contrato, contacte a su asesor
              comercial
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractDetailsPage;
