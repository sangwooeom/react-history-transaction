import { useEffect, useState } from "react";
import { historyCoordinator } from "./HistoryCoordinator";

export function useHistoryState<T>(key: string, initialState: T) {
  const [state, setState] = useState(() => {
    return history.state && key in history.state ? history.state[key] : initialState
  });

  useEffect(() => {
    historyCoordinator.register(key, initialState);

    return historyCoordinator.subscribe((state) => {
      if (key in state) {
        setState(state[key] as T);
      }
    })
  }, [key, initialState]);

  const set = (next: T) => {
    historyCoordinator.push({[key]: next});
    setState(next);
  }

  return [state, set];
}