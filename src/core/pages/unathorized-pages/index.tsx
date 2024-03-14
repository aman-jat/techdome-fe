import { Stack, Typography } from '@mui/material'

const UnauthorizedPage = () => {
  return (
    <Stack alignItems="center">
      <Typography variant="h5" fontWeight={600}>
        {' '}
        Please Login/Register to use techdome
      </Typography>
    </Stack>
  )
}

export default UnauthorizedPage
