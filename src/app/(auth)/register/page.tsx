import type { Metadata } from "next";

import RegisterForm from "@/components/auth/form/RegisterForm";

export const metadata: Metadata = {
  title: "Register - Todo App",
  description: "Create a new Todo App account",
};

export default function RegisterPage() {
  return (
    <div className="max-w-md w-full space-y-8">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        Create an account
      </h2>
      <RegisterForm />
    </div>
  );
}