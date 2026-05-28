// src/Card.tsx
// A layout wrapper component that accepts a title and any child elements.
// This pattern (a "container" component with a children prop) is very common in React.

import type { ReactNode, JSX } from 'react';

// ReactNode covers everything React can render: strings, JSX, arrays, null, etc.
// Using 'children' allows you to place any content between <Card>...</Card> tags.
interface CardProps {
    title: string;
    children: ReactNode;
    className?: string;
}

function Card({ title, children }: CardProps): JSX.Element {
    return (
        <div
            style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '12px',
                background: '#fff',
            }}
        >
            <h2 style={{ marginBottom: '12px', color: '#8B0000' }}>{title}</h2>
            {/* children renders whatever is placed between <Card>...</Card> tags */}
            {children}
        </div>
    );
}

export default Card;
