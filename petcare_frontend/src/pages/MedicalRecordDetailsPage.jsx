import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MedicalRecordService from '../services/MedicalRecordService'

function MedicalRecordDetailsPage() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [medicalRecord, setMedicalRecord] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        loadMedicalRecord()
    }, [])

    const loadMedicalRecord = async () => {
        try {
            const data = await MedicalRecordService.getById(id)

            setMedicalRecord(data)
        } catch (error) {
            console.error(error)
            setError('Unable to load medical record.')
        }
    }

    return (
        <main>
            <section>
                <div className="page-header">
                    <div>
                        <h2>Medical Record Details</h2>
                        <p>View the selected medical record.</p>
                    </div>
                </div>

                {error && <p className="error-message">{error}</p>}

                {!medicalRecord && !error ? (
                    <p>Loading medical record...</p>
                ) : (
                    medicalRecord && (
                        <div className="details-content">
                            <p>
                                <strong>Pet:</strong>{' '}
                                {medicalRecord.pet?.name || '-'}
                            </p>

                            <p>
                                <strong>Visit Date:</strong>{' '}
                                {medicalRecord.visitDate || '-'}
                            </p>

                            <p>
                                <strong>Reason:</strong>{' '}
                                {medicalRecord.reason || '-'}
                            </p>

                            <p>
                                <strong>Diagnosis:</strong>{' '}
                                {medicalRecord.diagnosis || '-'}
                            </p>

                            <p>
                                <strong>Treatment:</strong>{' '}
                                {medicalRecord.treatment || '-'}
                            </p>

                            <p>
                                <strong>Notes:</strong>{' '}
                                {medicalRecord.notes || '-'}
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(`/medical-records/${medicalRecord.id}/edit`)
                                }
                            >
                                Edit Medical Record
                            </button>

                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={() => navigate('/medical-records')}
                                >
                                    Back to Medical Records
                                </button>
                            </div>
                        </div>
                    )
                )}
            </section>
        </main>
    )
}

export default MedicalRecordDetailsPage