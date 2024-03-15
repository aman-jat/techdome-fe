import { AppBar, Avatar, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material'
import LightLogo from '../../../assets/logo-light.svg'
import { useState } from 'react'
import api from '../../api'
import { showSnackbar } from '../../lib/utils'
import Loader from '../../components/loader'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/store'

const Header = () => {
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [loading, setLoading] = useState(false)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleViewLoans = () => {
    navigate('loans')
    handleClose()
  }

  const handleLogout = async () => {
    try {
      setLoading(true)
      await api.auth.logout()
      showSnackbar('Logout successfully', { severity: 'success' })
      navigate('/')
    } catch (error) {
      console.error(error)
      showSnackbar('Logout Failed', { severity: 'error' })
    } finally {
      setLoading(false)
    }
    handleClose()
  }

  return (
    <AppBar position="static" className="app-bar" variant="elevation" elevation={4}>
      <Toolbar variant="dense">
        {loading && <Loader />}
        <Stack p={2} width="100%" direction="row" justifyContent="space-between">
          <img onClick={() => navigate('/')} style={{ cursor: 'pointer' }} src={LightLogo} width={100}></img>
          {user && (
            <Stack alignItems="center" direction="row" gap={2}>
              <Typography color="white">{user.role}</Typography>
              <IconButton onClick={handleClick}>
                <Avatar>{user.name.charAt(0)}</Avatar>
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleViewLoans}>My loans</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Header
