import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PetService from '../services/PetService'
import { formatValue } from '../utils/formatters'

function PetDetailsPage() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [pet, setPet] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        loadPet()
    }, [])

    const loadPet = async () => {
        try {
            const data = await PetService.getById(id)
            setPet(data)
        } catch (error) {
            console.error(error)
            setError('Unable to load pet details.')
        }
    }

    return (
        <main>
            <section>
                <div className="page-header">
                    <div>
                        <h2>Pet Details</h2>
                        <p>View the selected pet information.</p>
                    </div>
                </div>

                {error && <p className="error-message">{error}</p>}

                {!pet && !error ? (
                    <p>Loading pet...</p>
                ) : (
                    pet && (
                        <div className="pet-details-layout">
                            <div className="pet-photo-section">
                                {pet.photoUrl ? (
                                    <img
                                        src={pet.photoUrl}
                                        alt={pet.name}
                                        className="pet-photo"
                                        onError={(event) => {
                                            event.currentTarget.style.display = 'none'
                                        }}
                                    />
                                ) : (
                                    <div className="pet-photo-placeholder">
                                        No photo available
                                    </div>
                                )}
                            </div>

                            <div className="pet-details-content">
                                <div className="details-section">
                                    <h3>General Information</h3>

                                    <div className="details-grid">
                                        <p>
                                            <strong>Name:</strong> {pet.name || '-'}
                                        </p>

                                        <p>
                                            <strong>Species:</strong> {pet.species || '-'}
                                        </p>

                                        <p>
                                            <strong>Breed:</strong> {pet.breed || '-'}
                                        </p>

                                        <p>
                                            <strong>Gender:</strong> {formatValue(pet.gender)}
                                        </p>

                                        <p>
                                            <strong>Birth Date:</strong> {pet.birthDate || '-'}
                                        </p>

                                        <p>
                                            <strong>Color:</strong> {pet.color || '-'}
                                        </p>

                                        <p>
                                            <strong>Sterilized:</strong>{' '}
                                            {pet.sterilized ? 'Yes' : 'No'}
                                        </p>
                                    </div>
                                </div>

                                <div className="details-section">
                                    <h3>Identification</h3>

                                    <div className="details-grid">
                                        <p>
                                            <strong>Microchip Number:</strong>{' '}
                                            {pet.microchipNumber || '-'}
                                        </p>

                                        <p>
                                            <strong>Microchip Status:</strong>{' '}
                                            {formatValue(pet.microchipStatus)}
                                        </p>
                                    </div>
                                </div>

                                <div className="details-section">
                                    <h3>Health Status</h3>

                                    <p>
                                        <strong>Overdue Vaccinations:</strong>{' '}
                                        {pet.hasOverdueVaccinations ? 'Yes' : 'No'}
                                    </p>
                                </div>

                                <div className="details-section">
                                    <h3>Notes</h3>

                                    <p>{pet.notes || 'No notes available.'}</p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => navigate(`/pets/${pet.id}/edit`)}
                                >
                                    Edit Pet
                                </button>

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="secondary-button"
                                        onClick={() => navigate('/pets')}
                                    >
                                        Back to Pets
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </section>
        </main>
    )
}

export default PetDetailsPage