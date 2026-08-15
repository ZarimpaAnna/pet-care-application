import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MedicalRecordService from '../services/MedicalRecordService'
import PetService from '../services/PetService'
import { getApiErrorMessage } from '../utils/errorUtils'

function EditMedicalRecordPage() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [pets, setPets] = useState([])
    const [medicalRecord, setMedicalRecord] = useState({
        petId: '',
        visitDate: '',
        reason: '',
        diagnosis: '',
        treatment: '',
        notes: '',
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        loadPageData()
    }, [])

    const loadPageData = async () => {
        try {
            const [petsData, medicalRecordData] =
                await Promise.all([
                    PetService.getAll(),
                    MedicalRecordService.getById(id),
                ])

            setPets(petsData)

            setMedicalRecord({
                petId:
                    medicalRecordData.pet?.id ||
                    medicalRecordData.petId ||
                    '',
                visitDate:
                    medicalRecordData.visitDate || '',
                reason:
                    medicalRecordData.reason || '',
                diagnosis:
                    medicalRecordData.diagnosis || '',
                treatment:
                    medicalRecordData.treatment || '',
                notes:
                    medicalRecordData.notes || '',
            })
        } catch (error) {
            console.error(error)
            setError(
                'Unable to load medical record information.'
            )
        } finally {
            setLoading(false)
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
            await MedicalRecordService.update(id, {
                ...medicalRecord,
                petId: Number(medicalRecord.petId),
            })

            navigate(`/medical-records/${id}`)
        } catch (error) {
            console.error(error)

            setError(
                getApiErrorMessage(
                    error,
                    'Unable to update medical record. Please check the entered information.'
                )
            )
        }
    }

    if (loading) {
        return (
            <main>
                <section>
                    <p>Loading medical record...</p>
                </section>
            </main>
        )
    }

    return (
        <main>
            <section>
                <div className="page-header">
                    <div>
                        <h2>Edit Medical Record</h2>
                        <p>Update the medical record information.</p>
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
                            <label htmlFor="visitDate">
                                Visit date *
                            </label>

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
                        <label htmlFor="diagnosis">
                            Diagnosis
                        </label>

                        <textarea
                            id="diagnosis"
                            name="diagnosis"
                            rows="3"
                            value={medicalRecord.diagnosis}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="treatment">
                            Treatment
                        </label>

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

                    {error && (
                        <p className="error-message">{error}</p>
                    )}

                    <div className="form-actions">
                        <button type="submit">Save Changes</button>

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() =>
                                navigate(`/medical-records/${id}`)
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

export default EditMedicalRecordPage