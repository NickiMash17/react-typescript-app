// src/main.tsx
// This is the entry point of the React application.
// It finds the <div id="root"> in index.html and hands it to React to manage.

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './features/auth/hooks/AuthContext';

// React.StrictMode runs extra checks in development to catch common mistakes.
// AuthProvider wraps App so every child component can access authentication state
// without us having to pass props down through every level (no prop drilling).
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
