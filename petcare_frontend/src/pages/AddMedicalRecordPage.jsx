import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MedicalRecordService from '../services/MedicalRecordService'
import PetService from '../services/PetService'
import { getApiErrorMessage } from '../utils/errorUtils'

function AddMedicalRecordPage() {
    const navigate = useNavigate()

    const [pets, setPets] = useState([])

    const [medicalRecord, setMedicalRecord] = useState({
        visitDate: '',
        reason: '',
        diagnosis: '',
        treatment: '',
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

        setMedicalRecord({
            ...medicalRecord,
            [name]: value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')

        try {
            await MedicalRecordService.create({
                ...medicalRecord,
                petId: Number(medicalRecord.petId),
            })

            navigate('/medical-records')
        } catch (error) {
            console.error(error)

            setError(
                getApiErrorMessage(
                    error,
                    'Unable to add medical record. Please check the entered information.'
                )
            )
        }
    }

    return (
        <main>
            <section>
                <div className="page-header">
                    <div>
                        <h2>Add Medical Record</h2>
                        <p>Enter the new medical record information.</p>
                    </div>
                </div>

                <form className="entity-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="petId">Pet *</label>

                            <select
                                id="petId"
                                name="petId"
                                value={medicalRecord.petId}
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
                            <label htmlFor="visitDate">Visit date *</label>

                            <input
                                id="visitDate"
                                name="visitDate"
                                type="date"
                                value={medicalRecord.visitDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="reason">Reason *</label>

                        <input
                            id="reason"
                            name="reason"
                            value={medicalRecord.reason}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="diagnosis">Diagnosis</label>

                        <textarea
                            id="diagnosis"
                            name="diagnosis"
                            rows="3"
                            value={medicalRecord.diagnosis}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="treatment">Treatment</label>

                        <textarea
                            id="treatment"
                            name="treatment"
                            rows="3"
                            value={medicalRecord.treatment}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="notes">Notes</label>

                        <textarea
                            id="notes"
                            name="notes"
                            rows="4"
                            value={medicalRecord.notes}
                            onChange={handleChange}
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <div className="form-actions">
                        <button type="submit">
                            Save Medical Record
                        </button>

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() => navigate('/medical-records')}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default AddMedicalRecordPage