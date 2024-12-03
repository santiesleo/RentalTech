import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Navbar from "../../components/NavBar";

const ReviewRequest = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const [request, setRequest] = useState<any>(null);

  useEffect(() => {
    const fetchRequest = async () => {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;

      try {
        const { data } = await axiosInstance.get(
          `/catalog/rental-requests/${requestId}`
        );
        setRequest(data);
      } catch (error) {
        console.error("Error fetching rental request", error);
      }
    };

    if (requestId) fetchRequest();
  }, [requestId]);

  const handleApproval = async () => {
    try {
      await axiosInstance.patch(
        `/catalog/rental-requests/${requestId}?status=approved`
      );
      alert("Request approved");
    } catch (error) {
      console.error("Error approving request", error);
    }
  };

  if (!request) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center">
        <div className="animate-pulse text-lg text-gray-600 font-medium">
          Cargando detalles de la solicitud...
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Revisar Solicitud
            </h1>
            <p className="text-gray-600">ID de Solicitud: {requestId}</p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-8 py-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Detalles de la Solicitud
              </h2>
            </div>

            <div className="p-8">
              {/* Request Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {Object.entries(request).map(([key, value]: [string, any]) => (
                  <div key={key} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-500 capitalize">
                      {key.replace(/_/g, " ")}
                    </label>
                    <p className="text-gray-900 bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-200">
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : String(value)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Raw Data Section */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Datos Completos
                </h3>
                <div className="bg-gray-50 rounded-xl p-6 overflow-x-auto">
                  <pre className="text-sm font-mono text-gray-700 whitespace-pre-wrap">
                    {JSON.stringify(request, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-end space-x-4 border-t border-gray-200 pt-6">
                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Volver
                </button>
                <button
                  onClick={handleApproval}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md font-medium"
                >
                  Aprobar Solicitud
                </button>
              </div>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Revise cuidadosamente todos los detalles antes de aprobar la
              solicitud
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewRequest;
