import { ApolloError } from "@apollo/client";
import { AxiosError } from "axios";
import { useCallback } from "react";
import { toast, type ToastPosition } from "react-toastify";

interface GraphQLErrorExtensions {
  originalError?: {
    message: string[];
  };
}

const TOAST_CONFIG = {
  autoClose: 2000, // 2 segundos
  position: "top-right" as ToastPosition,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message;
  }

  if (error instanceof ApolloError) {
    const extensions = error.graphQLErrors?.[0]?.extensions as GraphQLErrorExtensions | undefined;
    return extensions?.originalError?.message?.[0]
         || error.graphQLErrors?.[0]?.message
         || error.message
         || "Error al procesar la solicitud";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Error al procesar la solicitud";
};

export function useToast() {
  const showErrorToast = useCallback((error: unknown) => {
    const message = getErrorMessage(error);
    toast.error(message, TOAST_CONFIG);
  }, []);

  const showSuccessToast = useCallback((message: string) => {
    toast.success(message, TOAST_CONFIG);
  }, []);

  return {
    showErrorToast,
    showSuccessToast
  };
}