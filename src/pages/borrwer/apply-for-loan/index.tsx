import { Button, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useState } from 'react'
import { formatDate, showSnackbar } from '../../../core/lib/utils'
import api from '../../../core/api'
import { useNavigate } from 'react-router-dom'

const ApplyForLoan = () => {
  const [loading, setLoading] = useState(false)
  const [repayments, setRepayments] = useState<{ id: number; emiAmount: number; due_date: Date }[]>([])
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: { amount: '', tenure: '' },
    validationSchema: yup.object().shape({
      amount: yup.number().min(1, 'Amount can not be less than 1').required('Loan amount is required'),
      tenure: yup.number().min(1, 'Tenure can not be less than 1').required('Tenure is required')
    }),
    onSubmit: async ({ amount, tenure }) => {
      try {
        setLoading(true)
        await api.loan.create({ amount: +amount, tenure: +tenure })
        showSnackbar('Applied Successfully', { severity: 'info' })
        navigate('/success')
      } catch (error) {
        console.error(error)
        showSnackbar('Something went wrong', { severity: 'error' })
      } finally {
        setLoading(false)
      }
    }
  })

  const calculateRepayments = () => {
    const INTEREST_RATE = 0
    const amount = +formik.values.amount
    const tenure = +formik.values.tenure

    const simpleInterest = parseFloat(((amount * INTEREST_RATE * tenure * 7) / 36500).toFixed(2))
    const totalPayableAmount = amount + simpleInterest

    const _repayments = []
    let emiAmount = parseFloat((totalPayableAmount / tenure).toFixed(2))

    const remainingAmount = parseFloat((totalPayableAmount - emiAmount * tenure).toFixed(2))
    for (let i = 0; i < tenure; i++) {
      if (i === tenure - 1) {
        emiAmount += remainingAmount
      }
      _repayments.push({
        id: i + 1,
        emiAmount: emiAmount,
        due_date: new Date(new Date().setDate(new Date().getDate() + 7 * (i + 1)))
      })
    }
    setRepayments(_repayments)
  }

  return (
    <Stack px={{ xs: 0, sm: 4 }} py={8} alignSelf="center" width={{ xs: '100%', lg: 1000 }}>
      <Grid container>
        <Grid item xs={12} sm={6} lg={6}>
          <Stack>
            <Typography variant="h5" fontWeight={600}>
              Apply for a loan
            </Typography>
            <Stack gap={2} py={6}>
              <TextField
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.amount && formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
                type="number"
                label="Loan Amount"
                placeholder="Loan Amount"
              />
              <TextField
                name="tenure"
                value={formik.values.tenure}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.tenure && formik.errors.tenure)}
                helperText={formik.touched.tenure && formik.errors.tenure}
                type="number"
                label="Tenure"
                placeholder="Tenure"
              />
              <Button disabled={loading} variant="outlined" onClick={calculateRepayments}>
                CALCULATE EMIs
              </Button>
              <Button
                disabled={loading}
                endIcon={loading && <CircularProgress size={20} />}
                variant="contained"
                onClick={() => formik.handleSubmit()}
              >
                APPLY
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <Stack px={{ sm: 2, md: 8, lg: 8 }} height="100%" justifyContent="center">
            <Typography variant="h4">EMIs</Typography>
            <Typography color="grey" fontSize={12}>
              Please note: The date of the EMI is an estimated date if your loan is approved today. The actual date of
              the EMI will be calculated from the approval date.
            </Typography>
            <Stack py={2} px={{ md: 2, lg: 2 }} gap={2}>
              {repayments.map((r, i) => {
                return (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    px={2}
                    py={1}
                    sx={{ backgroundColor: '#28407D20', borderRadius: 1 }}
                    key={r.id}
                  >
                    <Typography>{i + 1}</Typography>
                    <Typography>{r.emiAmount}</Typography>
                    <Typography>{formatDate(r.due_date)}</Typography>
                  </Stack>
                )
              })}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default ApplyForLoan
