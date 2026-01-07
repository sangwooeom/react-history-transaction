type HistorySnapShot = Record<string, unknown>;

class HistoryCoordinator {
  private _isInTransaction = false;
  private _snapShot: HistorySnapShot = {...history.state}
  private subscribers = new Set<(state: any) => void>();

  constructor() {
    window.addEventListener("popstate", (e: PopStateEvent) => {
      if (!e.state) return;
      this.subscribers.forEach(fn => fn(e.state));
    })
  }

  get isInTransaction() {
    return this._isInTransaction;
  }

  begin() {
    this._isInTransaction = true;
    this._snapShot = { ...(history.state ?? {})};
  }

  commit() {
    if (!this._isInTransaction) return
    history.pushState(this._snapShot, "");
    this._isInTransaction = false;
    this._snapShot = {};
  }

  abort() {
    this._isInTransaction = false;
    this._snapShot = {};
  }

  push(partial: HistorySnapShot) {
    if (this._isInTransaction) {
      this._snapShot = {...this._snapShot, ...partial};
    } else {
      history.pushState({...history.state, ...partial}, "");
    }
  }

  subscribe(fn: (state: any) => void) {
    this.subscribers.add(fn);
    return () => {
      this.subscribers.delete(fn);
    }
  }

  register(key: string, initialState: unknown) {
    if (!history.state || !(key in history.state)) {
      history.replaceState({...history.state, [key]: initialState }, "");
    }
  }

  updateSnapShop(key: string, value: any) {
    if (key in this._snapShot) {
      this._snapShot[key] = value;
    }
  }
}

export const historyCoordinator = new HistoryCoordinator();