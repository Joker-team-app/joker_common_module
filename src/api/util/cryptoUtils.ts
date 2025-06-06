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
