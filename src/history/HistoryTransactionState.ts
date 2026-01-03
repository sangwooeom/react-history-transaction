export interface HistoryTransactionState {
  begin: () => void;
  commit: () => void;
  abort: () => void;
  updatePending: (key: string, value: any) => void;
  isInTransaction: boolean;
  pendingState: Record<string, any>
}