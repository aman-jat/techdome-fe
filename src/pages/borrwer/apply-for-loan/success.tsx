import { ArrowCircleRightRounded, CelebrationRounded } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const SuccessfullyApplied = () => {
  const navigate = useNavigate()
  return (
    <Stack height="400px" justifyContent="center" alignItems="center">
      <Typography variant="h3" fontWeight={600}>
        Congratulations!
      </Typography>
      <CelebrationRounded sx={{ ml: 2, mb: 4 }} fontSize="large" />
      <Typography variant="h6" textAlign="center">
        You have successfully applied for the loan.
      </Typography>
      <Typography variant="subtitle1" textAlign="center">
        Your request is currently in a PENDING state. Please check back later in My Loans.
      </Typography>

      <Button onClick={() => navigate('/dashbaord')} endIcon={<ArrowCircleRightRounded />}>
        Go to Dashbaord
      </Button>
      <Button onClick={() => navigate('/loans')} endIcon={<ArrowCircleRightRounded />}>
        View My loans
      </Button>
    </Stack>
  )
}

export default SuccessfullyApplied
