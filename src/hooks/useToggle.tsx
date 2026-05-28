// src/hooks/useToggle.tsx
// A minimal hook for any boolean toggle (open/closed, visible/hidden, on/off).
// Returns a tuple [value, toggle] — the same pattern as useState.

import { useState } from 'react';

// The return type is a tuple: [boolean, () => void].
// Using a tuple (instead of an object) lets callers rename the values freely:
//   const [isOpen, toggleOpen] = useToggle(false);
//   const [isVisible, toggleVisible] = useToggle(true);
function useToggle(initialValue = false): [boolean, () => void] {
    const [value, setValue] = useState(initialValue);

    // Always derive the next state from the previous one — avoids stale state.
    const toggle = () => setValue(v => !v);

    return [value, toggle];
}

export default useToggle;
