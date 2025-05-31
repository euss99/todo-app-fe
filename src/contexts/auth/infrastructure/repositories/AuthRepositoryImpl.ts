import { AuthResponse, User } from "@/contexts/auth/domain/entities/AuthResponse";
import { AuthRepository } from "@/contexts/auth/domain/repositories/AuthRepository";

export class AuthRepositoryImpl implements AuthRepository {
  private readonly TOKEN_KEY = "auth_token";

  async login(email: string, password: string): Promise<AuthResponse> {
    // Aquí deberías hacer la llamada a tu API real
    // Por ahora, simularemos la respuesta
    const mockResponse: AuthResponse = {
      user: {
        id: "0ef22fa1-c10c-4178-a04c-a7686973b432",
        name: "Nombre Usuario",
        email: email,
        createdAt: new Date().toISOString()
      },
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGV4YW1wbGUuY29tIiwic3ViIjoiMGVmMjJmYTEtYzEwYy00MTc4LWEwNGMtYTc2ODY5NzNiNDMyIiwiaWF0IjoxNzQ4NjY4OTIwLCJleHAiOjE3NDg3NTUzMjB9.2CifplTs75zc7FUxXuTJgvlylin6QNKV7a93HcEkTO8"
    };

    console.log("Login response:", mockResponse);

    // Guardar el token en localStorage
    localStorage.setItem(this.TOKEN_KEY, mockResponse.token);

    return mockResponse;
  }

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) {
      console.log("No token found");
      return null;
    }

    try {
      // Aquí deberías hacer la llamada a tu API real para validar el token y obtener los datos del usuario
      // Por ahora, simularemos la respuesta
      const mockUser: User = {
        id: "0ef22fa1-c10c-4178-a04c-a7686973b432",
        name: "Nombre Usuario",
        email: "email@example.com",
        createdAt: new Date().toISOString()
      };

      console.log("getCurrentUser response:", mockUser);
      return mockUser;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}