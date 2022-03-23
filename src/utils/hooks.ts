import React, { useState, useEffect } from 'react';

export function useContainerDimensions(myRef: React.RefObject<any>) {
    const [dimensions, setDimensions] = useState({ widthDiv: 0, heightDiv: 0 });

    useEffect(() => {
        const getDimensions = () => ({
            widthDiv: (myRef && myRef.current.offsetWidth) || 0,
            heightDiv: (myRef && myRef.current.offsetHeight) || 0,
        });

        const handleResize = () => {
            setDimensions(getDimensions());
        };

        if (myRef.current) {
            setDimensions(getDimensions());
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [myRef]);

    return dimensions;
}