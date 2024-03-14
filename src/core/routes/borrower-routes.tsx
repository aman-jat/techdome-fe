import { Routes as ReactRoutes, Route } from 'react-router-dom'
import UnauthorizedPage from '../pages/unathorized-pages'

const BorrowerRoutes = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<UnauthorizedPage />} />
      <Route path="*" element={<UnauthorizedPage />} />
    </ReactRoutes>
  )
}

export default BorrowerRoutes
