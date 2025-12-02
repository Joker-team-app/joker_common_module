import { secretKey, sha256Salt } from "./contants";
import { aesEncrypt, sha256 } from "./cryptoUtils";
import { Request } from "../axios-config";
import {
  showConsoleError,
  showConsoleMessage,
} from "../../util/ConsoleMessage";

export interface APIResponse<T> {
  ResponseCode: number;
  ResponseData: T;
  ResponseMsg: string;
}

export enum ApiType {
  Local,
  Main,
}

export const createEncryptedPayload = <T>(
  basePayload: T,
  hashPayload: string,
  apiType: ApiType,
  customSecretKey?: string
): string => {
  const salt =
    apiType == ApiType.Main
      ? sha256Salt
      : customSecretKey
        ? customSecretKey
        : secretKey;
  const hash = computeHash(hashPayload, salt);
  const payload = { ...basePayload, Hash: hash };

  showConsoleMessage("----Request hashPayload -----", hashPayload);

  showConsoleMessage("----Request Body -----", payload);

  return aesEncrypt(payload, secretKey);
};

export const computeHash = (
  hashPayload: string,
  sha256Salt: string
): string => {
  const textToHash = hashPayload + sha256Salt;
  return sha256(textToHash);
};

export const apiPostRequest = async <T>(
  endpoint: string,
  payload: string | FormData,
  isMultipart: boolean = false
): Promise<APIResponse<T> | null> => {
  try {
    const headers = isMultipart
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "text/plain" };
    const response = await Request.post(endpoint, payload, { headers });
    return response.data as APIResponse<T>;
  } catch (error: any) {
    showConsoleError("Axios Error: ", error.data.error);
    return Promise.reject(error);
  }
};
