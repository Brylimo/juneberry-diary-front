import { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
            setIsPending(false);
        }, delay);

        setIsPending(true);

        return () => {
            clearTimeout(timer);
        }
    }, [value, delay]);
    return [isPending, debouncedValue];
};

export default useDebounce;