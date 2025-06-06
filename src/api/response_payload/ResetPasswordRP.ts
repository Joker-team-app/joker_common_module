export interface ResetPasswordPayload {
    Action: number;
    Type: number;
    Contact: string;
    VerifyCode: string;
    Password: string;
  }
  