import React, { useEffect, useState } from 'react';
import { IRating } from './type';
import './style.css'

const Rating: React.FC<IRating> = ({ value }) => {
    const roundedValue = parseFloat(value.toFixed(2));

    const [width, setWidth] = useState(0);
    const getColor = (value: number) => {
        if (value >= 8) return 'bg-green-500';
        else if (value >= 5) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    useEffect(() => {
        const percentage = Math.max(0, Math.min(100, (value / 10) * 100));
        setTimeout(() => setWidth(percentage), 100);
    }, [value]);

    return (
        <div className="rating">
            <p>Rating: {roundedValue} / 10</p>
        </div>
    );
};

export default Rating;
