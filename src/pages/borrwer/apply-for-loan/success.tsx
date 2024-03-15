import { CelebrationRounded } from '@mui/icons-material'
import { Link, Stack, Typography } from '@mui/material'

const SuccessfullyApplied = () => {
  return (
    <Stack height="400px" justifyContent="center" alignItems="center">
      <Typography variant="h3" fontWeight={600}>
        Congratulations!
      </Typography>
      <CelebrationRounded sx={{ ml: 2, mb: 4 }} fontSize="large" />
      <Typography variant="h6">You have successfully applied for the loan.</Typography>
      <Typography variant="body1">
        Your request is currently in a PENDING state. Please check back later in My Loans.
      </Typography>

      <Link mt={2} href="/dashbaord">
        Go to Dashbaord
      </Link>
      <Link href="/loans">View My loans</Link>
    </Stack>
  )
}

export default SuccessfullyApplied
