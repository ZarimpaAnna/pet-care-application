import { useNavigate } from "react-router-dom";

function HomePage() {

    const navigate = useNavigate();

    const handleCardClick = (route) => {

        const token = localStorage.getItem("token");

        if (token) {
            navigate(route);
        } else {
            navigate("/login");
        }

    };

    return (
        <main>
            <section>
                <h2>Welcome</h2>

                <p>
                    Keep all your pet care information in one place.
                </p>
            </section>

            <section>
                <h2>What you can manage</h2>

                <div className="card-grid">

                    <div className="feature-card" onClick={() => handleCardClick("/pets")}>
                        <h3>🐶 Pets</h3>
                        <p>Create and manage your pets.</p>
                    </div>

                    <div className="feature-card" onClick={() => handleCardClick("/owners")}>
                        <h3>👤 Owners</h3>
                        <p>Store owner information.</p>
                    </div>

                    <div className="feature-card" onClick={() => handleCardClick("/vaccinations")}>
                        <h3>💉 Vaccinations</h3>
                        <p>Track vaccination history.</p>
                    </div>

                    <div className="feature-card" onClick={() => handleCardClick("/medical-records")}>
                        <h3>🩺 Medical Records</h3>
                        <p>Keep veterinary visits organized.</p>
                    </div>

                </div>
            </section>
        </main>
    )
}

export default HomePage