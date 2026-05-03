import { useAuthStore } from "../authStore";

const useIsSignedIn = (): boolean => {
  const status = useAuthStore((state) => state.status);
  return status === "logged_in" || status === "refreshing";
};

export default useIsSignedIn;
