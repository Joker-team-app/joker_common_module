import { isValidEmail } from "../../util/Validator.js";
import { ContactType } from "../models/ContactType.js";
import { SendVerifyCodeAction } from "../models/SendVerifyCodeAction.js";
import { VerifyAccountForResetPasswordType } from "../models/VerifyAccountForResetPasswordType.js";
import type {
  LoginPayload,
  LoginResponse,
} from "../response_payload/LoginResponseRP.js";
import type { ResetPasswordPayload } from "../response_payload/ResetPasswordRP.js";
import type { SendVerifyCodePayload } from "../response_payload/SendVerifyCodeRP.js";
import type {
  VerifyAccountForResetPasswordPayload,
  VerifyAccountForResetPasswordResponse,
} from "../response_payload/VerifyAccountForResetPasswordRP.js";
import type { VerifyCodePayload } from "../response_payload/VerifyCodeRP.js";
import {
  apiPostRequest,
  ApiType,
  createEncryptedPayload,
  type APIResponse,
} from "../util/apiUtils.js";

import { Endpoint, notificationToken, validate } from "../util/contants.js";

export const login = async (
  username: string,
  password: string
): Promise<APIResponse<LoginResponse> | null> => {
  //login by email
  if (isValidEmail(username)) {
    const basePayload = {
      Email: username,
      Password: password,
      NotificationToken: notificationToken,
    };

    const hashPayload = `${validate(username, "email")}${validate(
      password,
      "password"
    )}${validate(notificationToken, "notificationToken")}`;

    const encryptedPayload = createEncryptedPayload(
      basePayload,
      hashPayload,
      ApiType.Main
    );

    return await apiPostRequest<LoginResponse>(
      Endpoint.LoginByEmail,
      encryptedPayload
    );
  } //login by username
  else {
    const basePayload: LoginPayload = {
      Username: username,
      Password: password,
      NotificationToken: notificationToken,
    };
    const hashPayload = `${validate(username, "username")}${validate(
      password,
      "password"
    )}${validate(notificationToken, "notificationToken")}`;
    const encryptedPayload = createEncryptedPayload(
      basePayload,
      hashPayload,
      ApiType.Main
    );
    return await apiPostRequest<LoginResponse>(
      Endpoint.Login,
      encryptedPayload
    );
  }
};

export const VerifyAccountForResetPassword = async (
  type: ContactType,
  verifyType: VerifyAccountForResetPasswordType,
  contact: string
): Promise<APIResponse<VerifyAccountForResetPasswordResponse> | null> => {
  const basePayload: VerifyAccountForResetPasswordPayload = {
    Type: type,
    VerifyType: verifyType,
    Contact: contact,
  };

  const hashPayload = `${type}${verifyType}${validate(contact, "contact")}`;

  const encryptedPayload = createEncryptedPayload(
    basePayload,
    hashPayload,
    ApiType.Main
  );

  return await apiPostRequest<VerifyAccountForResetPasswordResponse>(
    Endpoint.VerifyAccountForResetPassword,
    encryptedPayload
  );
};

export const SendVerifyCode = async (
  action: SendVerifyCodeAction,
  type: ContactType,
  contact: string
): Promise<APIResponse<string> | null> => {
  const basePayload: SendVerifyCodePayload = {
    Action: action,
    Type: type,
    Contact: contact,
  };

  const hashPayload = `${action}${type}${validate(contact, "contact")}`;

  const encryptedPayload = createEncryptedPayload(
    basePayload,
    hashPayload,
    ApiType.Main
  );

  return await apiPostRequest<string>(
    Endpoint.SendVerifyCode,
    encryptedPayload
  );
};

export const VerifyCode = async (
  action: SendVerifyCodeAction,
  type: ContactType,
  contact: string,
  verifyCode: string
): Promise<APIResponse<string> | null> => {
  const basePayload: VerifyCodePayload = {
    Action: action,
    Type: type,
    Contact: contact,
    VerifyCode: verifyCode,
  };

  const hashPayload = `${action}${type}${validate(
    contact,
    "contact"
  )}${validate(verifyCode, "verifyCode")}`;

  const encryptedPayload = createEncryptedPayload(
    basePayload,
    hashPayload,
    ApiType.Main
  );

  return await apiPostRequest<string>(Endpoint.VerifyCode, encryptedPayload);
};

