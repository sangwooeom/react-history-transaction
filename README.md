# react-history-transaction
Transactional browser history synchronization for React state-driven UI navigation.

## Installation

```
npm i react-history-transaction
```

## Guide

### 한 개의 상태값만 브라우저 히스토리에 연동시키고 싶은 경우

어떤 프로젝트에서는 오직 한 개의 상태값만 연동시키고 싶은 경우가 있습니다. 이러한 경우에는 사용법이 복잡하지 않습니다.
이러한 경우에는 useHistoryState만 사용하면 됩니다. 이 때, useHistoryState는 매개변수 2개가 필요합니다. 첫 번째 매개변수는 History State에 저정할 이름을 지정하는 문자열입니다. 그리고 두 번째 매개변수는 해당 상태값의 초기값입니다.

```
import { useHistoryState } from "react-history-transaction";

export default function Counter() {
  const [count, setCount] = useHistoryState("count", 0);

  return (
    <div>
      <button onClick={() => setCount(count+1)}>+1</button>
      <br />
      <span>{count}</span>
    </div>
  )
}
```