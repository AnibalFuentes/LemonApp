"use client";

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Sumary = () => {
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Para manejar errores de validación

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  // Validación básica para el teléfono y la dirección
  const validateInputs = () => {
    if (!phone || !address) {
      setError("Phone and address are required.");
      return false;
    }
    if (!/^\d+$/.test(phone)) {
      setError("Phone number must be valid.");
      return false;
    }
    setError(null); // Resetear el error
    return true;
  };

  const onCheckout = async () => {
    if (!validateInputs()) return;

    setLoading(true);

    // Agregar un log para verificar los productIds
    console.log(
      "Product IDs being sent:",
      items.map((item) => item.id)
    );

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`, // Asegúrate de que la URL sea correcta
        {
          productIds: items.map((item) => item.id), // Asegúrate de que estos ids son correctos
          phone: phone,
          address: address,
        }
      );
      toast.success("Checkout successful!");
      console.log("Order ID:", response.data.orderId);
      removeAll();
      setPhone(""); // Limpiar campos después de un checkout exitoso
      setAddress("");
    } catch (error) {
      toast.error("Something went wrong during checkout.");
      console.error("Checkout failed:", error);
    } finally {
      setLoading(false); // Resetear estado de carga
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order Total</div>
          <Currency value={totalPrice} />
        </div>
      </div>

      {/* Input para teléfono */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>

      {/* Input para dirección */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
        />
      </div>

      {/* Mensaje de error */}
      {error && <div className="text-sm text-red-500 mt-2">{error}</div>}

      {/* Botón de checkout */}
      <Button
        onClick={onCheckout}
        className="w-full rounded-full mt-6"
        disabled={loading}
      >
        {loading ? "Processing..." : "Checkout"}
      </Button>
    </div>
  );
};

export default Sumary;
