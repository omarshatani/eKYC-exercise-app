import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { OnboardingDraft } from "@/features/onboarding/api/models/OnboardingDraft";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    (set, get) => ({
      ...initialState,
      setDraft: (draft) => {
        set({ draft });
      },
      clearDraft: () => {
        set({ draft: null });
      },
      setCurrentStep: (step) => {
        set({ currentStep: step });
      },
      setError: (error) => {
        set({ error });
      },
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
