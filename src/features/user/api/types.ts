import { User } from "@/features/user/api/models/User";

interface UserService {
  apiMe: (accessToken: string) => Promise<User>;
}

export { UserService };
