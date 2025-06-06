// overload definitions

import { setLoading } from "../../store/loading-slice.js";
import { AppDispatch } from "../../store/store.js";

// 1. Types
type AsyncFnRedux<T> = (
  dispatch: AppDispatch,
  getState: () => any,
  ...args: any[]
) => Promise<T>;

type AsyncFnPlain<T> = (...args: any[]) => Promise<T>;

// 2. Overload definitions
export function withLoading<T>(
  asyncFn: AsyncFnRedux<T>,
  wrapError?: (error: any, args: any[]) => any
): (
  ...args: any[]
) => (dispatch: AppDispatch, getState: () => any) => Promise<T>;

export function withLoading<T>(
  asyncFn: AsyncFnPlain<T>,
  wrapError?: (error: any, args: any[]) => any
): (...args: any[]) => Promise<T>;

// 3. Implementation (matches both)
export function withLoading<T>(
  asyncFn: AsyncFnRedux<T> | AsyncFnPlain<T>,
  wrapError?: (error: any, args: any[]) => any
): any {
  return (...args: any[]) => {
    // Return thunk-style if Redux is expected
    if (asyncFn.length >= 2) {
      return async (dispatch: AppDispatch, getState: () => any): Promise<T> => {
        dispatch(setLoading(true));
        try {
          const result = await (asyncFn as AsyncFnRedux<T>)(
            dispatch,
            getState,
            ...args
          );
          dispatch(setLoading(false));
          return result;
        } catch (error) {
          dispatch(setLoading(false));
          if (wrapError) throw wrapError(error, args);
          throw error;
        }
      };
    }

    // Return direct async function
    return async (...args: any[]): Promise<T> => {
      const { store } = await import("../../store/store.js"); // avoid circular imports
      store.dispatch(setLoading(true));
      try {
        const result = await (asyncFn as AsyncFnPlain<T>)(...args);
        store.dispatch(setLoading(false));
        return result;
      } catch (error) {
        store.dispatch(setLoading(false));
        if (wrapError) throw wrapError(error, args);
        throw error;
      }
    };
  };
}
