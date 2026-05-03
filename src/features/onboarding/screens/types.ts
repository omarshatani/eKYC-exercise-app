import type { Theme } from "@react-navigation/native";

export type ThemeColors = Theme["colors"];

export type DocumentType = "PASSPORT" | "NATIONAL_ID" | "DRIVERS_LICENSE";

export const DOCUMENT_TYPE_OPTIONS: { value: DocumentType; label: string }[] = [
  { value: "PASSPORT", label: "Passport" },
  { value: "NATIONAL_ID", label: "National ID" },
  { value: "DRIVERS_LICENSE", label: "Driver's License" },
];

export const TOTAL_STEPS = 5;

export const STEP_TITLES = [
  "Profile",
  "Document",
  "Selfie",
  "Address",
  "Review & Submit",
] as const;

export type FormData = {
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  documentType: DocumentType | "";
  documentNumber: string;
  hasSelfie: boolean;
  addressLine: string;
  city: string;
  country: string;
};

export const INITIAL_FORM: FormData = {
  fullName: "",
  dateOfBirth: "",
  nationality: "",
  documentType: "",
  documentNumber: "",
  hasSelfie: false,
  addressLine: "",
  city: "",
  country: "",
};

export type ApiFieldError = { field: string; message: string };

export type StepFormProps = {
  form: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  onChange: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  colors: ThemeColors;
};
