import { createTransform } from "redux-persist";
import CryptoJS from "crypto-js";
import { showConsoleError } from "../util/ConsoleMessage";

const SECRET_KEY = import.meta.env.VITE_REDUX_SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error("Missing VITE_REDUX_SECRET_KEY in environment variables");
}

export const encryptionTransformed = createTransform(
  (inboundState: any) => {
    try {
      const stringified = JSON.stringify(inboundState);
      return CryptoJS.AES.encrypt(stringified, SECRET_KEY).toString();
    } catch (err) {
      showConsoleError("Encryption failed", err);
      return inboundState;
    }
  },

  (outboundState: any) => {
    try {
      const bytes = CryptoJS.AES.decrypt(outboundState, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (err) {
      showConsoleError("Decryption failed", err);
      return undefined;
    }
  },

  { whitelist: ["login"] }
);
