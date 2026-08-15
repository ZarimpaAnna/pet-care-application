import { Route, Routes } from 'react-router-dom'
import './styles/layout.css'
import './styles/navigation.css'
import './styles/cards.css'
import './styles/tables.css'
import './styles/forms.css'
import './styles/details.css'

import Header from './components/Header'
import Navbar from './components/Navbar'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import PetsPage from './pages/PetsPage'
import OwnersPage from './pages/OwnersPage'
import VaccinationsPage from './pages/VaccinationsPage'
import MedicalRecordsPage from './pages/MedicalRecordsPage'
import PetDetailsPage from "./pages/PetDetailsPage";
import AddPetPage from './pages/AddPetPage'
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from './pages/NotFoundPage'
import VaccinationDetailsPage from './pages/VaccinationDetailsPage'
import AddVaccinationPage from './pages/AddVaccinationPage'
import AddMedicalRecordPage from './pages/AddMedicalRecordPage'
import MedicalRecordDetailsPage from './pages/MedicalRecordDetailsPage'
import EditPetPage from './pages/EditPetPage'
import EditVaccinationPage from './pages/EditVaccinationPage'
import EditMedicalRecordPage from './pages/EditMedicalRecordPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <>
      <Header
        title="🐶 Pet Care Application 🐱"
        description="Manage your pets, vaccinations and medical records."
      />

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/pets" element={<ProtectedRoute><PetsPage /></ProtectedRoute>} />
        <Route path="/owners" element={<ProtectedRoute><OwnersPage /></ProtectedRoute>} />
        <Route path="/vaccinations" element={<ProtectedRoute><VaccinationsPage /></ProtectedRoute>} />
        <Route path="/medical-records" element={<ProtectedRoute><MedicalRecordsPage /></ProtectedRoute>} />
        <Route path="/pets/:id" element={<ProtectedRoute><PetDetailsPage /></ProtectedRoute>} />
        <Route path="/pets/new" element={<ProtectedRoute><AddPetPage /></ProtectedRoute>} />
        <Route path="/pets/:id" element={<ProtectedRoute><PetDetailsPage /></ProtectedRoute>} />
        <Route path="/vaccinations/new" element={<AddVaccinationPage />} />
        <Route path="/vaccinations/:id" element={<ProtectedRoute><VaccinationDetailsPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/medical-records/new" element={<ProtectedRoute> <AddMedicalRecordPage /> </ProtectedRoute>} />
        <Route path="/medical-records/:id" element={<ProtectedRoute> <MedicalRecordDetailsPage /></ProtectedRoute>} />
        <Route path="/pets/:id/edit" element={<ProtectedRoute><EditPetPage /></ProtectedRoute>} />
        <Route path="/vaccinations/:id/edit" element={<ProtectedRoute><EditVaccinationPage /></ProtectedRoute>} />
        <Route path="/medical-records/:id/edit" element={<ProtectedRoute><EditMedicalRecordPage /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App