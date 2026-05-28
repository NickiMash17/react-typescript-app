// src/ThemePicker.tsx
// Shows how useLocalStorage persists state across page refreshes.
// The union type 'light' | 'dark' restricts theme to only two valid string values.

import useLocalStorage from './hooks/useLocalStorage';

// A union type — Theme can only be the string 'light' or 'dark'.
// TypeScript will catch any typo like 'Light' or 'DARK' at compile time.
type Theme = 'light' | 'dark';

function ThemePicker() {
    // useLocalStorage behaves like useState but also reads/writes to localStorage.
    // The generic <Theme> ensures only valid theme strings can be stored.
    const [theme, setTheme] = useLocalStorage<Theme>('app-theme', 'light');

    return (
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <p>Current Theme: <strong>{theme}</strong></p>
            <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                style={{
                    padding: '8px 16px',
                    background: '#8B0000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Toggle Theme
            </button>
        </div>
    );
}

export default ThemePicker;
