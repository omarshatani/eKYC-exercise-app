import { useAuthStore } from "@/store/authentication/authStore";

const withAuthRetry = async <T>({
  fn,
}: {
  fn: (accessToken: string) => Promise<T>;
}) => {
  const { session, logout, refreshSession, setError } = useAuthStore.getState();

  if (!session) {
    setError("session_expired");
    logout();
    return;
  }

  try {
    await fn(session.accessToken);
  } catch (error) {
    if ((error as any).status === 401) {
      await refreshSession();
      const newSession = useAuthStore.getState().session;
      await fn(newSession!.accessToken);
    } else {
      setError("session_expired");
      logout();
    }
  }
};

export { withAuthRetry };
