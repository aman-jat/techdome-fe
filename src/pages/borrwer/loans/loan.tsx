import { Button, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../../../core/api'
import { formatDate, showSnackbar } from '../../../core/lib/utils'
import Loader from '../../../core/components/loader'
import { useParams } from 'react-router-dom'
import PaymentDialog from './payment-dailog'

const Loan = () => {
  const loans = useSelector((state: any) => state?.loans)
  const [loading, setLoading] = useState(false)
  const [paymentDialogVisibility, setPaymentDialogVisibility] = useState(false)

  const { id } = useParams()
  const loan = loans?.find((l) => l.id === +id)
  useEffect(() => {
    if (loans == null) {
      setLoading(true)
      api.loan
        .getAll()
        .then()
        .catch((err) => showSnackbar('Something went wrong', { severity: 'error' }))
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

  if (!loan) {
    return <>404-Invalid Id</>
  }

  const Row = ({ label, value }) => {
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
        value: loan.totalPayableAmount
      },
      {
        key: 'Remaining Amount',
        value: loan.totalRemainingAmount
      }
    )
  }

  const openPaymentDialog = () => {
    setPaymentDialogVisibility(true)
  }
  return (
    <Stack px={4} py={8} alignSelf="center" width={{ xs: '100%', lg: 1000 }}>
      <Grid container>
        <Grid item xs={12} sm={6} lg={6}>
          <Stack gap={2}>
            <Typography variant="h5" fontWeight={600}>
              Loan Details
            </Typography>

            <table style={{ margin: '8px 40px', border: '1px solid black' }}>
              {data.map((d) => {
                return <Row key={d.key} label={d.key} value={d.value} />
              })}
            </table>
            {loan.status === 'APPROVED' && (
              <Button sx={{ width: '200px', alignSelf: 'center' }} onClick={openPaymentDialog} variant="contained">
                Make a Payment
              </Button>
            )}
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
              {!loan.repayments.length && <Typography>Kindly await approval to access further details. </Typography>}
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
                    <Typography>{i + 1}</Typography>
                    <Typography>{amount}</Typography>
                    <Typography>{formatDate(r.due_date)}</Typography>
                    <Typography>{r.status}</Typography>
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
