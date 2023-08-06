import React from 'react';
import '../index.css';

interface Smoothie {
    id: number;
    title: string;
    method: string;
    rating: number;
    allergen: string[];
    ingredients: string[];
}

interface SmoothieCardProps {
    smoothie: Smoothie;
}


const SmoothieCard: React.FC<SmoothieCardProps> = ( { smoothie }) => {
    return (
        <div className="smoothie-card">
            <h3>{smoothie.title}</h3>
            <p>{smoothie.method}</p>
            <p>{smoothie.rating}</p>
            <p>{smoothie.allergen}</p>
            <p>{smoothie.ingredients}</p>
            <div className="rating">{smoothie.rating}</div>
        </div>
    )
}

export default SmoothieCard;