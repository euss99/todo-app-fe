import type { Metadata } from "next";

import RegisterForm from "@/components/auth/form/RegisterForm";

export const metadata: Metadata = {
  title: "Registro - Todo App",
  description: "Crea una nueva cuenta en Todo App",
};

export default function RegisterPage() {
  return (
    <div className="max-w-md w-full space-y-8">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        Crear una cuenta
      </h2>
      <RegisterForm />
    </div>
  );
}