"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import FormInput from "@/components/auth/FormInput";
import { useAuth } from "@/hooks/useAuth";
import RouteName from "@/utils/enums/RouteName.enum";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      router.push(RouteName.HOME);
    } catch (error) {
      setError("Credenciales inválidas. Por favor, intenta de nuevo.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}
      <div className="rounded-md shadow-sm -space-y-px">
        <FormInput
          autoComplete="email"
          id="email-address"
          isFirst
          label="Correo electrónico"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
          type="email"
          value={email}
        />
        <FormInput
          autoComplete="current-password"
          id="password"
          isLast
          label="Contraseña"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          type="password"
          value={password}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
      </button>

      <div className="flex items-center justify-end">
        <a href={RouteName.REGISTER} className="font-medium text-base text-blue-600 hover:text-blue-500 dark:text-blue-400">
          Regístrate si aún no tienes una cuenta
        </a>
      </div>
    </form>
  );
}