let logoutFn: (() => void) | null = null;

export const setGlobalLogout = (fn: () => void) => {
  logoutFn = fn;
};

export const triggerGlobalLogout = () => {
  if (logoutFn) logoutFn();
};
