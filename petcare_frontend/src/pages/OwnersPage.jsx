import { useEffect, useState } from 'react'
import OwnerService from '../services/OwnerService'

function OwnersPage() {
    const [owners, setOwners] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        loadOwners()
    }, [])

    const loadOwners = async () => {
        try {
            const data = await OwnerService.getAll()
            setOwners(data)
        } catch (error) {
            console.error(error)
            setError('Unable to load owners.')
        }
    }

    return (
        <main>
            <section>
                <div className="page-header">
                    <div>
                        <h2>Owners</h2>
                        <p>View owner information.</p>
                        <small>{owners.length} owners available</small>
                    </div>
                </div>

                {error && <p className="error-message">{error}</p>}

                {owners.length === 0 && !error ? (
                    <p>No owners found.</p>
                ) : (
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                </tr>
                            </thead>

                            <tbody>
                                {owners.map((owner) => (
                                    <tr key={owner.id}>
                                        <td>{owner.firstName}</td>
                                        <td>{owner.lastName}</td>
                                        <td>{owner.email || '-'}</td>
                                        <td>{owner.phoneNumber || '-'}</td>
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

export default OwnersPage