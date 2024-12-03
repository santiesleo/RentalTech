import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import Navbar from "../../components/NavBar";

const RentalRequestForm = () => {
  const [form, setForm] = useState({
    request_id: `REQ-2024-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`,
    request_date: new Date().toISOString(),
    client_nit: "",
    contact_id: "",
    items: [
      {
        product_id: "",
        quantity: 1,
        rental_period: {
          start_date: "",
          end_date: "",
        },
        price_agreement: 0,
      },
    ],
    notes: "",
    delivery_address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    status: "pending",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const updateNestedState: any = (obj: any, path: string[], value: any) => {
      const [head, ...rest] = path;
      return {
        ...obj,
        [head]: rest.length ? updateNestedState(obj[head], rest, value) : value,
      };
    };

    setForm((prevForm) => updateNestedState(prevForm, name.split("."), value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      ...form,
      request_date: new Date().toISOString(),
      items: Array.isArray(form.items)
        ? form.items.map((item) => ({
            ...item,
            rental_period: {
              start_date:
                item.rental_period.start_date || new Date().toISOString(),
              end_date:
                item.rental_period.end_date ||
                new Date(
                  new Date().setDate(new Date().getDate() + 7)
                ).toISOString(),
            },
          }))
        : [
            {
              product_id: "",
              quantity: 1,
              rental_period: {
                start_date: new Date().toISOString(),
                end_date: new Date(
                  new Date().setDate(new Date().getDate() + 7)
                ).toISOString(),
              },
              price_agreement: 0,
            },
          ],
    };

    try {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;

      const { data } = await axiosInstance.post(
        "/catalog/rental-requests",
        formData
      );
      alert(`Rental Request Created: ID ${data.request_id}`);
    } catch (error: any) {
      console.error("Error creating rental request", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Nueva Solicitud de Alquiler
            </h1>
            <p className="text-gray-600">ID de Solicitud: {form.request_id}</p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Client Information Section */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Información del Cliente
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      NIT Cliente
                    </label>
                    <input
                      type="text"
                      name="client_nit"
                      placeholder="Ej: 900.123.456-7"
                      value={form.client_nit}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      ID Contacto
                    </label>
                    <input
                      type="text"
                      name="contact_id"
                      placeholder="Identificación del contacto"
                      value={form.contact_id}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address Section */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Dirección de Entrega
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Calle
                    </label>
                    <input
                      type="text"
                      name="delivery_address.street"
                      placeholder="Calle / Carrera / Avenida"
                      value={form.delivery_address.street}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      name="delivery_address.city"
                      placeholder="Ciudad"
                      value={form.delivery_address.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Departamento
                    </label>
                    <input
                      type="text"
                      name="delivery_address.state"
                      placeholder="Departamento"
                      value={form.delivery_address.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      name="delivery_address.zip"
                      placeholder="Código Postal"
                      value={form.delivery_address.zip}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                    />
                  </div>
                </div>
              </div>

              {/* Item Details Section */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Detalles del Producto
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      ID Producto
                    </label>
                    <input
                      type="text"
                      name="items.0.product_id"
                      placeholder="Identificador del producto"
                      value={form.items[0].product_id}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Cantidad
                    </label>
                    <input
                      type="number"
                      name="items.0.quantity"
                      min="1"
                      placeholder="Cantidad"
                      value={form.items[0].quantity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Fecha Inicio
                    </label>
                    <input
                      type="date"
                      name="items.0.rental_period.start_date"
                      value={form.items[0].rental_period.start_date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Fecha Fin
                    </label>
                    <input
                      type="date"
                      name="items.0.rental_period.end_date"
                      value={form.items[0].rental_period.end_date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Precio Acordado
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name="items.0.price_agreement"
                        placeholder="0.00"
                        value={form.items[0].price_agreement}
                        onChange={handleChange}
                        className="w-full pl-7 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Notas Adicionales
                </label>
                <textarea
                  name="notes"
                  placeholder="Ingrese cualquier información adicional relevante..."
                  value={form.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                  rows={4}
                ></textarea>
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
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md font-medium"
                >
                  Crear Solicitud
                </button>
              </div>
            </form>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Todos los campos marcados son obligatorios. Si necesita ayuda,
              contacte al soporte.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RentalRequestForm;
