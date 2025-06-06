const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (value: string): boolean => {
  if (!emailRegex.test(value)) return false;
  return true;
};
