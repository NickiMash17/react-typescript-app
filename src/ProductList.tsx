// src/ProductList.tsx
// Demonstrates three performance optimisation tools working together:
//   useMemo     — remembers an expensive computed value; recomputes only when dependencies change.
//   useCallback — remembers a function reference so child components don't get a new prop each render.
//   memo        — wraps a child component so it skips re-rendering when its props are unchanged.

import { useState, memo, useMemo, useCallback } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
}

// Module-level constant — created once when the file loads, never recreated on re-renders.
const PRODUCTS: Product[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.round(Math.random() * 5000 + 1000),
    rating: Math.round(Math.random() * 40 + 40) / 10,
}));

// ProductCard is memoised so it only re-renders when 'product' or 'onAddToCart' change.
const ProductCard = memo(function ProductCard({
    product,
    onAddToCart,
}: {
    product: Product;
    onAddToCart: (id: number) => void;
}) {
    return (
        <div
            style={{
                border: '1px solid #ddd',
                borderRadius: '6px',
                padding: '12px',
                marginBottom: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <div>
                <strong>{product.name}</strong>
                <span style={{ marginLeft: '12px', color: '#888' }}>R{product.price}</span>
                <span style={{ marginLeft: '12px', color: '#FFD700' }}>★ {product.rating}</span>
            </div>
            <button
                onClick={() => onAddToCart(product.id)}
                style={{
                    padding: '4px 10px',
                    background: '#8B0000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Add to Cart
            </button>
        </div>
    );
});

// A union type that restricts sortBy to only these three valid string values.
type SortField = 'name' | 'price' | 'rating';

function ProductList() {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<SortField>('name');
    const [cart, setCart] = useState<number[]>([]);

    // useMemo recalculates only when 'search' or 'sortBy' changes.
    // Without it, filtering and sorting would run on every single render.
    const filteredProducts = useMemo(() => {
        console.log('Filtering and sorting products...');
        return PRODUCTS
            .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => {
                if (sortBy === 'price') return a.price - b.price;
                if (sortBy === 'rating') return b.rating - a.rating;
                return a.name.localeCompare(b.name);
            });
    }, [search, sortBy]);

    // useCallback keeps the same function reference between renders.
    // Without it, ProductCard would receive a brand-new 'onAddToCart' prop every render,
    // defeating the memo optimisation above.
    const handleAddToCart = useCallback((id: number) => {
        setCart(prev => [...prev, id]);
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    style={{
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        flex: '1',
                    }}
                />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortField)}
                    style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                >
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price</option>
                    <option value="rating">Sort by Rating</option>
                </select>
            </div>

            <p style={{ color: '#888', marginBottom: '8px' }}>
                {filteredProducts.length} products | Cart: {cart.length} items
            </p>

            {/* Render only the top 10 results to keep the list manageable */}
            {filteredProducts.slice(0, 10).map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                />
            ))}
        </div>
    );
}

export default ProductList;
