"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import FormInput from "@/components/auth/form/FormInput";
import Button from "@/components/ui/Button";
import { useToast } from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import RouteName from "@/utils/enums/RouteName.enum";

export default function RegisterForm() {
  const router = useRouter();
  const { createUser, isLoading } = useUser();
  const { showErrorToast } = useToast();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showErrorToast("Passwords do not match");
      return;
    }

    const user = await createUser({ name, email, password });
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
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          type="text"
          value={name}
        />
        <FormInput
          autoComplete="email"
          id="email-address"
          label="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          type="email"
          value={email}
        />
        <FormInput
          autoComplete="new-password"
          id="password"
          label="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          type="password"
          value={password}
        />
        <FormInput
          autoComplete="new-password"
          error={password !== confirmPassword ? "Passwords do not match" : undefined}
          id="confirm-password"
          isLast
          label="Confirm Password"
          name="confirm-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          type="password"
          value={confirmPassword}
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