// src/Modal.tsx
// Demonstrates the useToggle hook controlling show/hide state.
// The modal itself is conditionally rendered — it does not exist in the DOM when closed.

import useToggle from './hooks/useToggle';

function Modal() {
    // useToggle returns a [currentValue, toggleFunction] tuple, similar to useState.
    const [isOpen, toggleOpen] = useToggle(false);

    return (
        <div>
            <button
                onClick={toggleOpen}
                style={{
                    padding: '8px 16px',
                    background: '#8B0000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                {/* Ternary expression changes the label based on state */}
                {isOpen ? 'Close Modal' : 'Open Modal'}
            </button>

            {/* Short-circuit rendering: the div only mounts when isOpen is true */}
            {isOpen && (
                <div
                    style={{
                        border: '2px solid #8B0000',
                        padding: '16px',
                        borderRadius: '8px',
                        marginTop: '12px',
                        background: '#FFF9F9',
                    }}
                >
                    <h3 style={{ color: '#8B0000' }}>Modal Content</h3>
                    <p>This modal is powered by the useToggle hook.</p>
                    <button onClick={toggleOpen} style={{ marginTop: '8px' }}>Close</button>
                </div>
            )}
        </div>
    );
}

export default Modal;
