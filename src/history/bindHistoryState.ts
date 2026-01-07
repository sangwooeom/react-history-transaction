import { historyCoordinator } from "./HistoryCoordinator";

export function bindHistoryState<T>(
  key: string,
  initialState: T,
  set: (partial: any) => void
) {
  // 1. key 등록
  historyCoordinator.register(key, initialState);

  // 2. popstat 구독
  historyCoordinator.subscribe((state) => {
    if (key in state) {
      set({ [key]: state[key] as T });
    }
  });

  return (value: T) => {
    set({ [key]: value })
    historyCoordinator.push({ [key]: value });
  }
}