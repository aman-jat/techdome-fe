import { ListItem, Stack, Typography } from '@mui/material'
import LightLogo from '../../../assets/logo-light.svg'

const Header = () => {
  return (
    <Stack p={8} direction="row" justifyContent="space-between" height="100%" sx={{ backgroundColor: '#28407D' }}>
      <img src={LightLogo} width={400}></img>
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
