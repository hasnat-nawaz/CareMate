import {useState} from 'react'
import heart_image from '/src/assets/images/logo.png'
import hamburgericon from '/src/assets/images/hamburger.png'
import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {

    const [dropdown, setDropdown] = useState(false)

    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }

    return (
        <header className='animate'>
            <Link to='/'>
                <div className='header-left'>
                    <div className='logo-container'><img src={heart_image} alt='heart logo' /></div>
                    <span>CareMate</span>
                </div>
            </Link>
            <ul className='nav-bar'>
                <NavLink to='/'><li>Home</li></NavLink>
                <NavLink to='/chatbot'><li>Chatbot</li></NavLink>
                <NavLink to='/nutrition'><li>Nutrition</li></NavLink>
                <NavLink to='/bmi'><li>BMI</li></NavLink>
            </ul>
            <img className='hamburger-icon' onClick={toggleDropdown} src={hamburgericon} alt='dropdown icon' />
            {dropdown && <ul className='dropdown-menu'>
                <NavLink to='/' onClick={toggleDropdown}><li>Home</li></NavLink>
                <NavLink to='/chatbot' onClick={toggleDropdown}><li>Chatbot</li></NavLink>
                <NavLink to='/nutrition' onClick={toggleDropdown}><li>Nutrition</li></NavLink>
                <NavLink to='/bmi' onClick={toggleDropdown}><li>BMI</li></NavLink>
            </ul>}
        </header>
    )
}

export default Navbar
