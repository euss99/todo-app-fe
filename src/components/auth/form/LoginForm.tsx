"use client";

import { useRouter } from "next/navigation";
import { type FormEvent } from "react";

import FormInput from "@/components/auth/form/FormInput";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import RouteName from "@/utils/enums/RouteName.enum";

interface LoginFormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const { form, handleChange } = useForm<LoginFormInput>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const auth = await login(form.email, form.password);
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
          label="Email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          required
          type="email"
          value={form.email}
        />
        <FormInput
          autoComplete="current-password"
          id="password"
          isLast
          label="Password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          required
          type="password"
          value={form.password}
        />
      </div>

      <Button
        label="Sign In"
        isLoading={isLoading}
        type="submit"
        fullWidth
      />

      <div className="flex items-center justify-center">
        <a href={RouteName.REGISTER} className="font-medium text-base text-blue-600 hover:text-blue-500 dark:text-blue-400">
          Don&apos;t have an account? Sign up
        </a>
      </div>
    </form>
  );
}