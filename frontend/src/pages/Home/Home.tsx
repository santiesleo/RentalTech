import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { token } = useAuthContext();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sistema de Gestión de Contratos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gestione sus contratos, certificados y solicitudes de alquiler en un
            solo lugar
          </p>
        </div>

        {/* Main Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Contracts Card */}
          <div
            onClick={() => navigateTo("/contracts")}
            className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300"
          >
            <div className="p-8">
              <div className="h-12 w-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-blue-600"
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
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Mis Contratos
              </h2>
              <p className="text-gray-600">
                Acceda a todos sus contratos activos y históricos, y gestione
                sus certificados
              </p>
              <div className="mt-6 flex items-center text-blue-600 group-hover:translate-x-2 transition-transform duration-300">
                <span className="mr-2">Ver contratos</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Rental Request Card */}
          <div
            onClick={() => navigateTo("/rental-request")}
            className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300"
          >
            <div className="p-8">
              <div className="h-12 w-12 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Nueva Solicitud
              </h2>
              <p className="text-gray-600">
                Cree una nueva solicitud de alquiler para iniciar el proceso de
                contratación
              </p>
              <div className="mt-6 flex items-center text-green-600 group-hover:translate-x-2 transition-transform duration-300">
                <span className="mr-2">Crear solicitud</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Catalog Card */}
          <div
            onClick={() => navigateTo("/products")}
            className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300"
          >
            <div className="p-8">
              <div className="h-12 w-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Catálogo
              </h2>
              <p className="text-gray-600">
                Explore nuestro catálogo completo de productos disponibles para
                alquiler
              </p>
              <div className="mt-6 flex items-center text-purple-600 group-hover:translate-x-2 transition-transform duration-300">
                <span className="mr-2">Ver productos</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Certificates Card */}
          <div
            onClick={() => navigateTo("/certificates")}
            className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300"
          >
            <div className="p-8">
              <div className="h-12 w-12 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Certificados
              </h2>
              <p className="text-gray-600">
                Acceda y gestione todos sus certificados de entrega y servicios
              </p>
              <div className="mt-6 flex items-center text-yellow-600 group-hover:translate-x-2 transition-transform duration-300">
                <span className="mr-2">Ver certificados</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Resumen de Actividad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="text-blue-600 text-sm font-medium">
                Contratos Activos
              </div>
              <div className="mt-2 text-2xl font-bold text-gray-900">12</div>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <div className="text-green-600 text-sm font-medium">
                Solicitudes Pendientes
              </div>
              <div className="mt-2 text-2xl font-bold text-gray-900">3</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <div className="text-purple-600 text-sm font-medium">
                Certificados Emitidos
              </div>
              <div className="mt-2 text-2xl font-bold text-gray-900">45</div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            ¿Necesita ayuda? Contacte a nuestro equipo de soporte
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
