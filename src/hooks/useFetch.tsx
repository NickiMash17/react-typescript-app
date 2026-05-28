// src/hooks/useFetch.tsx
// A generic hook for fetching data from any URL.
// <T> is a type parameter — the caller specifies what type the JSON response should be.

import { useState, useEffect } from 'react';

// FetchResult<T> bundles the three states every fetch operation goes through:
// loading (waiting), data (success), error (failure).
interface FetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

function useFetch<T>(url: string): FetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect re-runs whenever the URL changes, keeping the data in sync.
    useEffect(() => {
        // Async functions cannot be passed directly to useEffect,
        // so we define and immediately call one inside.
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);

                // Check for HTTP errors (404, 500, etc.) BEFORE reading the body.
                // Throwing here sends control straight to the catch block.
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                // Parse the JSON body and store it in state.
                const json: T = await response.json();
                setData(json);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                // finally always runs — clears the loading spinner on both success and failure.
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}

export default useFetch;
