"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import { useTheme } from "@/hooks/useTheme";
import RouteName from "@/utils/enums/RouteName.enum";

export default function NotFound() {
  const router = useRouter();
  const { mounted } = useTheme();

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-bold text-gray-800 dark:text-white">404</h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-800 dark:text-white">
            Page Not Found
          </h2>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
            Sorry, the page you are looking for does not exist.
          </p>
        </div>
        <div className="mt-8">
          <Button
            label="Back to Home"
            onClick={() => router.push(RouteName.HOME)}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}