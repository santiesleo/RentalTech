import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { token, setToken } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  // Función para determinar si una ruta está activa
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Función para determinar si una ruta comienza con cierto path
  const startsWith = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y navegación principal */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                Sistema GC
              </Link>
            </div>

            {/* Enlaces de navegación - Visible en desktop */}
            {token && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className={`${
                    isActive("/")
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Inicio
                </Link>

                <Link
                  to="/products"
                  className={`${
                    isActive("/products")
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Catálogo
                </Link>

                <Link
                  to="/contracts"
                  className={`${
                    startsWith("/contract")
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Contratos
                </Link>

                <Link
                  to="/rental-request"
                  className={`${
                    isActive("/rental-request")
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Nueva Solicitud
                </Link>
              </div>
            )}
          </div>

          {/* Botones de autenticación */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {token ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Botón de menú móvil */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Abrir menú principal</span>
              {/* Icono de menú */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icono de cerrar */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`}>
        {token ? (
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`${
                isActive("/")
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Inicio
            </Link>
            <Link
              to="/products"
              className={`${
                isActive("/products")
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Catálogo
            </Link>
            <Link
              to="/contracts"
              className={`${
                startsWith("/contract")
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Contratos
            </Link>
            <Link
              to="/rental-request"
              className={`${
                isActive("/rental-request")
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Nueva Solicitud
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/login"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
