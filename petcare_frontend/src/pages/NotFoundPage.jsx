import { useNavigate } from 'react-router-dom'

function NotFoundPage() {
    const navigate = useNavigate()

    return (
        <main>
            <section className="not-found-card">
                <p className="not-found-code">404</p>

                <h2>Page not found</h2>

                <p>
                    The page you are looking for does not exist or may have been moved.
                </p>

                <button onClick={() => navigate('/')}>
                    Go Home
                </button>
            </section>
        </main>
    )
}

export default NotFoundPage