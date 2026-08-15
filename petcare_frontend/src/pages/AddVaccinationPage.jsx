import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PetService from '../services/PetService'
import VaccinationService from '../services/VaccinationService'
import { getApiErrorMessage } from '../utils/errorUtils'

function AddVaccinationPage() {
    const navigate = useNavigate()

    const [pets, setPets] = useState([])

    const [vaccination, setVaccination] = useState({
        vaccineName: '',
        vaccinationDate: '',
        nextDueDate: '',
        batchNumber: '',
        notes: '',
        petId: '',
    })

    const [error, setError] = useState('')

    useEffect(() => {
        loadPets()
    }, [])

    const loadPets = async () => {
        try {
            const data = await PetService.getAll()
            setPets(data)
        } catch (error) {
            console.error(error)
            setError('Unable to load pets.')
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setVaccination({
            ...vaccination,
            [name]: value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')

        try {
            await VaccinationService.create({
                ...vaccination,
                petId: Number(vaccination.petId),
            })

            navigate('/vaccinations')
        } catch (error) {
            console.error(error)

            setError(
                getApiErrorMessage(
                    error,
                    'Unable to add vaccination. Please check the entered information.'
                )
            )
        }
    }

    return (
        <main>
            <section>
                <div className="page-header">
                    <div>
                        <h2>Add Vaccination</h2>
                        <p>Enter the new vaccination information.</p>
                    </div>
                </div>

                <form className="entity-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="petId">Pet *</label>

                            <select
                                id="petId"
                                name="petId"
                                value={vaccination.petId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select pet</option>

                                {pets.map((pet) => (
                                    <option key={pet.id} value={pet.id}>
                                        {pet.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="vaccineName">Vaccine name *</label>

                            <input
                                id="vaccineName"
                                name="vaccineName"
                                value={vaccination.vaccineName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="vaccinationDate">Vaccination date *</label>

                            <input
                                id="vaccinationDate"
                                name="vaccinationDate"
                                type="date"
                                value={vaccination.vaccinationDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nextDueDate">Next due date</label>

                            <input
                                id="nextDueDate"
                                name="nextDueDate"
                                type="date"
                                value={vaccination.nextDueDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="batchNumber">Batch number</label>

                            <input
                                id="batchNumber"
                                name="batchNumber"
                                value={vaccination.batchNumber}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="notes">Notes</label>

                        <textarea
                            id="notes"
                            name="notes"
                            rows="4"
                            value={vaccination.notes}
                            onChange={handleChange}
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <div className="form-actions">
                        <button type="submit">Save Vaccination</button>

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() => navigate('/vaccinations')}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default AddVaccinationPage