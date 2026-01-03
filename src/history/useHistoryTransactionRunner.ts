import { useHistoryTransaction } from "./useHistoryTransaction";

export function useHistoryTransactionRunner() {
  const tx = useHistoryTransaction();
  return (fn: () => void) => {
    tx.begin();
    try {
      fn();
      tx.commit();
    } catch (error) {
      tx.abort();
      throw error;
    }
  }
}