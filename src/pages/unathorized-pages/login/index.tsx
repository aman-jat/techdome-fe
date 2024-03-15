import { TextField, Button, Typography, CircularProgress } from '@mui/material'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { showSnackbar } from '../../../core/lib/utils'
import api from '../../../core/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: yup.object().shape({
      email: yup.string().email('Invalid email format').required('Email is required'),
      password: yup.string().trim().min(4)
    }),
    onSubmit: async ({ email, password }) => {
      try {
        setLoading(true)
        await api.auth.login({ email, password })
        showSnackbar('Login Successfull', { severity: 'info' })
        navigate('/')
      } catch (error) {
        console.error(error)
        showSnackbar('Login Failed', { severity: 'error' })
      } finally {
        setLoading(false)
      }
    }
  })

  const navigateToRegister = () => {
    navigate('/register')
  }

  return (
    <>
      <Typography ml={{ xs: 0, sm: -2 }}>Login</Typography>
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

      <Button
        disabled={loading}
        endIcon={loading && <CircularProgress size={20} />}
        variant="contained"
        onClick={() => formik.handleSubmit()}
      >
        SIGN IN
      </Button>
      <Button onClick={navigateToRegister} disabled={loading} variant="outlined">
        REGISTER
      </Button>
    </>
  )
}

export default Login
