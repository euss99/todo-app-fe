import type { Metadata } from "next";

import LoginForm from "@/components/auth/form/LoginForm";

export const metadata: Metadata = {
  title: "Login - Todo App",
  description: "Sign in to your Todo App account",
};

export default function LoginPage() {
  return (
    <div className="max-w-md w-full space-y-8">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        Sign in
      </h2>
      <LoginForm />
    </div>
  );
}