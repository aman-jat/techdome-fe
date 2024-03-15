import { Stack, Typography } from '@mui/material'
import LightLogo from '../../../assets/logo-light.svg'
import { useMediaQuery } from '@mui/material'
import theme from '../../styles/theme'

const Header = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Stack
      p={8}
      direction={{ xs: 'column', sm: 'row' }}
      alignItems="center"
      gap={{ xs: 4, sm: 0 }}
      justifyContent="space-between"
      height="100%"
      sx={{ backgroundColor: '#28407D' }}
    >
      <img src={LightLogo} width={isSmallScreen ? 200 : 400}></img>
      <Stack minWidth="40%" height="100%" alignItems="center" gap={3}>
        <Typography variant="h6" color="white">
          CAREER
        </Typography>
        <Typography variant="h6" color="white">
          CONTACT US
        </Typography>
        <Typography variant="h6" color="white">
          ABOUT US
        </Typography>
      </Stack>
    </Stack>
  )
}

export default Header
