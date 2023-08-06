import supabase from '../config/supabaseClient';
import { useEffect, useState } from 'react';
import '../index.css';
// Components
import SmoothieCard from '../components/SmoothieCard';

interface Smoothie {
    id: number;
    title: string;
    rating: number;
    allergen: string[];
    ingredients: string[];
}

const Home = () => {
    console.log(supabase);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [smoothies, setSmoothies] = useState<Smoothie[] | null>(null);
    const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);

    useEffect(() => {
        const fetchSmoothies = async () => {
            const { data, error } = await supabase
                .from('smoothies')
                .select()

            if (error) {
                setFetchError('Could not fetch the smoothies')
                setSmoothies(null)
                console.log(error)
            }
            if (data) {
                setSmoothies(data)
                setFetchError(null)
            }
        }

        fetchSmoothies()

    }, [])

    const handleAllergensChange = (allergen: string) => {
        setSelectedAllergens((prev) =>
            prev.includes(allergen) ? prev.filter((item) => item !== allergen) : [...prev, allergen]
        );
    };

    return (
        <div className="page home">
            {fetchError && (<p>{fetchError}</p>)}
            {smoothies && (
                <div className="smoothies">
                    {/* order-by buttons */}
                    {/* Add checkboxes for allergen */}
                    <div className="allergen-filter">
                        {['gluten', 'nuts', 'dairy', 'soy'].map((allergen) => (
                            <label>
                                <input
                                    type="checkbox"
                                    value={allergen}
                                    checked={selectedAllergens.includes(allergen)}
                                    onChange={() => handleAllergensChange(allergen)}
                                />
                                {allergen.charAt(0).toUpperCase() + allergen.slice(1)}
                            </label>
                        ))}
                    </div>
                    <div className="smoothie-grid">
                        {smoothies
                            .filter((smoothie) => selectedAllergens.every((allergen) => smoothie.allergen.includes(allergen)))
                            .map((smoothie) => (
                                <SmoothieCard key={smoothie.id} smoothie={smoothie} />

                            ))}
                    </div>

                </div>
            )}
        </div>
    );
};

export default Home;  