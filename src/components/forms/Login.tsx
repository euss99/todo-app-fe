"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import Input from "@/components/forms/Input"
import RouteName from "@/utils/enums/RouteName.enum"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementar la lógica de login
    console.log({ email, password })
    router.push(RouteName.HOME)
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
        <Input
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
        <Input
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
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Iniciar sesión
      </button>

      <div className="flex items-center justify-end">
        <a href={RouteName.REGISTER} className="font-medium text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
          Regístrate si aún no tienes una cuenta
        </a>
      </div>
    </form>
  )
}