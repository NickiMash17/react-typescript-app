// src/context/Auth.ts
// Defines the shared types and creates the AuthContext object.
// Keeping context creation here (separate from the Provider component)
// makes it easy to import the context without circular dependency issues.

import { createContext, useContext } from 'react';

// The shape of a logged-in user object.
export interface User {
    name: string;
    email: string;
}

// Everything the context exposes to any component in the tree.
export interface AuthContextType {
    user: User | null;          // null means no user is logged in
    login: (user: User) => void;
    logout: () => void;
}

// createContext requires a default value.
// undefined signals "this component is not inside an AuthProvider yet".
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// A reusable hook that combines useContext with a helpful error message.
// Any component calling useAuth() outside of AuthProvider will get a clear error
// instead of a confusing "cannot read properties of undefined" crash.
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
