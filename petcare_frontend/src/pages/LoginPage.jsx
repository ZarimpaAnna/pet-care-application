import { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const sessionExpired = searchParams.get('expired') === 'true'
    const registrationCompleted = searchParams.get('registered') === 'true'

    useEffect(() => {

        if (localStorage.getItem("token")) {
            navigate("/dashboard");
        }

    }, []);

    const handleLogin = async () => {

        try {

            const response = await AuthService.login(username, password);

            localStorage.setItem("token", response.token);
            localStorage.setItem("username", username);

            window.dispatchEvent(new Event('authChanged'))

            navigate('/dashboard')

            console.log(localStorage.getItem("token"));

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <main>

            <section className="login-card">

                <h2>Login</h2>

                <p>Please enter your credentials.</p>

                {sessionExpired && (
                    <p className="info-message">
                        Your session has expired. Please log in again..
                    </p>
                )}

                {registrationCompleted && (
                    <p className="success-message">
                        Your account was created successfully. Please log in.
                    </p>
                )}

                <div className="form-group">

                    <label>Username</label>

                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                </div>

                <div className="form-group">

                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </div>

                <button onClick={handleLogin}>
                    Login
                </button>

                <p className="auth-footer">
                    Don't have an account?{' '}
                    <Link to="/register">Register</Link>
                </p>

            </section>

        </main>

    );

}

export default LoginPage;