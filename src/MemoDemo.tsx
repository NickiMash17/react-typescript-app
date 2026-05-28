// src/MemoDemo.tsx
// Demonstrates React.memo — when the parent re-renders (count changes),
// ExpensiveItem components do NOT re-render because their props did not change.
// Open the browser console and click Increment to see this in action.

import { useState } from 'react';
import ExpensiveItem from './ExpensiveItem';

function MemoDemo() {
    // Incrementing count causes MemoDemo to re-render.
    const [count, setCount] = useState(0);

    // items is created once (initial state) and never changes,
    // so ExpensiveItem always receives the same props — memo skips re-rendering it.
    const [items] = useState([
        { name: 'Laptop', price: 15000 },
        { name: 'Smartphone', price: 8000 },
        { name: 'Tablet', price: 12000 },
    ]);

    return (
        <div>
            <p>Counter: {count}</p>
            <button
                onClick={() => setCount(c => c + 1)}
                style={{ marginBottom: '12px', padding: '6px 12px' }}
            >
                Increment
            </button>
            {/* Each ExpensiveItem is memoised — check the console to confirm it does not re-render */}
            {items.map(item => (
                <ExpensiveItem key={item.name} name={item.name} price={item.price} />
            ))}
        </div>
    );
}

export default MemoDemo;
