"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import Input from "@/components/forms/Input"
import RouteName from "@/utils/enums/RouteName.enum"

export default function Register() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    // TODO: Implementar la lógica de registro
    console.log({ name, email, password })
    router.push(RouteName.HOME)
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
        <Input
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
        <Input
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
        <Input
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
        <Input
          autoComplete="new-password"
          error={error}
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
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Registrarse
      </button>

      <div className="flex items-center justify-end">
        <a href={RouteName.LOGIN} className="font-medium text-base text-blue-600 hover:text-blue-500 dark:text-blue-400">
          ¿Ya tienes una cuenta? Inicia sesión
        </a>
      </div>
    </form>
  )
}