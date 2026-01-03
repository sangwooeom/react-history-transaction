import { useEffect, useState } from "react";
import { useHistoryTransaction } from "./useHistoryTransaction";

export function useHistoryState<T>(key: string, initialState: T) {
  const tx = useHistoryTransaction();
  const [state, setState] = useState(() => {
    return history.state && key in history.state ? history.state[key] : initialState
  });

  useEffect(() => {
    if (!history.state || !(key in history.state)) {
      history.replaceState({
        ...(history.state ?? {}),
        [key]: initialState
      }, "");
    }

    const listener = (e: PopStateEvent) => {
      if (!e.state || !(key in e.state)) return;
      setState(e.state[key] as T);
    }

    window.addEventListener("popstate", listener);

    return () => {
      window.removeEventListener("popstate", listener);
    }
  }, [key, initialState]);

  const set = (next: T) => {
    if (tx.isInTransaction) {
      tx.updatePending(key, next);
      setState(next);
    } else {
      history.pushState({
        ...(history.state ?? {}),
        [key]: next
      }, "");
      setState(next);
    }
  }

  return [state, set];
}