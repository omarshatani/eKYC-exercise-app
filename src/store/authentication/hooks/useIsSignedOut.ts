import { useAuthStore } from "../authStore";

const useIsSignedOut = (): boolean => {
  const status = useAuthStore((state) => state.status);
  return (
    status === "logged_out" || status === "expired" || status === "logging_in"
  );
};

export default useIsSignedOut;
