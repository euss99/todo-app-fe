import { ApolloError } from "@apollo/client";
import { AxiosError } from "axios";
import { useCallback } from "react";
import { toast } from "react-toastify";

interface GraphQLErrorExtensions {
  originalError?: {
    message: string[];
  };
}

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
    toast.error(message);
  }, []);

  const showSuccessToast = useCallback((message: string) => {
    toast.success(message);
  }, []);

  return {
    showErrorToast,
    showSuccessToast
  };
}