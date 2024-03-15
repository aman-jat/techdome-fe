import { Button, Grid, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ArrowCircleRightRounded } from '@mui/icons-material'
import { USER_ROLE } from '../../../core/constants/constants'
import img from '../../../assets/makeItHappen.png'

const Dashboard = () => {
  const user = useSelector((state: any) => state?.user)
  const navigate = useNavigate()

  return (
    <Stack px={4} py={8} alignSelf="center" width={{ md: 800, lg: 1000 }}>
      <Grid container>
        <Grid item sm={6} lg={6}>
          <Stack px={{ lg: 2 }} gap={4} height="100%" justifyContent="center">
            <Typography variant="h4">
              Hi, {user.name}. <br /> Welcome to Techdome.
            </Typography>
            <img width={200} src={img}></img>
          </Stack>
        </Grid>
        <Grid item sm={6} lg={6}>
          <Stack px={{ lg: 8 }} height="100%" justifyContent="center">
            {user.role === USER_ROLE.BORROWER && (
              <Button
                sx={{ width: 'fit-content' }}
                onClick={() => navigate('/apply')}
                endIcon={<ArrowCircleRightRounded />}
              >
                Apply for loan, Now
              </Button>
            )}

            <Button
              sx={{ width: 'fit-content' }}
              onClick={() => navigate('/loans')}
              endIcon={<ArrowCircleRightRounded />}
            >
              {user.role === USER_ROLE.BORROWER ? 'View my loans' : 'View  applied loans'}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default Dashboard
