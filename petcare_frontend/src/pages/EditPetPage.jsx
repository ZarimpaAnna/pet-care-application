import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PetService from '../services/PetService'
import { getApiErrorMessage } from '../utils/errorUtils'

function EditPetPage() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [pet, setPet] = useState({
        name: '',
        species: '',
        breed: '',
        microchipNumber: '',
        birthDate: '',
        color: '',
        sterilized: false,
        gender: 'UNKNOWN',
        notes: '',
        photoUrl: '',
        // ownerId: '',
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        loadPet()
    }, [])

    const loadPet = async () => {
        try {
            const data = await PetService.getById(id)

            setPet({
                name: data.name || '',
                species: data.species || '',
                breed: data.breed || '',
                microchipNumber: data.microchipNumber || '',
                birthDate: data.birthDate || '',
                color: data.color || '',
                sterilized: data.sterilized ?? false,
                gender: data.gender || 'UNKNOWN',
                notes: data.notes || '',
                photoUrl: data.photoUrl || '',
                // ownerId: data.owner?.id || data.ownerId || '',
            })
        } catch (error) {
            console.error(error)
            setError('Unable to load pet information.')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target

        setPet({
            ...pet,
            [name]: type === 'checkbox' ? checked : value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')

        try {
            await PetService.update(id, pet)

            navigate(`/pets/${id}`)
        } catch (error) {
            console.error(error)

            setError(
                getApiErrorMessage(
                    error,
                    'Unable to update pet. Please check the entered information.'
                )
            )
        }
    }

    if (loading) {
        return (
            <main>
                <section>
                    <p>Loading pet...</p>
                </section>
            </main>
        )
    }

    return (
        <main>
            <section>
                <div className="page-header">
                    <div>
                        <h2>Edit Pet</h2>
                        <p>Update the pet information.</p>
                    </div>
                </div>

                <form className="entity-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="name">Name *</label>
                            <input
                                id="name"
                                name="name"
                                value={pet.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="species">Species *</label>
                            <input
                                id="species"
                                name="species"
                                value={pet.species}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="breed">Breed</label>
                            <input
                                id="breed"
                                name="breed"
                                value={pet.breed}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={pet.gender}
                                onChange={handleChange}
                            >
                                <option value="UNKNOWN">Unknown</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="birthDate">Birth date</label>
                            <input
                                id="birthDate"
                                name="birthDate"
                                type="date"
                                value={pet.birthDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="color">Color</label>
                            <input
                                id="color"
                                name="color"
                                value={pet.color}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="microchipNumber">Microchip number</label>
                            <input
                                id="microchipNumber"
                                name="microchipNumber"
                                value={pet.microchipNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="photoUrl">Photo URL</label>
                            <input
                                id="photoUrl"
                                name="photoUrl"
                                type="text"
                                value={pet.photoUrl}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Sterilized</label>

                            <div className="checkbox-field">
                                <input
                                    id="sterilized"
                                    name="sterilized"
                                    type="checkbox"
                                    checked={pet.sterilized}
                                    onChange={handleChange}
                                />

                                <label htmlFor="sterilized">Yes</label>
                            </div>
                        </div>

                        {/* <div className="form-group">
                            <label htmlFor="ownerId">Owner ID *</label>
                            <input
                                id="ownerId"
                                name="ownerId"
                                type="number"
                                min="1"
                                value={pet.ownerId}
                                onChange={handleChange}
                                required
                            />
                        </div> */}
                    </div>

                    <div className="form-group">
                        <label htmlFor="notes">Notes</label>
                        <textarea
                            id="notes"
                            name="notes"
                            rows="4"
                            value={pet.notes}
                            onChange={handleChange}
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <div className="form-actions">
                        <button type="submit">Save Changes</button>

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() => navigate(`/pets/${id}`)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default EditPetPage