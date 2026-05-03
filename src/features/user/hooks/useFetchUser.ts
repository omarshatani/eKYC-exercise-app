import { useState } from "react";
import UserServiceImpl from "@/features/user/api/UserService";
import type { User } from "@/features/user/api/models/User";
import { withAuthRetry } from "@/util/withAuthRetry";

const useFetchUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async (): Promise<User | undefined> => {
    setIsLoading(true);
    let result: User | undefined;

    try {
      await withAuthRetry({
        fn: async (accessToken) => {
          result = await UserServiceImpl().apiMe(accessToken);
        },
      });
    } finally {
      setIsLoading(false);
    }

    return result;
  };

  return { fetchUser, isLoading };
};

export default useFetchUser;
