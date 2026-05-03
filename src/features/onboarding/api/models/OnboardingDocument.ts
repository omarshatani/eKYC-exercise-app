export type DocumentType = "PASSPORT" | "NATIONAL_ID" | "DRIVERS_LICENSE";

export interface OnboardingDocument {
  documentType: DocumentType;
  documentNumber: string;
}
