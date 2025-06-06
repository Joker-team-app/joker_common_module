export interface VerifyAccountForResetPasswordResponse {
  Phone: string;
  PhoneMask: string;
  EmailMask: string;
}

export interface VerifyAccountForResetPasswordPayload {
  Type: number;
  VerifyType: number;
  Contact: string;
}