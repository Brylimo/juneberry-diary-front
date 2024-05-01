import React, { useRef, useEffect } from 'react';
import ReactDom from 'react-dom';

const useDraggableInPortal = () => {
    const element = useRef(null);

    useEffect(() => {
        element.current = document.getElementById('draggable');
    }, []);

    return render => (provided) => {
        const result = render(provided);
        const style = provided.draggableProps.style;

        if (style.position === 'fixed') {
            return ReactDom.createPortal(result, element.current);
        }

        return result;
    }
}

export default useDraggableInPortal;