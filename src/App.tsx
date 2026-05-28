// src/App.tsx
// The root component of the application.
// It composes all the feature demos together in one place.

import type { JSX } from 'react';
import { lazy, Suspense, useState } from 'react';
import Button from './Button';
import Card from './Card';
import Counter from './Counter';
import LoginForm from './LoginForm';
import SearchBox from './SearchBox';
import List from './List';
import Modal from './Modal';
import ThemePicker from './ThemePicker';
import MemoDemo from './MemoDemo';
import ProductList from './ProductList';    
import UserBadge from './features/auth/components/UserBadge';
import {config} from './config';
import type { ProfilerOnRenderCallback } from 'react';
import { Profiler } from 'react';




// React.lazy delays loading ProductDetails until it is actually needed.
// The import() returns a Promise — React resolves it and renders the component.
// This is called "code splitting" — only download code when the user needs it.
const ProductDetails = lazy(() => import('./ProductDetails'));
const onRenderCallback: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
) => {
    if (import.meta.env.DEV){
        console.log(`[Profiler: ${id}] | ${phase} | ${actualDuration.toFixed(2)}ms `)
    }
};

// Defining the interface at module level (outside the component) is best practice.
// It keeps the component body clean and makes the type reusable elsewhere.
interface Fruit {
    name: string;
    emoji: string;
}

// JSX.Element is the return type of any component that renders visible UI.
function App(): JSX.Element {
    const fruits: Fruit[] = [
        { name: 'Apple', emoji: '🍎' },
        { name: 'Banana', emoji: '🍌' },
        { name: 'Cherry', emoji: '🍒' },
    ];

    const cities: string[] = ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria'];

    // useState<number | null> means selectedProduct is either a product ID or null (nothing selected).
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);


    return (
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ color: '#8B0000', textAlign: 'center' , marginBottom: '24px'}}>{config.appName}</h1>

            {/* Passing a string prop and a callback function prop to Button */}
            
            <Card title="Welcome">
                <p>This is a typed React component with a children prop.</p>
                <Button
                    text="Say Hello"
                    onclick={() => alert('Hello from TypeScript React!')}
                />
            </Card>
            <UserBadge/>

            {/* The optional 'disabled' prop defaults to false inside Button */}
            <Card title="Disabled Button Example">
                <p>This button is disabled using the optional prop.</p>
                <Button
                    text="Cannot Click Me"
                    onclick={() => {}}
                    disabled={true}
                />
            </Card>

            <Card title="Counter">
                <Counter />
            </Card>

            <Card title="Login Form">
                <LoginForm />
            </Card>

            {/* onSearch is a callback — App decides what to do with the search term */}
            <Card title="Search Box (useRef)">
                <SearchBox onSearch={(term) => console.log('Searching:', term)} />
            </Card>

            {/* List<Fruit> tells TypeScript the items array contains Fruit objects */}
            <Card title="Generic List — Fruits (object array)">
                <List<Fruit>
                    items={fruits}
                    renderItem={(fruit) => `${fruit.emoji} ${fruit.name}`}
                />
            </Card>

            {/* The same List component works with a string array — that is the power of generics */}
            <Card title="Generic List — Cities (string array)">
                <List<string>
                    items={cities}
                    renderItem={(city) => city}
                />
            </Card>

            <Card title="Modal with useToggle">
                <Modal />
            </Card>

            <Card title="Theme with useLocalStorage">
                <ThemePicker />
            </Card>

            <Card title="React.memo Demo">
                <MemoDemo />
            </Card>

        <Profiler id='ProductList' onRender={onRenderCallback}>
            <Card title="Product List (useMemo + useCallback + memo)">
                <ProductList />
            </Card>
        </Profiler>
            

            {/* Suspense shows the fallback UI while the lazy component's JS is being downloaded */}
            <Card title="Lazy Loaded Demo">
                <button
                    onClick={() => setSelectedProduct(1)}
                    style={{
                        padding: '8px 16px',
                        background: '#8B0000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    View Product Details
                </button>
                {selectedProduct !== null && (
                    <Suspense fallback={<div>Loading product details...</div>}>
                        <ProductDetails
                            productId={selectedProduct}
                            onClose={() => setSelectedProduct(null)}
                        />
                    </Suspense>
                )}
            </Card>
        </div>
    );
}

export default App;
