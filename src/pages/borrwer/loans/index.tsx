import { Button, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import api from '../../../core/api'
import { showSnackbar } from '../../../core/lib/utils'
import Loader from '../../../core/components/loader'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../core/redux/store'

const Loans = () => {
  const loans = useAppSelector((state) => state.loans)

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
    }
  }, [loans])

  const reversedLoans = loans?.length ? [...loans].reverse() : []

  return (
    <Stack>
      <Stack alignSelf="center" width={{ xs: 400, sm: 500, md: 800, lg: 1000 }}>
        {loans == null && loading && <Loader />}
        <table>
          <tr>
            {/* <th>Id</th> */}
            <th>Amount</th>
            <th>ROI</th>
            <th>Tenure</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {reversedLoans.map((loan) => {
            return (
              <tr key={loan.id}>
                {/* <td>{loan.id}</td> */}
                <td>{loan.principalAmount}</td>
                <td>{loan.interestRate}</td>
                <td>{loan.tenure}</td>
                <td>{loan.status}</td>
                <td style={{}}>
                  <Button onClick={() => navigate(`/loans/${loan.id}`)} variant="text">
                    View
                  </Button>
                </td>
              </tr>
            )
          })}
        </table>
      </Stack>
    </Stack>
  )
}
export default Loans
