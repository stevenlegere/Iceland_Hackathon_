import supabase from '../config/supabaseClient';
import { useEffect, useState } from 'react';
import '../index.css';
// Components
import NavBar from '../components/NavBar';
import SmoothieCard from '../components/SmoothieCard';

// Interface defining the structure of a Smoothie object
interface Smoothie {
    id: number;
    title: string;
    rating: number;
    allergen: string[];
    ingredients: string[];
}
// Home component displaying a list of smoothies and an allergen filter
const Home: React.FC = () => {
    <NavBar />
    console.log(supabase);
    // State variables to handle smoothie data and allergen filtering
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [smoothies, setSmoothies] = useState<Smoothie[] | null>(null);
    const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);

    // useEffect hook to fetch smoothies from the database on component mount
    useEffect(() => {
        const fetchSmoothies = async () => {
            const { data, error } = await supabase
                .from('smoothies')
                .select()
    // Handle any fetch errors and update state accordingly
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
        // Invoke the fetchSmoothies function
        fetchSmoothies()

    }, [])

    // Function to handle allergen selection and filtering
    const handleAllergensChange = (allergen: string) => {
        setSelectedAllergens((prev) =>
            prev.includes(allergen) ? prev.filter((item) => item !== allergen) : [...prev, allergen]
        );
    };
    // Render the Home component with smoothie data and allergen filter
    return (
        <div className="page home">
          {fetchError && <p>{fetchError}</p>}
          {smoothies && (
            <div className="smoothies">
              {/* Add checkboxes for each allergen */}
              <div className="allergen-filter">
                {['gluten', 'nuts', 'peanuts', 'milk', 'soy', 'egg', 'sesame',].map((allergen) => {
                  const prefixedAllergen = `no ${allergen}`;
                  return (
                    <label key={allergen}>
                      <input
                        type="checkbox"
                        value={allergen}
                        checked={selectedAllergens.includes(allergen)}
                        onChange={() => handleAllergensChange(allergen)}
                      />
                      {prefixedAllergen.charAt(0).toUpperCase() + prefixedAllergen.slice(1)}
                    </label>
                  );
                })}
              </div>
              {/* Filter smoothies based on selected allergens */}
              <div className="smoothie-grid">
                {smoothies
                  .filter((smoothie) => !selectedAllergens.some((allergen) => smoothie.allergen.includes(allergen)))
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