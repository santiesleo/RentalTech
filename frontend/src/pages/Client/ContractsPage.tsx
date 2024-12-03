import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import Navbar from "../../components/NavBar";

const ContractsPage = () => {
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContracts = async () => {
      setLoading(true);
      setError(null);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;

      try {
        const { data } = await axiosInstance.get("/contracts");
        setContracts(data);
      } catch (error) {
        console.error("Error fetching contracts", error);
        setError(
          "No se pudieron cargar los contratos. Por favor, intente nuevamente."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl p-6">
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
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
          <div className="max-w-4xl mx-auto text-center">
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
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Mis Contratos
            </h1>
            <p className="text-gray-600">
              Gestione sus contratos activos e históricos
            </p>
          </div>

          {/* Contracts List */}
          <div className="space-y-6">
            {contracts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="mb-4">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No hay contratos disponibles
                </h3>
                <p className="text-gray-500">
                  No se encontraron contratos asociados a su cuenta.
                </p>
              </div>
            ) : (
              contracts.map((contract) => (
                <div
                  key={contract.contract_id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                          Contrato #{contract.contract_number}
                        </h2>
                        <div className="space-y-2">
                          <p className="text-gray-600">
                            <span className="font-medium">
                              Fecha de Inicio:
                            </span>{" "}
                            {new Date(contract.start_date).toLocaleDateString(
                              "es-CO",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">
                              Fecha de Finalización:
                            </span>{" "}
                            {new Date(contract.end_date).toLocaleDateString(
                              "es-CO",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {new Date(contract.end_date) > new Date() ? (
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                            Activo
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                            Finalizado
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-6">
                      <a
                        href={`/contract/${contract.contract_id}`}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        Ver Detalles
                      </a>
                      <a
                        href={`/contract/${contract.contract_id}/certificates`}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 ease-in-out"
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
                        Certificados
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Para solicitar un nuevo contrato, contacte con su asesor comercial
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractsPage;
