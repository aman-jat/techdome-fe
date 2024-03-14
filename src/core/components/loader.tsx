import { Backdrop, CircularProgress } from '@mui/material'
const Loader = () => {
  return (
    <Backdrop
      sx={{
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.2)'
      }}
      open
    >
      <CircularProgress />
    </Backdrop>
  )
}
export default Loader
