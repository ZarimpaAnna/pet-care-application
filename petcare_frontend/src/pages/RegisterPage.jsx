import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService'
import { getApiErrorMessage } from '../utils/errorUtils'

function RegisterPage() {
    const navigate = useNavigate()

    const [registration, setRegistration] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    })

    const [error, setError] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target

        setRegistration({
            ...registration,
            [name]: value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')

        if (registration.password !== registration.confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        try {
            const {
                confirmPassword,
                ...registrationData
            } = registration

            await AuthService.register(registrationData)

            navigate('/login?registered=true')
        } catch (error) {
            console.error(error)

            setError(
                getApiErrorMessage(
                    error,
                    'Unable to create account. Please check the entered information.'
                )
            )
        }
    }

    return (
        <main>
            <section className="register-card">
                <div className="page-header">
                    <div>
                        <h2>Create Account</h2>
                        <p>Register as a new pet owner.</p>
                    </div>
                </div>

                <form className="entity-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="firstName">First name *</label>

                            <input
                                id="firstName"
                                name="firstName"
                                value={registration.firstName}
                                onChange={handleChange}
                                maxLength={50}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last name *</label>

                            <input
                                id="lastName"
                                name="lastName"
                                value={registration.lastName}
                                onChange={handleChange}
                                maxLength={50}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email *</label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={registration.email}
                                onChange={handleChange}
                                maxLength={50}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone number  *</label>

                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={registration.phoneNumber}
                                onChange={handleChange}
                                maxLength={50}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username *</label>

                            <input
                                id="username"
                                name="username"
                                value={registration.username}
                                onChange={handleChange}
                                maxLength={20}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password *</label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={registration.password}
                                onChange={handleChange}
                                minLength={4}
                                maxLength={20}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">
                                Confirm password *
                            </label>

                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={registration.confirmPassword}
                                onChange={handleChange}
                                minLength={4}
                                maxLength={20}
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="error-message">{error}</p>
                    )}

                    <div className="form-actions">
                        <button type="submit">
                            Create Account
                        </button>

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() => navigate('/')}
                        >
                            Cancel
                        </button>
                    </div>

                    <p className="auth-footer">
                        Already have an account?{' '}
                        <Link to="/login">Login</Link>
                    </p>
                </form>
            </section>
        </main>
    )
}

export default RegisterPage