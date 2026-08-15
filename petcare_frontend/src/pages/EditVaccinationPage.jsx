import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PetService from '../services/PetService'
import VaccinationService from '../services/VaccinationService'
import { getApiErrorMessage } from '../utils/errorUtils'

function EditVaccinationPage() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [pets, setPets] = useState([])
    const [vaccination, setVaccination] = useState({
        petId: '',
        vaccineName: '',
        vaccinationDate: '',
        nextDueDate: '',
        batchNumber: '',
        notes: '',
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        loadPageData()
    }, [])

    const loadPageData = async () => {
        try {
            const [petsData, vaccinationData] = await Promise.all([
                PetService.getAll(),
                VaccinationService.getById(id),
            ])

            setPets(petsData)

            setVaccination({
                petId:
                    vaccinationData.pet?.id ||
                    vaccinationData.petId ||
                    '',
                vaccineName: vaccinationData.vaccineName || '',
                vaccinationDate:
                    vaccinationData.vaccinationDate || '',
                nextDueDate:
                    vaccinationData.nextDueDate || '',
                batchNumber:
                    vaccinationData.batchNumber || '',
                notes: vaccinationData.notes || '',
            })
        } catch (error) {
            console.error(error)
            setError('Unable to load vaccination information.')
        } finally {
            setLoading(false)
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
            await VaccinationService.update(id, {
                ...vaccination,
                petId: Number(vaccination.petId),
            })

            navigate(`/vaccinations/${id}`)
        } catch (error) {
            console.error(error)

            setError(
                getApiErrorMessage(
                    error,
                    'Unable to update vaccination. Please check the entered information.'
                )
            )
        }
    }

    if (loading) {
        return (
            <main>
                <section>
                    <p>Loading vaccination...</p>
                </section>
            </main>
        )
    }

    return (
        <main>
            <section>
                <div className="page-header">
                    <div>
                        <h2>Edit Vaccination</h2>
                        <p>Update the vaccination information.</p>
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
                            <label htmlFor="vaccineName">
                                Vaccine name *
                            </label>

                            <input
                                id="vaccineName"
                                name="vaccineName"
                                value={vaccination.vaccineName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="vaccinationDate">
                                Vaccination date *
                            </label>

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
                            <label htmlFor="nextDueDate">
                                Next due date
                            </label>

                            <input
                                id="nextDueDate"
                                name="nextDueDate"
                                type="date"
                                value={vaccination.nextDueDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="batchNumber">
                                Batch number
                            </label>

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

                    {error && (
                        <p className="error-message">{error}</p>
                    )}

                    <div className="form-actions">
                        <button type="submit">Save Changes</button>

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() =>
                                navigate(`/vaccinations/${id}`)
                            }
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default EditVaccinationPage