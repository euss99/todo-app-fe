import { ApolloError } from "@apollo/client";

interface GraphQLErrorExtensions {
  originalError?: {
    message: string[];
  };
}

export const extractGraphQLErrorMessage = (error: unknown): string => {
  if (!(error instanceof ApolloError)) {
    return "Error al procesar la solicitud";
  }

  const extensions = error.graphQLErrors?.[0]?.extensions as GraphQLErrorExtensions | undefined;
  return extensions?.originalError?.message?.[0] ||
         error.graphQLErrors?.[0]?.message ||
         error.message ||
         "Error al procesar la solicitud";
};