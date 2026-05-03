import type { OnboardingDraft } from "./models/OnboardingDraft";
import type { SubmissionResult } from "./models/SubmissionResult";

export type { DocumentType } from "./models/OnboardingDocument";
export type { OnboardingProfile } from "./models/OnboardingProfile";
export type { OnboardingDocument } from "./models/OnboardingDocument";
export type { OnboardingSelfie } from "./models/OnboardingSelfie";
export type { OnboardingAddress } from "./models/OnboardingAddress";
export type { OnboardingConsents } from "./models/OnboardingConsents";
export type { OnboardingDraft } from "./models/OnboardingDraft";
export type {
  SubmissionStatus,
  SubmissionResult,
} from "./models/SubmissionResult";

interface OnboardingService {
  apiSubmit: (
    accessToken: string,
    draft: OnboardingDraft,
  ) => Promise<SubmissionResult>;
}

export { OnboardingService };
