import { useRef } from "react";
import { HistoryTransactionContext } from "./HistoryTransactionContext";

export function HistoryTransactionProvider({ children }: { children: React.ReactNode }) {
  const isInTransactionRef = useRef(false);
  const pendingStateRef = useRef<Record<string, any>>({});

  const begin = () => {
    isInTransactionRef.current = true;
    pendingStateRef.current = { ...(history.state ?? {})};
  }

  const commit = () => {
    if (!isInTransactionRef.current) return
    history.pushState(pendingStateRef.current, "");
    pendingStateRef.current = {};
    isInTransactionRef.current = false;
  }

  const abort = () => {
    isInTransactionRef.current = false;
    pendingStateRef.current = {};
  }

  const updatePending = (key: string, value: any) => {
    if (!isInTransactionRef.current) return
    pendingStateRef.current[key] = value
  }

  const value = {
    begin,
    commit,
    abort,
    updatePending,
    get isInTransaction() {
      return isInTransactionRef.current;
    },
    get pendingState() {
      return pendingStateRef.current;
    }
  }

  return (
    <HistoryTransactionContext.Provider value={value}>
      {children}
    </HistoryTransactionContext.Provider>
  )
}