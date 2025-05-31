import type { Metadata } from "next";

import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login - Todo App",
  description: "Inicia sesión en tu cuenta de Todo App",
};

export default function LoginPage() {
  return (
    <div className="max-w-md w-full space-y-8">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        Inicia sesión
      </h2>
      <LoginForm />
    </div>
  );
}