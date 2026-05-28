// src/ProductDetails.tsx
// This component is loaded lazily via React.lazy() in App.tsx.
// Its JavaScript bundle is only downloaded when the user clicks "View Product Details".
// This technique is called code splitting — it keeps the initial page load fast.

interface ProductDetailsProps {
    productId: number;
    onClose: () => void;
}

function ProductDetails({ productId, onClose }: ProductDetailsProps) {
    return (
        <div
            style={{
                border: '2px solid #8B0000',
                padding: '20px',
                borderRadius: '8px',
                marginTop: '12px',
                background: '#FFF9F9',
            }}
        >
            <h3 style={{ color: '#8B0000' }}>Product #{productId} — Full Details</h3>
            <p>This component was lazy loaded — its JavaScript was only downloaded when you clicked View Details.</p>
            <p>In a real app, this would contain charts, images, reviews, and other heavy content.</p>
            <button
                onClick={onClose}
                style={{
                    marginTop: '12px',
                    padding: '8px 16px',
                    background: '#8B0000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Close Details
            </button>
        </div>
    );
}

export default ProductDetails;
