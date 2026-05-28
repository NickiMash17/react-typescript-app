// src/Button.tsx
// A reusable button component demonstrating TypeScript props and default values.

import type { JSX } from 'react';

// STEP 1: Define the shape of the props with an interface.
// The '?' on disabled means it is optional — the caller does not have to pass it.
interface ButtonProps {
    text: string;
    onclick: () => void;
    disabled?: boolean;
}

// STEP 2: Destructure props inline and specify the default value for 'disabled'.
// TypeScript checks that every prop matches ButtonProps at compile time.
function Button({ text, onclick, disabled = false }: ButtonProps): JSX.Element {
    return (
        <button
            onClick={onclick}
            disabled={disabled}
            style={{
                padding: '8px 16px',
                cursor: disabled ? 'not-allowed' : 'pointer', // ternary changes cursor when disabled
                opacity: disabled ? 0.5 : 1,
                background: '#8B0000',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
            }}
        >
            {text}
        </button>
    );
}

export default Button;
