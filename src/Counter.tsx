// src/Counter.tsx
// Demonstrates consuming a custom hook to manage counter state.
// The logic lives in useCounter — this component only handles the UI.

import useCounter from './hooks/useCounter';

function Counter() {
    // Destructure the values and functions returned by the custom hook.
    const { count, increment, decrement, reset } = useCounter(0);

    return (
        <div style={{ padding: '16px' }}>
            <h3>Count: {count}</h3>
            <button onClick={increment} style={{ marginRight: '8px' }}>+1</button>
            <button onClick={decrement} style={{ marginRight: '8px' }}>-1</button>
            <button onClick={reset} style={{ display: 'block', marginTop: '8px' }}>Reset</button>
        </div>
    );
}

export default Counter;
