import type { Session } from "./Session";
import type { User } from "@/features/user/api/models/User";

export interface LoginResponse {
  user: User;
  session: Session;
}
