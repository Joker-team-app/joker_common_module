// withLoading.ts
import { setLoading } from "../../store/loading-slice"; // can still import slice actions

type DispatchFn = (...args: any[]) => void;
type GetStateFn = () => any;

let globalDispatch: DispatchFn | undefined;
export const setGlobalDispatch = (dispatch: DispatchFn) => {
  globalDispatch = dispatch;
};

type AsyncFnRedux<T> = (
  dispatch: DispatchFn,
  getState: GetStateFn,
  ...args: any[]
) => Promise<T>;

type AsyncFnPlain<T> = (...args: any[]) => Promise<T>;

export function withLoading<T>(
  asyncFn: AsyncFnRedux<T>,
  wrapError?: (error: any, args: any[]) => any
): (
  ...args: any[]
) => (dispatch: DispatchFn, getState: GetStateFn) => Promise<T>;

export function withLoading<T>(
  asyncFn: AsyncFnPlain<T>,
  wrapError?: (error: any, args: any[]) => any
): (...args: any[]) => Promise<T>;

export function withLoading<T>(
  asyncFn: AsyncFnRedux<T> | AsyncFnPlain<T>,
  wrapError?: (error: any, args: any[]) => any
): any {
  return (...args: any[]) => {
    // Thunk-style (Redux)
    if (asyncFn.length >= 2) {
      return async (dispatch: DispatchFn, getState: GetStateFn): Promise<T> => {
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

    // Direct-style (fallback to globalDispatch)
    return async (): Promise<T> => {
      if (!globalDispatch) {
        throw new Error(
          "Global dispatch not set for non-redux withLoading use."
        );
      }
      globalDispatch(setLoading(true));
      try {
        const result = await (asyncFn as AsyncFnPlain<T>)(...args);
        globalDispatch(setLoading(false));
        return result;
      } catch (error) {
        globalDispatch(setLoading(false));
        if (wrapError) throw wrapError(error, args);
        throw error;
      }
    };
  };
}
