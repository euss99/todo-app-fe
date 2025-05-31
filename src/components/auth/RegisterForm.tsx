"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import FormInput from "@/components/auth/FormInput";
import { useUser } from "@/hooks/useUser";
import RouteName from "@/utils/enums/RouteName.enum";

export default function RegisterForm() {
  const router = useRouter();
  const { createUser, isLoading, error } = useUser();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Las contraseñas no coinciden");
      return;
    }

    try {
      await createUser({ name, email, password });
      router.push(RouteName.LOGIN);
    } catch (error) {
      console.log(error);
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
          autoComplete="name"
          id="name"
          isFirst
          label="Nombre completo"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre completo"
          required
          type="text"
          value={name}
        />
        <FormInput
          autoComplete="email"
          id="email-address"
          label="Correo electrónico"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
          type="email"
          value={email}
        />
        <FormInput
          autoComplete="new-password"
          id="password"
          label="Contraseña"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          type="password"
          value={password}
        />
        <FormInput
          autoComplete="new-password"
          error={password !== confirmPassword ? "Las contraseñas no coinciden" : undefined}
          id="confirm-password"
          isLast
          label="Confirmar contraseña"
          name="confirm-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmar contraseña"
          required
          type="password"
          value={confirmPassword}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Registrando..." : "Registrarse"}
      </button>

      <div className="flex items-center justify-center">
        <a href={RouteName.LOGIN} className="font-medium text-base text-blue-600 hover:text-blue-500 dark:text-blue-400">
          ¿Ya tienes una cuenta? Inicia sesión
        </a>
      </div>
    </form>
  );
}