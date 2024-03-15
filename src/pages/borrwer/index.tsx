import { Stack, Typography } from '@mui/material'
import Layout from '../../core/layout'
import { Navigate, Route, Routes } from 'react-router-dom'

const Borrower = () => {
  return (
    <Layout>
      <Stack>
        <Typography variant="h1">Hi, Welcome to techdome</Typography>
      </Stack>
    </Layout>
  )
}

const BorrowerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Borrower />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}

export default BorrowerRoutes
