import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../borrwer/dashboard'
import Loans from '../borrwer/loans'
import Loan from '../borrwer/loans/loan'

const LenderRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/loans" element={<Loans />} />
      <Route path="/loans/:id" element={<Loan />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}

export default LenderRoutes
