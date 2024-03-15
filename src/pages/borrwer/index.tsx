import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './dashboard'
import ApplyForLoan from './apply-for-loan'
import SuccessfullyApplied from './apply-for-loan/success'
import Loans from './loans'

const BorrowerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/apply" element={<ApplyForLoan />} />
      <Route path="/success" element={<SuccessfullyApplied />} />
      <Route path="/loans" element={<Loans />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}

export default BorrowerRoutes
