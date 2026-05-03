export type SubmissionStatus = "RECEIVED" | "FAILED";

export interface SubmissionResult {
  submissionId: string;
  status: SubmissionStatus;
}
