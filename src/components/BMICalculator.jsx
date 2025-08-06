import { useState } from 'react'

const BMICalculator = () => {

    const [bmi, setBmi] = useState({ value: null, category: null })



    function calculateBMI(weightKg, heightCm) {
        const heightM = heightCm / 100;       
        const bmi = weightKg / (heightM * heightM);  
        return bmi.toFixed(1);               
    }

    function getBMICategory(bmi) {
        if (bmi < 18.5) return "Underweight";
        if (bmi < 24.9) return "Normal weight";
        if (bmi < 29.9) return "Overweight";
        return "Obese";
    }

    function handleSubmit(event) {
        event.preventDefault()
        event.target.elements['weight'].blur()
        event.target.elements['height'].blur()
        let weight = event.target.elements.weight.value;
        let height = event.target.elements.height.value;
        const bmi = calculateBMI(weight ,height)
        const category = getBMICategory(bmi)
        setBmi({ value: bmi, category: category })
        event.target.elements.weight.value = ''
        event.target.elements.height.value = ''
        document.getElementById('bmi-details').scrollIntoView({ behavior: 'smooth' })
    }


    return (
        <>
            <div className="bmi-header">
                <h1>BMI Calculator</h1>
                <p>Discover your Body Mass Index with our easy-to-use BMI calculator.</p>
            </div>
            <form className='bmi-form' onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor='weight'>Weight
                        <input required name='weight' type='number' placeholder='Enter weight in kg' />
                    </label>
                    <label htmlFor='height'>Height
                        <input required name='height' type='number' placeholder='Enter height in cm' />
                    </label>
                </div>
                <button type='submit'>Submit</button>
            </form>

            <div id='bmi-details'>
                <h1>Results</h1>
                <hr />
                {bmi.value && <div className="result-container">
                    <div>
                        <h2>BMI</h2>
                        <h2>{bmi.value}</h2>
                    </div>
                    <div>
                        <h2>Category</h2>
                        <h2>{bmi.category}</h2>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default BMICalculator