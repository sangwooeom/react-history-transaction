import { useContext } from "react";
import { HistoryTransactionContext } from "./HistoryTransactionContext";

export function useHistoryTransaction() {
  return useContext(HistoryTransactionContext);
}