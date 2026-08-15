import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()

    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username'),
    })

    const getLinkClass = ({ isActive }) =>
        isActive ? 'nav-link active' : 'nav-link'

    useEffect(() => {
        const updateAuth = () => {
            setAuth({
                token: localStorage.getItem('token'),
                username: localStorage.getItem('username'),
            })
        }

        window.addEventListener('authChanged', updateAuth)

        return () => {
            window.removeEventListener('authChanged', updateAuth)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')

        window.dispatchEvent(new Event('authChanged'))

        navigate('/')
    }

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <NavLink to="/" className={getLinkClass}>
                    Home
                </NavLink>

                {auth.token ? (
                    <>
                        <NavLink to="/dashboard" className={getLinkClass}>
                            Dashboard
                        </NavLink>

                        <NavLink to="/pets" className={getLinkClass}>
                            Pets
                        </NavLink>

                        <NavLink to="/owners" className={getLinkClass}>
                            Owners
                        </NavLink>

                        <NavLink to="/vaccinations" className={getLinkClass}>
                            Vaccinations
                        </NavLink>

                        <NavLink to="/medical-records" className={getLinkClass}>
                            Medical Records
                        </NavLink>

                        <div className="navbar-auth">
                            <span className="navbar-user">
                                Hello, {auth.username}
                            </span>

                            <button
                                type="button"
                                className="secondary-button"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="navbar-public-actions">
                        <NavLink to="/register" className="register-link">
                            Register
                        </NavLink>

                        <NavLink to="/login" className="login-link">
                            Login
                        </NavLink>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar