// src/hooks/useDebouncer.tsx
// Delays updating the returned value until the input has stopped changing for 'delay' ms.
// Useful for search inputs — prevents firing a network request on every single keystroke.

import { useState, useEffect } from 'react';

function useDebouncer<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Schedule an update after the delay period.
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup function: if 'value' changes before the delay expires,
        // cancel the previous timer and start a new one.
        // This reset is what creates the debounce effect.
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

export default useDebouncer;
