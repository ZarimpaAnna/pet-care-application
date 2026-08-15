import { useEffect, useState } from 'react'
import PetService from '../services/PetService'
import OwnerService from '../services/OwnerService'
import MedicalRecordService from '../services/MedicalRecordService'
import VaccinationService from '../services/VaccinationService'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const navigate = useNavigate()

    const [petCount, setPetCount] = useState(0)
    const [ownerCount, setOwnerCount] = useState(0)
    const [vaccinationCount, setVaccinationCount] = useState(0)
    const [medicalRecordCount, setMedicalRecordCount] = useState(0)

    useEffect(() => {
        loadDashboardData()
    }, [])

    const loadDashboardData = async () => {
        try {
            const pets = await PetService.getAll()
            setPetCount(pets.length)
            const owners = await OwnerService.getAll()
            setOwnerCount(owners.length)
            const vaccinations = await VaccinationService.getAll()
            setVaccinationCount(vaccinations.length)
            const medicalrecords = await MedicalRecordService.getAll()
            setMedicalRecordCount(medicalrecords.length)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <main>
            <section>
                <h2>Dashboard</h2>
                <p>Overview of your pet care data.</p>

                <div className="dashboard-grid">
                    <div className="dashboard-card" onClick={() => navigate('/pets')}>
                        <span className="dashboard-icon">🐶</span>

                        <div>
                            <h3>Pets</h3>
                            <p className="dashboard-number">{petCount}</p>
                        </div>
                    </div>

                    <div className="dashboard-card" onClick={() => navigate('/owners')}>
                        <span className="dashboard-icon">👤</span>

                        <div>
                            <h3>Owners</h3>
                            <p className="dashboard-number">{ownerCount}</p>
                        </div>
                    </div>

                    <div className="dashboard-card" onClick={() => navigate('/vaccinations')}>
                        <span className="dashboard-icon">💉</span>

                        <div>
                            <h3>Vaccinations</h3>
                            <p className="dashboard-number">{vaccinationCount}</p>
                        </div>
                    </div>

                    <div className="dashboard-card" onClick={() => navigate('/medical-records')}>
                        <span className="dashboard-icon">🩺</span>

                        <div>
                            <h3>Medical Records </h3>
                            <p className="dashboard-number">{medicalRecordCount}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Dashboard