import type { OnboardingDraft } from "./models/OnboardingDraft";
import type { SubmissionResult } from "./models/SubmissionResult";

interface OnboardingService {
  apiSubmit: (
    accessToken: string,
    draft: OnboardingDraft,
  ) => Promise<SubmissionResult>;
}

export { OnboardingService };
