import type { LoginResponse } from "./models/LoginResponse";
import type { Session } from "./models/Session";

interface LoginService {
  apiLogin: (email: string, password: string) => Promise<LoginResponse>;
  apiRefresh: (refreshToken: string) => Promise<Session>;
}

export { LoginService };
