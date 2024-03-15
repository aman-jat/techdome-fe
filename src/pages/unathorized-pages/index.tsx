import { Stack, Typography } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../../core/layout'
import Login from './login'
import Register from './register'

const UnauthorizedPage = () => {
  return (
    <Layout>
      <Stack p={2} alignItems="center" gap={2}>
        <Typography variant="h5" fontWeight={600}>
          Please Login/Register to use Techdome
        </Typography>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Stack>
    </Layout>
  )
}

export default UnauthorizedPage
