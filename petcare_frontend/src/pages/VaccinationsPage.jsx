import { useEffect, useState } from 'react'
import VaccinationService from '../services/VaccinationService'
import { useNavigate } from "react-router-dom";
import { getStatusDisplay } from '../utils/formatters'

function VaccinationsPage() {
    const navigate = useNavigate();
    const [vaccinations, setVaccinations] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        loadVaccinations()
    }, [])

    const loadVaccinations = async () => {
        try {
            const data = await VaccinationService.getAll()
            setVaccinations(data)
        } catch (error) {
            console.error(error)
            setError('Unable to load vaccinations.')
        }
    }

    const handleDelete = async (vaccination) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${vaccination.vaccineName}?`
        )

        if (!confirmed) return

        try {
            await VaccinationService.remove(vaccination.id)
            await loadVaccinations()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <main>
            <section>
                <div className="page-header">
                    <div>
                        <h2>Vaccinations</h2>
                        <p>View vaccinations information.</p>
                        <small>{vaccinations.length} vaccinations available</small>
                    </div>
                    <button onClick={() => navigate('/vaccinations/new')}>
                        + Add Vaccination
                    </button>
                </div>

                {error && <p className="error-message">{error}</p>}

                {vaccinations.length === 0 && !error ? (
                    <p>No vaccinations found.</p>
                ) : (
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Pet</th>
                                    <th>Vaccine Name</th>
                                    <th className="date-column">Vaccination Date</th>
                                    <th className="date-column">Next Due Date</th>
                                    <th>Status</th>
                                    <th>Batch Number</th>
                                    <th>Notes</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {vaccinations.map((vaccination) => (
                                    <tr key={vaccination.id}>
                                        <td>{vaccination.pet.name || '-'}</td>
                                        <td>{vaccination.vaccineName || '-'}</td>
                                        <td className="date-column">{vaccination.vaccinationDate || '-'}</td>
                                        <td className="date-column">{vaccination.nextDueDate || '-'}</td>
                                        <td>{getStatusDisplay(vaccination.status)}</td>
                                        <td>{vaccination.batchNumber || '-'}</td>
                                        <td>{vaccination.notes || '-'}</td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="secondary-button"
                                                    onClick={() => navigate(`/vaccinations/${vaccination.id}`)}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="danger-button"
                                                    onClick={() => handleDelete(vaccination)}
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

export default VaccinationsPage