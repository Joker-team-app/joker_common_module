export interface LoginResponse {
  Id: number;
  Name: string;
  UserName: string;
  Email: string;
  ImageUrl: string;
  Phone: string;
  CreateDate: string;
  MemberSecretKey: string;
  WalletCash: number;
  LocalAPIURL: string;
  MemberReferralCode: string;
  LastTransaction: LastTransaction | null;
}

export interface LastTransaction {
  Id: number;
  TrxName: string;
  TrxType: number;
  MemberId: number;
  Amount: number;
  EntryDate: string;
  ExtTrxId: number;
  RefNo: string;
  Remark: string;
}

export interface LoginPayload {
  Username: string;
  Password: string;
  NotificationToken: string;
}
