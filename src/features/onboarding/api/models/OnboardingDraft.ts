import type { OnboardingAddress } from "./OnboardingAddress";
import type { OnboardingConsents } from "./OnboardingConsents";
import type { OnboardingDocument } from "./OnboardingDocument";
import type { OnboardingProfile } from "./OnboardingProfile";
import type { OnboardingSelfie } from "./OnboardingSelfie";

export interface OnboardingDraft {
  profile: OnboardingProfile;
  document: OnboardingDocument;
  selfie: OnboardingSelfie;
  address: OnboardingAddress;
  consents: OnboardingConsents;
}
