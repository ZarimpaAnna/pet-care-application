import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PetService from '../services/PetService'
import { getApiErrorMessage } from '../utils/errorUtils'

function AddPetPage() {
    const navigate = useNavigate()

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
    })

    const [error, setError] = useState('')

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
            await PetService.create(pet)

            navigate('/pets')
        } catch (error) {
            console.error(error)

            setError(
                getApiErrorMessage(
                    error,
                    'Unable to add pet. Please check the entered information.'
                )
            )
        }
    }

    return (
        <main>
            <section>
                <div className="page-header">
                    <div>
                        <h2>Add Pet</h2>
                        <p>Enter the new pet information.</p>
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
                            <label htmlFor="microchipNumber">
                                Microchip number
                            </label>
                            <input
                                id="microchipNumber"
                                name="microchipNumber"
                                value={pet.microchipNumber}
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

                    <div className="form-group">
                        <label htmlFor="photoUrl">Photo URL</label>

                        <input
                            id="photoUrl"
                            name="photoUrl"
                            type="text"
                            placeholder="e.g /pets/Pico.jpeg"
                            value={pet.photoUrl}
                            onChange={handleChange}
                        />
                    </div>

                    {error && (
                        <p className="error-message">{error}</p>
                    )}

                    <div className="form-actions">
                        <button type="submit">
                            Save Pet
                        </button>

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() => navigate('/pets')}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default AddPetPage