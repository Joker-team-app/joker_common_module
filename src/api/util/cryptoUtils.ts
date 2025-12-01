import CryptoJS from "crypto-js";
import { showConsoleError } from "../../util/ConsoleMessage";

// SHA-256 hashing function
export const sha256 = (text: string): string => {
  try {
    return CryptoJS.SHA256(text).toString(CryptoJS.enc.Hex);
  } catch (error) {
    showConsoleError("Error hashing text:", error);
    return "";
  }
};

// AES encryption function
export const aesEncrypt = (data: object, secretKey: string): string => {
  try {
    const jsonString = JSON.stringify(data);

    // Convert key to WordArray
    const keyBytes = CryptoJS.enc.Utf8.parse(secretKey);

    // AES Encrypt using CBC mode and PKCS7 padding
    const encrypted = CryptoJS.AES.encrypt(jsonString, keyBytes, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: keyBytes, // Using the key as IV for simplicity (replace with actual IV in production)
    });

    // Convert the result to Base64
    return encrypted.toString();
  } catch (error) {
    showConsoleError("Error encrypting data:", error);
    return "";
  }
};

export const decryptBackendPayload = <T = any>(
  encryptedBase64: string,
  secretKey: string,
  secretIv?: string
): T | null => {
  try {
    if (!encryptedBase64) {
      console.error("decryptBackendPayload: empty ciphertext");
      return null;
    }

    // 1) Build key
    const key = CryptoJS.enc.Utf8.parse(secretKey);

    const iv: any = secretIv ? CryptoJS.enc.Utf8.parse(secretIv) : key;

    const aesOptions = {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: iv, // or your IV
    };

    // 3) Decrypt from Base64
    const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key, aesOptions);

    // 4) Convert bytes → UTF-8
    const jsonText = decrypted.toString(CryptoJS.enc.Utf8);

    if (!jsonText) {
      console.error(
        "decryptBackendPayload: decryption produced empty/invalid UTF-8. " +
          "Likely wrong key/IV/mode or corrupted ciphertext."
      );
      return null;
    }

    return JSON.parse(jsonText) as T;
  } catch (err) {
    console.error("decryptBackendPayload: error decrypting data:", err);
    return null;
  }
};
