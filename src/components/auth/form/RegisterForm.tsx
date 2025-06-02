"use client";

import { useRouter } from "next/navigation";
import { type FormEvent } from "react";

import FormInput from "@/components/auth/form/FormInput";
import Button from "@/components/ui/Button";
import { useForm } from "@/hooks/useForm";
import { useToast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import RouteName from "@/utils/enums/RouteName.enum";

interface RegisterFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const { createUser, isLoading } = useUser();
  const { showErrorToast } = useToast();
  const { form, handleChange } = useForm<RegisterFormInput>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      showErrorToast("Passwords do not match");
      return;
    }

    const user = await createUser({
      name: form.name,
      email: form.email,
      password: form.password,
    });
    if (user) {
      router.push(RouteName.LOGIN);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
        <FormInput
          autoComplete="name"
          id="name"
          isFirst
          label="Name"
          name="name"
          onChange={handleChange}
          placeholder="Name"
          required
          type="text"
          value={form.name}
        />
        <FormInput
          autoComplete="email"
          id="email-address"
          label="Email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          required
          type="email"
          value={form.email}
        />
        <FormInput
          autoComplete="new-password"
          id="password"
          label="Password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          required
          type="password"
          value={form.password}
        />
        <FormInput
          autoComplete="new-password"
          error={form.password !== form.confirmPassword ? "Passwords do not match" : undefined}
          id="confirm-password"
          isLast
          label="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          type="password"
          value={form.confirmPassword}
        />
      </div>

      <Button
        label="Sign Up"
        isLoading={isLoading}
        type="submit"
        fullWidth
      />

      <div className="flex items-center justify-center">
        <a href={RouteName.LOGIN} className="font-medium text-base text-blue-600 hover:text-blue-500 dark:text-blue-400">
          Already have an account? Sign in
        </a>
      </div>
    </form>
  );
}