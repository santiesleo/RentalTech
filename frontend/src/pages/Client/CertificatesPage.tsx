import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Navbar from "../../components/NavBar";

const CertificatesPage = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      setError(null);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;

      try {
        const { data } = await axiosInstance.get(
          `/contracts/${contractId}/certificates`
        );
        setCertificates(data);
      } catch (error) {
        console.error("Error fetching certificates", error);
        setError(
          "No se pudieron cargar los certificados. Por favor, intente nuevamente."
        );
      } finally {
        setLoading(false);
      }
    };

    if (contractId) fetchCertificates();
  }, [contractId]);

  // Loading state with skeleton animation
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
              <div className="animate-pulse flex flex-col space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="space-y-6 py-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border rounded-lg p-6 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Error state
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
              Certificados de Entrega
            </h1>
            <p className="text-gray-600">Contrato ID: {contractId}</p>
          </div>

          {/* Certificates List */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              {certificates.length === 0 ? (
                <div className="text-center py-12">
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
                    No hay certificados disponibles
                  </h3>
                  <p className="text-gray-500">
                    Aún no se han generado certificados para este contrato.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {certificates.map((certificate) => (
                    <div
                      key={certificate.certificate_id}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 space-y-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Certificado #{certificate.certificate_id}
                          </h3>
                          <div className="space-y-2">
                            <p className="text-gray-600">
                              <span className="font-medium">
                                Fecha de Entrega:
                              </span>{" "}
                              {new Date(
                                certificate.delivery_date
                              ).toLocaleDateString("es-CO", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-medium">Notas:</span>{" "}
                              {certificate.notes || "Sin notas adicionales"}
                            </p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 transition-colors">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
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
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Los certificados muestran el historial de entregas realizadas para
              este contrato
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificatesPage;
