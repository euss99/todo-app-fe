"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

import { useAuthStore } from "@/store/authStore";
import RouteName from "@/utils/enums/RouteName.enum";

interface AuthGuardProps {
  children: ReactNode;
}

const PUBLIC_ROUTES = [RouteName.LOGIN, RouteName.REGISTER];
const PROTECTED_ROUTES = [RouteName.HOME];

export default function Guard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { token } = useAuthStore();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname as RouteName);
    const isProtectedRoute = PROTECTED_ROUTES.includes(pathname as RouteName);

    if (isProtectedRoute && !storedToken) {
      router.replace(RouteName.LOGIN);
    } else if (isPublicRoute && storedToken) {
      router.replace(RouteName.HOME);
    } else {
      setCheckingAuth(false);
    }
  }, [pathname, token, router]);

  if (checkingAuth) {
    return null;
  }

  return <>{children}</>;
}