import { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { getApiErrorMessage } from '../utils/errorUtils'

function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()

    const sessionExpired = searchParams.get('expired') === 'true'
    const registrationCompleted = searchParams.get('registered') === 'true'

    const [error, setError] = useState('')

    useEffect(() => {

        if (localStorage.getItem("token")) {
            navigate("/dashboard");
        }

    }, []);

    const handleLogin = async (event) => {

        event.preventDefault()
        setError('')

        try {

            const response = await AuthService.login(username, password);

            localStorage.setItem("token", response.token);
            localStorage.setItem("username", username);

            window.dispatchEvent(new Event('authChanged'))

            navigate('/dashboard')

        } catch (error) {
            console.error(error)

            setError(
                getApiErrorMessage(
                    error,
                    'Invalid username or password.'
                )
            )
        }

    };

    return (

        <main>

            <section className="login-card">

                <h2>Login</h2>

                <p>Please enter your credentials.</p>

                {sessionExpired && (
                    <p className="info-message">
                        Your session has expired. Please log in again.
                    </p>
                )}

                {registrationCompleted && (
                    <p className="success-message">
                        Your account was created successfully. Please log in.
                    </p>
                )}

                <form onSubmit={handleLogin}>

                    <div className="form-group">

                        <label htmlFor="username">Username</label>

                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label htmlFor="password">Password</label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p className="auth-footer">
                    Don't have an account?{' '}
                    <Link to="/register">Register</Link>
                </p>

            </section>

        </main>

    );

}

export default LoginPage;