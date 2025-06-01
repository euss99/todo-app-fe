import { ApolloError } from "@apollo/client";
import { AxiosError } from "axios";
import { useCallback } from "react";
import { toast } from "react-toastify";

interface GraphQLErrorExtensions {
  originalError?: {
    message: string[];
  };
}

export function useError() {
  const showError = useCallback((error: unknown) => {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || error.message);
      return;
    }

    if (error instanceof ApolloError) {
      const extensions = error.graphQLErrors?.[0]?.extensions as GraphQLErrorExtensions | undefined;
      const message = extensions?.originalError?.message?.[0] ||
                     error.graphQLErrors?.[0]?.message ||
                     error.message ||
                     "Error al procesar la solicitud";
      toast.error(message);
      return;
    }

    if (error instanceof Error) {
      toast.error(error.message);
      return;
    }

    toast.error("Error al procesar la solicitud");
  }, []);

  const showSuccess = useCallback((message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
  }, []);

  return {
    showError,
    showSuccess
  };
}