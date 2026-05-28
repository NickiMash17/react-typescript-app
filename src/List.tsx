// src/List.tsx
// A generic list component — the type parameter <T> means it can render any type of data.
// Generics let you write one component that is type-safe for many different data shapes.

import type { ReactNode } from 'react';

// <T> is a placeholder for the actual item type (e.g. Fruit, string, User).
// The caller decides what T is when they write <List<Fruit> ... />.
interface ListProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    emptyMessage?: string;
    title?: string;
}

function List<T>({ items, renderItem, emptyMessage = 'No items', title }: ListProps<T>) {
    return (
        <div>
            {title && (
                <h3 style={{ color: '#8B0000', marginBottom: '8px' }}>{title}</h3>
            )}
            {/* Always use strict equality (===) — it checks both value AND type */}
            {items.length === 0 ? (
                <p style={{ color: '#ccc', fontStyle: 'italic' }}>{emptyMessage}</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                    {items.map((item, index) => (
                        // key helps React track which items changed, were added, or removed.
                        <li key={index} style={{ padding: '6px 0', borderBottom: '1px solid #eee' }}>
                            {renderItem(item, index)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default List;
