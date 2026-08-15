import { useEffect, useState } from "react";
import PetService from "../services/PetService";
import { useNavigate } from "react-router-dom";
import { formatValue } from "../utils/formatters";

function PetsPage() {

    const navigate = useNavigate();

    const [pets, setPets] = useState([]);

    useEffect(() => {

        loadPets();

    }, []);

    const loadPets = async () => {

        try {

            const data = await PetService.getAll();

            setPets(data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleDelete = async (pet) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${pet.name}?`
        )

        if (!confirmed) return

        try {
            await PetService.remove(pet.id)
            await loadPets()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <main>
            <section>
                <div className="page-header">
                    <div>
                        <h2>Pets</h2>
                        <p>Manage your pets.</p>
                        <small>{pets.length} pets available</small>
                    </div>

                    <button onClick={() => navigate('/pets/new')}>
                        + Add Pet
                    </button>
                </div>

                {pets.length === 0 ? (
                    <p>No pets found.</p>
                ) : (
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Species</th>
                                    <th>Breed</th>
                                    <th>Gender</th>
                                    <th>Microchip Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {pets.map((pet) => (
                                    <tr key={pet.id}>
                                        <td>{pet.name}</td>
                                        <td>{pet.species}</td>
                                        <td>{pet.breed || "-"}</td>
                                        <td>{formatValue(pet.gender)}</td>
                                        <td>{formatValue(pet.microchipStatus)}</td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="secondary-button"
                                                    onClick={() => navigate(`/pets/${pet.id}`)}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="danger-button"
                                                    onClick={() => handleDelete(pet)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    )
}

export default PetsPage;