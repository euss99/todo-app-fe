"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import FormInput from "@/components/auth/FormInput";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import RouteName from "@/utils/enums/RouteName.enum";

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const auth = await login(email, password);
    if (auth) {
      router.push(RouteName.HOME);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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

      <Button
        label="Iniciar sesión"
        isLoading={isLoading}
        type="submit"
        fullWidth
      />

      <div className="flex items-center justify-center">
        <a href={RouteName.REGISTER} className="font-medium text-base text-blue-600 hover:text-blue-500 dark:text-blue-400">
          ¿No tienes una cuenta? Regístrate
        </a>
      </div>
    </form>
  );
}