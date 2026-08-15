import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MedicalRecordService from '../services/MedicalRecordService'

function MedicalRecordsPage() {
    const navigate = useNavigate()

    const [medicalRecords, setMedicalRecords] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        loadMedicalRecords()
    }, [])

    const loadMedicalRecords = async () => {
        try {
            const data = await MedicalRecordService.getAll()

            setMedicalRecords(data)
        } catch (error) {
            console.error(error)
            setError('Unable to load medical records.')
        }
    }

    const handleDelete = async (medicalRecord) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete the medical record for ${medicalRecord.pet?.name || 'this pet'}?`
        )

        if (!confirmed) return

        try {
            await MedicalRecordService.remove(medicalRecord.id)
            await loadMedicalRecords()
        } catch (error) {
            console.error(error)
            setError('Unable to delete medical record.')
        }
    }

    return (
        <main>
            <section>
                <div className="page-header">
                    <div>
                        <h2>Medical Records</h2>
                        <p>View and manage medical records.</p>

                        <small>
                            {medicalRecords.length}{' '}
                            {medicalRecords.length === 1
                                ? 'medical record available'
                                : 'medical records available'}
                        </small>
                    </div>

                    <button onClick={() => navigate('/medical-records/new')}>
                        + Add Medical Record
                    </button>
                </div>

                {error && <p className="error-message">{error}</p>}

                {medicalRecords.length === 0 && !error ? (
                    <p>No medical records found.</p>
                ) : (
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Pet</th>
                                    <th className="date-column">Visit Date</th>
                                    <th>Reason</th>
                                    <th>Diagnosis</th>
                                    <th>Treatment</th>
                                    <th>Notes</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {medicalRecords.map((medicalRecord) => (
                                    <tr key={medicalRecord.id}>
                                        <td>{medicalRecord.pet?.name || '-'}</td>

                                        <td className="date-column">
                                            {medicalRecord.visitDate || '-'}
                                        </td>

                                        <td>{medicalRecord.reason || '-'}</td>
                                        <td>{medicalRecord.diagnosis || '-'}</td>
                                        <td>{medicalRecord.treatment || '-'}</td>
                                        <td>{medicalRecord.notes || '-'}</td>

                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="secondary-button"
                                                    onClick={() =>
                                                        navigate(
                                                            `/medical-records/${medicalRecord.id}`
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>

                                                <button
                                                    className="danger-button"
                                                    onClick={() => handleDelete(medicalRecord)}
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

export default MedicalRecordsPage