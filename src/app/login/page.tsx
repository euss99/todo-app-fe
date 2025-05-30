import type { Metadata } from "next"

import LoginForm from "@/components/LoginForm"

export const metadata: Metadata = {
  title: "Login - Todo App",
  description: "Inicia sesión en tu cuenta de Todo App",
}

export default function LoginPage() {
  return <LoginForm />
}