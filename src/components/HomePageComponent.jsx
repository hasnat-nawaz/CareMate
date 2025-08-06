import React from 'react'
import {Link} from "react-router-dom"

const HomePageComponent = () => {
    return (
        <div className="homepage-container">
            <h1>Welcome to CareMate</h1>

            <p>
                Your AI-powered health assistant — a smart, reliable companion for checking symptoms, monitoring BMI, analyzing food nutrients, and getting personalized wellness insights, all in one place.
            </p>

            <div className="card-section">
                <Link to={'/chatbot'} style={{ textDecoration: 'none' }}>
                    <div className="card">Go to Chatbot</div>
                </Link>
                <Link to={'/nutrition'} style={{ textDecoration: 'none' }}>
                    <div className="card">Nutrition</div>
                </Link>
                <Link to={'/bmi'} style={{ textDecoration: 'none' }}>
                    <div className="card">Check BMI</div>
                </Link>
            </div>
        </div>

    )
}

export default HomePageComponent
