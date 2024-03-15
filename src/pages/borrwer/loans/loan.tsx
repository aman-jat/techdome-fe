import { Button, CircularProgress, Grid, Stack, Typography, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import api from '../../../core/api'
import { formatDate, showSnackbar } from '../../../core/lib/utils'
import Loader from '../../../core/components/loader'
import { useParams } from 'react-router-dom'
import PaymentDialog from './payment-dailog'
import { useAppSelector } from '../../../core/redux/store'
import { USER_ROLE } from '../../../core/types/types'
import theme from '../../../core/styles/theme'

const Loan = () => {
  const loans = useAppSelector((state) => state.loans)
  const user = useAppSelector((state) => state?.user)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [loading, setLoading] = useState(false)
  const [aprvLoading, setAprvLoading] = useState(false)

  const [paymentDialogVisibility, setPaymentDialogVisibility] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    if (loans == null) {
      setLoading(true)
      api.loan
        .getAll()
        .then()
        .catch(() => showSnackbar('Something went wrong', { severity: 'error' }))
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [loans])

  if (loading) {
    return <Loader />
  }

  const loan = id && loans?.find((l) => l.id === +id)

  if (!loan) {
    return <>404-Invalid Id</>
  }

  const Row = ({ label, value }: { label: string; value: number | string | null }) => {
    return (
      <tr>
        <th style={{ padding: '10px', textAlign: 'start', border: '1px solid #00000030' }}>{label}</th>
        <td style={{ padding: '10px', textAlign: 'start', border: '1px solid #00000030' }}>{value}</td>
      </tr>
    )
  }

  const data = [
    {
      key: 'Id',
      value: loan.id
    },
    {
      key: 'Status',
      value: loan.status
    },
    {
      key: 'Amount',
      value: loan.principalAmount
    },
    {
      key: 'Tenure',
      value: loan.tenure
    },
    {
      key: 'Rate of Interest',
      value: loan.interestRate
    }
  ]

  if (loan.status === 'APPROVED' || loan.status === 'PAID') {
    data.push(
      {
        key: 'Amount + Interst',
        value: loan.totalPayableAmount as number
      },
      {
        key: 'Remaining Amount',
        value: loan.totalRemainingAmount as number
      }
    )
  }

  const openPaymentDialog = () => {
    setPaymentDialogVisibility(true)
  }

  const handleLoanApprove = async () => {
    try {
      setAprvLoading(true)
      await api.loan.approve({ id: loan.id })
      showSnackbar('Loan Approved', { severity: 'info' })
    } catch {
      showSnackbar('Something went wrong', { severity: 'error' })
    } finally {
      setAprvLoading(false)
    }
  }

  return (
    <Stack py={{ xs: 2, sm: 8 }} alignSelf="center" width={{ xs: '100%', lg: 1000 }}>
      <Grid container>
        <Grid item xs={12} sm={6} lg={6}>
          <Stack gap={2}>
            <Typography variant="h5" fontWeight={600}>
              Loan Details
            </Typography>

            <table style={{ margin: `8px ${isSmallScreen ? 10 : 40}px`, border: '1px solid black' }}>
              {data.map((d) => {
                return <Row key={d.key} label={d.key} value={d.value} />
              })}
            </table>
            {loan.status === 'APPROVED' && user.role === USER_ROLE.BORROWER && (
              <Button sx={{ width: '200px', alignSelf: 'center' }} onClick={openPaymentDialog} variant="contained">
                Make a Payment
              </Button>
            )}
            {user.role === USER_ROLE.LENDER && loan.status === 'PENDING' && (
              <Button
                disabled={aprvLoading}
                endIcon={aprvLoading && <CircularProgress size={20} />}
                sx={{ width: '200px', alignSelf: 'center' }}
                onClick={handleLoanApprove}
                variant="contained"
              >
                Approve
              </Button>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <Stack px={{ sm: 2, md: 8, lg: 8 }} my={{ xs: 2, sm: 0 }} height="100%" justifyContent="center">
            <Typography variant="h4">EMIs</Typography>
            {loan.status === 'PENDING' && user.role === USER_ROLE.BORROWER && (
              <Typography color="grey" fontSize={12}>
                Please note: The date of the EMI is an estimated date if your loan is approved today. The actual date of
                the EMI will be calculated from the approval date.
              </Typography>
            )}

            <Stack py={2} px={{ md: 2, lg: 2 }} gap={2}>
              {!loan.repayments.length && (
                <Typography variant="subtitle1">Kindly await approval to access further details. </Typography>
              )}
              {loan.repayments.map((r, i) => {
                const amount = r.status === 'PAID' ? r.emiAmount : r.remainingAmount
                return (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    px={2}
                    py={1}
                    sx={{
                      border: r.status === 'PAID' ? '2px solid' : 0,
                      borderColor: '#004d1a',
                      backgroundColor: r.status === 'PAID' ? '#00b33c90' : '#28407D20',
                      borderRadius: 1
                    }}
                    key={r.id}
                  >
                    <td>{i + 1}</td>
                    <td>{amount}</td>
                    <td>{formatDate(r.due_date)}</td>
                    <td>{r.status}</td>
                  </Stack>
                )
              })}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      {paymentDialogVisibility && loan && loan.status === 'APPROVED' && (
        <PaymentDialog loan={loan} close={() => setPaymentDialogVisibility(false)} />
      )}
    </Stack>
  )
}
export default Loan
