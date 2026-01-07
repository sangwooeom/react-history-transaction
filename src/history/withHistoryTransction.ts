import { historyCoordinator } from "./HistoryCoordinator";

export function withHistoryTransaction(fn: () => void) {
  historyCoordinator.begin();
  try {
    fn();
    historyCoordinator.commit();
  } catch (error) {
    historyCoordinator.abort();
    throw error;
  }
}