import React from 'react';
import '../index.css';
// Interface defining the structure of a Smoothie object
interface Smoothie {
    id: number;
    title: string;
    rating: number;
    allergen: string[];
    ingredients: string[];
}
// Interface defining the properties for the SmoothieCard component
interface SmoothieCardProps {
    smoothie: Smoothie;
}

// SmoothieCard component to display information about a smoothie
const SmoothieCard: React.FC<SmoothieCardProps> = ( { smoothie }) => {
    return (
        // Container for the smoothie card with the "smoothie-card" class
        <div className="smoothie-card">
            <h3>{smoothie.title}</h3>
            <p>{smoothie.allergen.join(', ')}</p>
            <p>{smoothie.ingredients.join(', ')}</p>
            <div className="rating">{smoothie.rating}</div>
        </div>
    )
}

export default SmoothieCard;