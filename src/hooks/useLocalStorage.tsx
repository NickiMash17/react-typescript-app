// src/hooks/useLocalStorage.tsx
// Behaves like useState but also reads from and writes to localStorage,
// so the stored value survives page refreshes.

import { useState } from 'react';

// The return type matches useState — a [value, setter] tuple.
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    // Lazy initialisation: the function passed to useState runs only once on mount.
    // It tries to load an existing value from localStorage instead of using initialValue.
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            // JSON.parse turns the stored string back into the original value.
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            console.error('useLocalStorage read error:', error);
            return initialValue;
        }
    });

    // setValue updates both the React state and the persisted localStorage entry.
    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            // JSON.stringify converts the value to a string for storage.
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('useLocalStorage write error:', error);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;
