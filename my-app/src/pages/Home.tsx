 import supabase from '../config/supabaseClient';
 import { useEffect, useState } from 'react';
 import '../index.css';
 // Components
 import SmoothieCard from '../components/SmoothieCard';

 interface Smoothie {
        id: number;
        title: string;
        method: string;
        rating: number;
        allergen: string[];
        ingredients: string[];
 }

 const Home = () => {
    console.log(supabase);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [smoothies, setSmoothies] = useState<Smoothie[] | null>(null);

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

    return (
        <div className="page home">
            {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <div className="smoothies">
            {/* order-by buttons */}
        <div className="smoothie-grid">
        {smoothies.map(smoothie => (
            <SmoothieCard key={smoothie.id} smoothie={smoothie} />
        
        ))}
        </div>
        
        </div>
    )}
        </div>
        )
 }

export default Home;  