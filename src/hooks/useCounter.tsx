// src/hooks/useCounter.tsx
// A custom hook that encapsulates counter logic.
// Custom hooks let you extract stateful behaviour so multiple components can share it
// without duplicating the useState and setter logic in each component.

import { useState } from 'react';

// Explicitly typing the return value makes it clear what the hook provides
// and gives callers helpful autocomplete in their editor.
interface UseCounterReturn {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
}

function useCounter(initialValue = 0): UseCounterReturn {
    const [count, setCount] = useState(initialValue);

    // Using the functional updater form (c => c + 1) is safer than (count + 1)
    // when the new state depends on the previous value — it avoids stale closure bugs.
    const increment = () => setCount(c => c + 1);
    const decrement = () => setCount(c => c - 1);
    const reset = () => setCount(initialValue);

    return { count, increment, decrement, reset };
}

export default useCounter;
