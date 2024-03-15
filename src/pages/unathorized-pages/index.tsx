import { Stack, Typography } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './login'
import Register from './register'

const UnauthorizedPage = () => {
  return (
    <Stack p={2} alignItems="center" gap={2}>
      <Typography variant="h5" fontWeight={600}>
        Please Login/Register to use Techdome
      </Typography>
      <Stack
        gap={2}
        px={{ xs: 0, sm: 8 }}
        py={{ xs: 5, sm: 10 }}
        border="4px solid"
        width={{ xs: '100%', sm: 'auto' }}
        borderColor={{ xs: 'transparent', sm: '#28407D80' }}
        sx={{ backgroundColor: { xs: 'transparent', sm: '#28407D10' } }}
        borderRadius={2}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Stack>
    </Stack>
  )
}

export default UnauthorizedPage
