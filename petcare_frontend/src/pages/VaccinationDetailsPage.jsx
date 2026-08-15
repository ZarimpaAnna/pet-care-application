import { useEffect, useState } from "react";
import VaccinationService from "../services/VaccinationService";
import { getStatusDisplay } from '../utils/formatters'
import { useNavigate, useParams } from 'react-router-dom'

function VaccinationDetailsPage() {

    const { id } = useParams();

    const [vaccination, setVaccination] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {

        loadVaccination();

    }, []);

    const loadVaccination = async () => {

        try {

            const data = await VaccinationService.getById(id);

            setVaccination(data);

        } catch (error) {

            console.error(error);

        }

    };

    return (
        <main>

            <section>

                <h2>Vaccination Details</h2>

                <p>{vaccination && (

                    <>
                        <p><strong>Name:</strong> {vaccination.vaccineName}</p>
                        <p><strong>Vaccination Date:</strong> {vaccination.vaccinationDate}</p>
                        <p><strong>Due Date:</strong> {vaccination.nextDueDate}</p>
                        <p><strong>Status:</strong> {getStatusDisplay(vaccination.status)}</p>
                        <p><strong>Batch Number:</strong> {vaccination.batchNumber}</p>
                        <p><strong>Notes:</strong> {vaccination.notes}</p>
                    </>

                )}</p>

                <button
                    type="button"
                    onClick={() =>
                        navigate(`/vaccinations/${vaccination.id}/edit`)
                    }
                >
                    Edit Vaccination
                </button>

                <div className="form-actions">
                    <button
                        type="button"
                        className="secondary-button"
                        onClick={() => navigate('/vaccinations')}
                    >
                        Back to Vaccinations
                    </button>
                </div>

            </section>

        </main>
    );
}

export default VaccinationDetailsPage;