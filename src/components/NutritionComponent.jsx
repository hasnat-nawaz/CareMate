import { useState } from 'react'
import axios from 'axios'
import NutritionCard from './NutritionCard'

const NutritionComponent = () => {

    const [data, setData] = useState(null)
    const [animate, setAnimate] = useState(0)
    const [loading, setLoading] = useState(false)
    const apiKey = import.meta.env.VITE_NINJAS_API_KEY;

    function handleSubmit(event) {
        event.preventDefault()
        event.target.elements['food-input'].blur()
        setLoading(true)
        setAnimate(prev => prev + 1)
        setData(null)
        document.getElementById('nutritional-details').scrollIntoView({ behavior: 'smooth' })
        const food = event.target.elements['food-input'].value
        axios.get(`https://api.api-ninjas.com/v1/nutrition?query=${food}`, {
            headers: {
                'X-Api-Key': apiKey
            }
        })
            .then(response => {
                if (response.data.length === 0) {
                    setData([])
                } else {
                    setData(response.data)
                }
                setLoading(false)
            })
            .catch(error => {
                console.error('Error:', error);
                setData("Error fetching data")
                setLoading(false)
            })
        event.target.elements['food-input'].value = ''
    }

    return (
        <>
            <div className='nutrition-header'>
                <h1>Enter Food for Nutrient Information</h1>
                <p>Discover the nutritional details of your meals and ingredients.</p>
            </div>
            <form className='nutrition-form' onSubmit={handleSubmit}>
                <input type='text' placeholder='Enter Food' required name='food-input' />
                <button type='submit'>Get Nutrients Details</button>
            </form>
            <div id='nutritional-details'>
                <h1>Nutritional Information</h1>
                {loading && <p className="loading-text">Fetching Data </p>}
                {!loading && data && data.length === 0 && (
                    <p className="no-data-text">No data found. Please try another food item.</p>
                )}
                {!loading && Array.isArray(data) && data.length > 0 &&
                    <div className="cards-container animate" key={animate}>
                        {
                            data.map((items, index) => (
                                <NutritionCard key={index} data={items} />
                            ))
                        }
                    </div>}
            </div>
        </>
    )
}

export default NutritionComponent
