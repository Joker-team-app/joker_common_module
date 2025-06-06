const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d|.*[!@#$%^&*()_+{}:"<>?;'[\],.\-]).{6,16}|(?=.*\d)(?=.*[!@#$%^&*()_+{}:"<>?;'[\],.\-]).{6,16}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^.{6,}$/;
const phoneRegex = /^[0-9]{7,15}$/;

export const isValidEmail = (value: string): boolean => {
  if (!emailRegex.test(value)) return false;
  return true;
};

export const isValidPassword = (value: string): boolean => {
  if (!passwordRegex.test(value)) return false;
  return true;
};

export const isValidUsername = (value: string): boolean => {
  if (!usernameRegex.test(value)) return false;
  return true;
};

export const isValidMobileNumber = (value: string): boolean => {
  if (!phoneRegex.test(value)) return false;
  return phoneRegex.test(value);
};
