// src/ExpensiveItem.tsx
// React.memo wraps this component so it only re-renders when its props actually change.
// Without memo, every parent re-render would trigger a re-render here too — wasted work.

import { memo } from 'react';

interface ExpensiveItemProps {
    name: string;
    price: number;
}

// memo() returns a new component that skips re-rendering if props are the same (shallow equal).
// The console.log lets you observe exactly when renders happen — open the browser console!
const ExpensiveItem = memo(function ExpensiveItem({ name, price }: ExpensiveItemProps) {
    console.log('ExpensiveItem rendered:', name);
    return (
        <div
            style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginBottom: '6px',
            }}
        >
            <strong>{name} — R{price}</strong>
        </div>
    );
});

export default ExpensiveItem;
