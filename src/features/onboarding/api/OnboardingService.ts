import { OnboardingService } from "@/features/onboarding/api/types";
import { OnboardingDraft } from "@/features/onboarding/api/models/OnboardingDraft";

type FieldError = { field: string; message: string };
type ValidationResult = { valid: boolean; errors: FieldError[] };

const validateDraft = (draft: OnboardingDraft): ValidationResult => {
  const errors: FieldError[] = [];

  if (!draft.profile.fullName?.trim())
    errors.push({ field: "fullName", message: "Full name is required." });
  if (!draft.profile.dateOfBirth?.trim())
    errors.push({
      field: "dateOfBirth",
      message: "Date of birth is required.",
    });
  if (!draft.profile.nationality?.trim())
    errors.push({ field: "nationality", message: "Nationality is required." });

  if (!draft.document.documentType)
    errors.push({
      field: "documentType",
      message: "Document type is required.",
    });
  if (!draft.document.documentNumber?.trim())
    errors.push({
      field: "documentNumber",
      message: "Document number is required.",
    });

  if (!draft.selfie.hasSelfie)
    errors.push({ field: "selfie", message: "A selfie photo is required." });

  if (!draft.address.addressLine1?.trim())
    errors.push({
      field: "addressLine1",
      message: "Address line is required.",
    });
  if (!draft.address.city?.trim())
    errors.push({ field: "city", message: "City is required." });
  if (!draft.address.country?.trim())
    errors.push({ field: "country", message: "Country is required." });

  if (!draft.consents.termsAccepted)
    errors.push({
      field: "termsAccepted",
      message: "You must accept the terms and conditions.",
    });

  return { valid: errors.length === 0, errors };
};

const OnboardingServiceImpl = (): OnboardingService => ({
  apiSubmit: async (accessToken, draft) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 401 - access token invalid
    if (!accessToken || accessToken === "") {
      const error = new Error("Invalid access token");
      (error as any).status = 401;
      throw error;
    }

    // 500 - random transient error
    if (Math.random() < 0.1) {
      const error = new Error("Internal server error");
      (error as any).status = 500;
      throw error;
    }

    const { valid, errors } = validateDraft(draft);

    if (!valid) {
      const error = new Error("Invalid draft");
      (error as any).status = 422;
      (error as any).errors = errors;
      throw error;
    }

    return {
      status: "RECEIVED",
      submissionId: "SUB-" + Math.random().toString(36).substring(1, 12),
    };
  },
});

export default OnboardingServiceImpl;
