import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'
import { showSnackbar } from '../../../core/lib/utils'
import api from '../../../core/api'
import { CelebrationRounded } from '@mui/icons-material'
import { Loan } from '../../../core/types/types'

const PaymentDialog = ({ loan, close }: { loan: Loan; close: () => void }) => {
  const [loading, setLoading] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const nextPaymentRemainingAmount = loan.repayments.find((r) => r.status === 'PENDING')?.remainingAmount ?? 0
  const loanTotalRemainingAmount = loan.totalRemainingAmount ?? 0

  const formik = useFormik({
    initialValues: { amount: 0 },
    validationSchema: yup.object().shape({
      amount: yup
        .number()
        .min(nextPaymentRemainingAmount, `Amount can not be less than ${nextPaymentRemainingAmount}`)
        .max(loanTotalRemainingAmount, `Amount can not be greater than ${loanTotalRemainingAmount}`)
    }),
    onSubmit: async ({ amount }) => {
      try {
        setLoading(true)
        await api.loan.repay({ amount, id: loan.id })
        showSnackbar('Payment Successfull', { severity: 'info' })
        setIsDone(true)
      } catch (error) {
        console.error(error)
        showSnackbar('Login Failed', { severity: 'error' })
      } finally {
        setLoading(false)
      }
    }
  })

  const title = isDone ? 'Done' : 'Make a Payment'
  return (
    <Dialog open={true} onClose={close}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        {isDone ? (
          <>
            <Stack alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                Congratulations!
              </Typography>
              <CelebrationRounded sx={{ mb: 4 }} fontSize="large" />
              <Typography>You have successfully paid the amount.</Typography>
            </Stack>
          </>
        ) : (
          <>
            <DialogContentText fontSize={14}>Please enter the amount you wish to pay.</DialogContentText>
            <TextField
              sx={{ mt: 4 }}
              autoFocus
              margin="dense"
              name="amount"
              label="Amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.amount && formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              type="number"
              fullWidth
            />
            <FormHelperText>
              Enter any amount beween {nextPaymentRemainingAmount} and {loanTotalRemainingAmount}
            </FormHelperText>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button sx={{ width: '100px' }} variant="outlined" disabled={loading} onClick={close} color="primary">
          {isDone ? 'Close' : 'Cancel'}
        </Button>
        {!isDone && (
          <Button
            sx={{ width: '100px' }}
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} />}
            onClick={() => formik.handleSubmit()}
            color="primary"
            variant="contained"
          >
            Pay
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default PaymentDialog
