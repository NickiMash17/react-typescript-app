import {Component} from 'react';
import type {ReactNode} from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state = {
        hasError: false,
        error: null,
    };

    static getDerivedStateFromError(error: Error) {
        return {
            hasError: true,
            error,
        };
    }
componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary] Caught:', error.message);
    console.error('[ErrorBoundary] Component stack:', info.componentStack);
}

render() {
 if (this.state.hasError) {
        return this.props.fallback ?? (
            <div 
            style={{
                border: '2px solid #8B0000',
                padding: '24px',
                borderRadius: '8px',
                margin: '16x',
                background: '#FFF9F9',
            }}>
                <h2 style={{ color: '#8B0000' }}>Something went wrong.</h2>
                <p>This section crashed. Please refresh the page</p>
                <button onClick={() => this.setState({hasError: false, error: null})}
                style={{ 
                color: 'white', 
                padding: '8px 20px', 
                background: '#8B0000', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer',}}> 
                Try Again
                </button>              
            </div>

        );
    }

    return this.props.children;
}
}

export default ErrorBoundary;

