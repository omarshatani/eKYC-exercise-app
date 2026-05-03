import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { OnboardingDraft } from "@/features/onboarding/api/models/OnboardingDraft";
import type { OnboardingProfile } from "@/features/onboarding/api/models/OnboardingProfile";
import type { OnboardingDocument } from "@/features/onboarding/api/models/OnboardingDocument";
import type { OnboardingSelfie } from "@/features/onboarding/api/models/OnboardingSelfie";
import type { OnboardingAddress } from "@/features/onboarding/api/models/OnboardingAddress";
import type { OnboardingConsents } from "@/features/onboarding/api/models/OnboardingConsents";

type DraftUpdate = {
  profile?: Partial<OnboardingProfile>;
  document?: Partial<OnboardingDocument>;
  selfie?: Partial<OnboardingSelfie>;
  address?: Partial<OnboardingAddress>;
  consents?: Partial<OnboardingConsents>;
};

export const BLANK_DRAFT: OnboardingDraft = {
  profile: { fullName: "", dateOfBirth: "", nationality: "" },
  document: { documentType: "PASSPORT", documentNumber: "" },
  selfie: { hasSelfie: false },
  address: { addressLine1: "", city: "", country: "" },
  consents: { termsAccepted: true }, // placeholder until a consent step is added
};

interface State {
  draft: OnboardingDraft | null;
  currentStep: number;
  progress: number;
  error: string | null;
}

interface Action {
  setDraft: (draft: OnboardingDraft) => void;
  clearDraft: () => void;
  setCurrentStep: (step: number) => void;
  setError: (error: string) => void;
  updateDraft: (update: DraftUpdate) => void;
}

type OnboardingStore = State & Action;

const initialState: State = {
  draft: null,
  currentStep: 1,
  progress: 0,
  error: null,
};

const onboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      ...initialState,

      setDraft: (draft) => set({ draft }),

      clearDraft: () => set({ draft: null, currentStep: 1 }),

      setCurrentStep: (step) => set({ currentStep: step }),

      setError: (error) => set({ error }),

      updateDraft: (update) =>
        set((state) => {
          const base = state.draft ?? BLANK_DRAFT;
          return {
            draft: {
              profile: { ...base.profile, ...update.profile },
              document: { ...base.document, ...update.document },
              selfie: { ...base.selfie, ...update.selfie },
              address: { ...base.address, ...update.address },
              consents: { ...base.consents, ...update.consents },
            },
          };
        }),
    }),
    {
      name: "onboarding-store",
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        draft: state.draft,
        currentStep: state.currentStep,
      }),
    },
  ),
);

export { onboardingStore as useOnboardingStore };