export const VerifyEmailCode = async (
  email: string,
  verifyCode: string
): Promise<APIResponse<string> | null> => {
  const action = SendVerifyCodeAction.register;
  const type = ContactType.email;

  const basePayload = {
    Action: action,
    Type: type,
    Contact: email,
    VerifyCode: verifyCode,
  };

  const hashPayload = `${action}${type}${validate(email, "contact")}${validate(
    verifyCode,
    "verifyCode"
  )}`;

  const encryptedPayload = createEncryptedPayload(
    basePayload,
    hashPayload,
    ApiType.Main
  );

  return await apiPostRequest<string>(Endpoint.VerifyCode, encryptedPayload);
};

export const ResetPassword = async (
  action: SendVerifyCodeAction,
  type: ContactType,
  contact: string,
  verifyCode: string,
  password: string
): Promise<APIResponse<string> | null> => {
  const basePayload: ResetPasswordPayload = {
    Action: action,
    Type: type,
    Contact: contact,
    VerifyCode: verifyCode,
    Password: password,
  };

  const hashPayload = `${action}${type}${validate(
    contact,
    "contact"
  )}${validate(verifyCode, "verifyCode")}${validate(password, "password")}`;

  const encryptedPayload = createEncryptedPayload(
    basePayload,
    hashPayload,
    ApiType.Main
  );

  return await apiPostRequest<string>(Endpoint.ResetPassword, encryptedPayload);
};

export const CheckEmailExist = async (
  email: string
): Promise<APIResponse<string> | null> => {
  const basePayload = {
    Email: email,
  };
  const hashPayload = `${validate(email, "Email")}`;
  const encryptedPayload = createEncryptedPayload(
    basePayload,
    hashPayload,
    ApiType.Main
  );

  return await apiPostRequest<string>(Endpoint.CheckEmail, encryptedPayload);
};

export const CheckUsernameExist = async (
  username: string
): Promise<APIResponse<string> | null> => {
  const basePayload = {
    Username: username,
  };
  const hashPayload = `${validate(username, "Username")}`;
  const encryptedPayload = createEncryptedPayload(
    basePayload,
    hashPayload,
    ApiType.Main
  );

  return await apiPostRequest<string>(Endpoint.CheckUsername, encryptedPayload);
};

export const CheckPhoneExist = async (
  phone: string
): Promise<APIResponse<string> | null> => {
  const basePayload = {
    Phone: phone,
  };
  const hashPayload = `${validate(phone, "Phone")}`;
  const encryptedPayload = createEncryptedPayload(
    basePayload,
    hashPayload,
    ApiType.Main
  );

  return await apiPostRequest<string>(
    Endpoint.CheckPhoneNumber,
    encryptedPayload
  );
};

export const Register = async (
  username: string,
  name: string,
  email: string,
  password: string,
  pin: string,
  phoneNumber: string,
  tacCode: string,
  emailVerifyId: number
): Promise<APIResponse<string> | null> => {
  const basePayload = {
    Username: username,
    Name: name,
    RegisterType: 0,
    Email: email,
    Password: password,
    Pin: pin,
    PhoneNumber: phoneNumber,
    TACCode: tacCode,
    NotificationToken: notificationToken,
    EmailVerifyId: emailVerifyId,
  };
  const hashPayload = `${validate(name, "Name")}${validate(
    username,
    "Username"
  )}${validate(password, "Password")}${validate(pin, "Pin")}${validate(
    email,
    "Email"
  )}${validate(phoneNumber, "PhoneNumber")}${validate(
    tacCode,
    "TACCode"
  )}${emailVerifyId}`;

  const encryptedPayload = createEncryptedPayload(
    basePayload,
    hashPayload,
    ApiType.Main
  );

  return await apiPostRequest<string>(Endpoint.Register, encryptedPayload);
};

export const RecoverUsername = async (
  email: string
): Promise<APIResponse<string> | null> => {
  const basePayload = {
    Email: email,
  };

  const hashPayload = `${validate(email, "Email")}`;

  const encryptedPayload = createEncryptedPayload(
    basePayload,
    hashPayload,
    ApiType.Main
  );

  return await apiPostRequest<string>(
    Endpoint.RecoverUsername,
    encryptedPayload
  );
};
