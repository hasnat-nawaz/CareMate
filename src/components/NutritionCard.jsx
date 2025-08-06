import React from 'react'

const NutritionCard = (props) => {
    const data = props.data
    return (
        <div className="nutrition-card">
            <h2>{data.name}</h2>
            <div className="values-container">
                <div className="value-names">
                    <p><strong>Total Fat:</strong></p>
                    <p><strong>Saturated Fat:</strong></p>
                    <p><strong>Sodium:</strong></p>
                    <p><strong>Potassium:</strong></p>
                    <p><strong>Cholesterol:</strong></p>
                    <p><strong>Carbohydrates:</strong></p>
                    <p><strong>Fiber:</strong></p>
                    <p><strong>Sugars:</strong></p>
                </div>
                <div className="numerical-values">
                    <p>{data.fat_total_g}g</p>
                    <p>{data.fat_saturated_g}g</p>
                    <p>{data.sodium_mg}mg</p>
                    <p>{data.potassium_mg}mg</p>
                    <p>{data.cholesterol_mg}mg</p>
                    <p>{data.carbohydrates_total_g}g</p>
                    <p>{data.fiber_g}g</p>
                    <p>{data.sugar_g} g</p>
                </div>
            </div>
        </div>
    )
}

export default NutritionCard
