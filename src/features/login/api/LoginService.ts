import type { LoginService } from "@/features/login/api/types";

const LoginServiceImpl = (): LoginService => ({
  apiLogin: async (email, _password) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (email !== "jane.doe@example.com" || _password !== "test") {
      const error = new Error("Invalid credentials");
      (error as any).status = 401;
      throw error;
    }

    if (Math.random() < 0.1) {
      // 500 - random transient error
      const error = new Error("Internal server error");
      (error as any).status = 500;
      throw error;
    }

    return {
      user: {
        id: "USR-001",
        email: "jane.doe@example.com",
        fullName: "Jane Doe",
      },
      session: {
        accessToken: "access_" + Math.random().toString(36).substring(2, 14),
        refreshToken: "refresh_" + Math.random().toString(36).substring(2, 14),
        expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
      },
    };
  },

  apiRefresh: async (refreshToken) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 500 - random transient error
    if (Math.random() < 0.1) {
      const error = new Error("Internal server error");
      (error as any).status = 500;
      throw error;
    }

    return {
      accessToken: "access_" + Math.random().toString(36).substring(2, 14),
      refreshToken,
      expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
    };
  },
});

export default LoginServiceImpl;
