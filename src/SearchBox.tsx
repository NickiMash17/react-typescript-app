// src/SearchBox.tsx
// Demonstrates useRef to directly access a DOM element (auto-focus on mount)
// and useEffect to run side-effects after the component renders.

import { useRef, useEffect } from 'react';
import type { ChangeEvent } from 'react';

interface SearchBoxProps {
    onSearch: (term: string) => void;
    placeholder?: string;
}

function SearchBox({ onSearch, placeholder = 'Search...' }: SearchBoxProps) {
    // useRef<HTMLInputElement> creates a stable reference to the actual <input> DOM node.
    // It does NOT cause a re-render when it changes — unlike useState.
    const inputRef = useRef<HTMLInputElement>(null);

    // useEffect with an empty [] dependency array runs once after the first render.
    // This is the right place for DOM side-effects like focusing an input.
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    return (
        <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            onChange={handleChange}
            style={{
                padding: '10px',
                border: '2px solid #8B0000',
                borderRadius: '6px',
                width: '100%',
                fontSize: '16px',
                boxSizing: 'border-box',
            }}
        />
    );
}

export default SearchBox;
