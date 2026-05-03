import type { UserService } from "@/features/user/api/types";

const UserServiceImpl = (): UserService => ({
  apiMe: async (accessToken) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 401 - access token invalid or missing
    if (!accessToken || accessToken === "") {
      const error = new Error("Invalid access token");
      (error as any).status = 401;
      throw error;
    }

    return {
      id: "USR-001",
      email: "jane.doe@example.com",
      fullName: "Jane Doe",
    };
  },
});

export default UserServiceImpl;
