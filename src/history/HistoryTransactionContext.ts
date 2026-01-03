import { createContext } from 'react';
import { HistoryTransactionState } from './HistoryTransactionState';

const initialState = {
  begin: () => {},
  commit: () => {},
  abort: () => {},
  updatePending: () => {},
  isInTransaction: false,
  pendingState: {}
};

export const HistoryTransactionContext = createContext<HistoryTransactionState>(initialState);