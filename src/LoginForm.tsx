// src/LoginForm.tsx
// A controlled form component — React state drives every input value.
// TypeScript events (ChangeEvent, FormEvent) add type safety to form handlers.

import { useState } from 'react';
// Note: FormEvent is marked deprecated in React 19 — it still works, but future
// versions may replace it with native DOM event types like SubmitEvent.
import type { ChangeEvent, FormEvent } from 'react';

// Defines the shape of the form's state object.
interface FormData {
    email: string;
    password: string;
}

function LoginForm() {
    // useState with a generic type ensures formData always matches FormData.
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });

    // ChangeEvent<HTMLInputElement> tells TypeScript that 'e' comes from an <input>.
    // The computed property [name] updates only the field that changed.
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,       // keep all existing fields
            [name]: value, // overwrite only the changed field
        }));
    };

    // FormEvent<HTMLFormElement> types the submit event from a <form> element.
    // e.preventDefault() stops the browser from reloading the page on submit.
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(`Login: ${formData.email}`);
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
            <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button
                type="submit"
                style={{
                    padding: '8px',
                    background: '#8B0000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Login
            </button>
        </form>
    );
}

export default LoginForm;
