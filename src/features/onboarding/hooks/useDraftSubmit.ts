import { useState } from "react";
import OnboardingServiceImpl from "@/features/onboarding/api/OnboardingService";
import type { SubmissionResult } from "@/features/onboarding/api/models/SubmissionResult";
import type { OnboardingDraft } from "@/features/onboarding/api/models/OnboardingDraft";
import { withAuthRetry } from "@/util/withAuthRetry";

type FieldError = { field: string; message: string };

const useDraftSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState<FieldError[]>([]);

  const submit = async (
    draft: OnboardingDraft,
  ): Promise<SubmissionResult | undefined> => {
    setIsLoading(true);
    setApiErrors([]);

    let result: SubmissionResult | undefined;

    try {
      await withAuthRetry({
        fn: async (accessToken) => {
          try {
            result = await OnboardingServiceImpl().apiSubmit(
              accessToken,
              draft,
            );
          } catch (err: unknown) {
            const status = (err as any)?.status;

            if (status === 422) {
              // Validation errors from the server — capture and surface to the UI
              setApiErrors((err as any)?.errors ?? []);
              return;
            }

            // Re-throw 401 so withAuthRetry can refresh the token and retry.
            // 500 is re-thrown so withAuthRetry's outer catch handles it.
            throw err;
          }
        },
      });
    } finally {
      setIsLoading(false);
    }

    return result;
  };

  return { submit, isLoading, apiErrors };
};

export default useDraftSubmit;
