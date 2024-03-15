import { Button, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../../../core/api'
import { showSnackbar } from '../../../core/lib/utils'
import Loader from '../../../core/components/loader'
import { useNavigate } from 'react-router-dom'

const Loans = () => {
  const loans = useSelector((state: any) => state?.loans)

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
  }, [])
  return (
    <Stack>
      <Stack alignSelf="center" width={{ xs: 400, sm: 500, md: 800, lg: 1000 }}>
        {loading && <Loader />}
        <table>
          <tr>
            {/* <th>Id</th> */}
            <th>Amount</th>
            <th>ROI</th>
            <th>Tenure</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {loans?.toReversed().map((loan) => {
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
