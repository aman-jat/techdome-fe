import { Stack, TextField, Button, Typography, CircularProgress, ToggleButtonGroup, ToggleButton } from '@mui/material'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { showSnackbar } from '../../../core/lib/utils'
import api from '../../../core/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { USER_ROLE } from '../../../core/constants/constants'

const Register = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', role: USER_ROLE.BORROWER },
    validationSchema: yup.object().shape({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Invalid email format').required('Email is required'),
      role: yup.string().required('Role is required'),
      password: yup.string().trim().min(4)
    }),
    onSubmit: async ({ name, role, email, password }) => {
      try {
        setLoading(true)
        await api.auth.register({ name, role, email, password })
        showSnackbar('Registered successfully', { severity: 'success' })
        navigate('/')
      } catch (error) {
        console.error(error)
        showSnackbar('Register Failed', { severity: 'error' })
      } finally {
        setLoading(false)
      }
    }
  })

  const navigateToLogin = () => {
    navigate('/login')
  }

  const handleToggleChange = (e: any) => {
    formik.setFieldValue('role', e.target.value)
  }

  return (
    <Stack gap={2} px={8} py={10} border="4px solid #28407D80" sx={{ backgroundColor: '#28407D10' }} borderRadius={2}>
      <Typography ml={-2}>Register</Typography>
      <TextField
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={Boolean(formik.touched.name && formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        label="Full name"
        placeholder="Full name"
      />
      <TextField
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={Boolean(formik.touched.email && formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        label="Email"
        placeholder="Email"
      />
      <TextField
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={Boolean(formik.touched.password && formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        type="password"
        label="Password"
        placeholder="Password"
      />
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
        <Typography>I am a</Typography>
        <ToggleButtonGroup value={formik.values.role} exclusive onChange={handleToggleChange}>
          <ToggleButton sx={toggleButtonStyle} value={USER_ROLE.LENDER}>
            Lender
          </ToggleButton>
          <ToggleButton sx={toggleButtonStyle} value={USER_ROLE.BORROWER}>
            Borrower
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Button
        disabled={loading}
        endIcon={loading && <CircularProgress size={20} />}
        variant="contained"
        onClick={() => formik.handleSubmit()}
      >
        SIGN UP
      </Button>
      <Button onClick={navigateToLogin} disabled={loading} variant="outlined">
        LOGIN
      </Button>
    </Stack>
  )
}

const toggleButtonStyle = {
  '&.Mui-selected': {
    backgroundColor: '#28407D30'
  },
  borderColor: '#28407D80'
}

export default Register
