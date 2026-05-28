// src/features/auth/hooks/AuthContext.tsx
// The AuthProvider component wraps the app and supplies authentication state
// to every child component via React Context — no prop drilling needed.

import { useState } from 'react';
import type { ReactNode } from 'react';
// Import the context object and types from Auth.ts to avoid duplicating definitions.
import { AuthContext } from '../../../context/Auth';
import type { User } from '../../../context/Auth';



interface AuthProviderProps {
    children: ReactNode;
}

// AuthProvider manages the user state and passes it down through the context.
export function AuthProvider({ children }: AuthProviderProps) {
    // user is null when nobody is logged in, or a User object when logged in.
    const [user, setUser] = useState<User | null>(null);

    const login = (newUser: User) => setUser(newUser);
    const logout = () => setUser(null);

    // AuthContext.Provider makes { user, login, logout } available to every
    // component inside it, no matter how deeply nested, without passing props manually.
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Re-export useAuth from Auth.ts so callers only need one import path.
export { useAuth } from '../../../context/Auth';
