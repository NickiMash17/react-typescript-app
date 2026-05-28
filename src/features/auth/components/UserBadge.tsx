// src/UserBadge.tsx
// Demonstrates consuming the AuthContext via the useAuth hook.
// This component does not need to know HOW authentication works —
// it just reads from the context and calls the functions it provides.

import { useAuth } from '../hooks/AuthContext';

function UserBadge() {
    // useAuth() retrieves the nearest AuthProvider's value from the React context tree.
    const { user, login, logout } = useAuth();

    // Conditional rendering: show different UI based on authentication state.
    if (!user) {
        return (
            <div>
                <p>Not logged in.</p>
                <button
                    onClick={() => login({ name: 'Eva', email: 'eva@example.com' })}
                    style={{
                        padding: '6px 14px',
                        background: '#8B0000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Log in as Eva
                </button>
            </div>
        );
    }

    return (
        <div>
            <p>Logged in: <strong>{user.name}</strong> ({user.email})</p>
            <button
                onClick={logout}
                style={{
                    padding: '6px 14px',
                    background: '#555',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Logout
            </button>
        </div>
    );
}

export default UserBadge;
