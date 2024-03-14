import { Suspense } from 'react'
import api from './core/api'
import { useSelector } from 'react-redux'
import Loader from './core/components/loader'
import { useAsync } from 'react-use'
import { USER_ROLE } from './core/constants/constants'
import UnauthorizedRoutes from './core/routes/unauthorized-routes'
import BorrowerRoutes from './core/routes/borrower-routes'
function App() {
  const user = useSelector((state: any) => state?.user)

  const { loading, error } = useAsync(() => {
    if (!user) {
      return api.auth.getMember()
    } else {
      return Promise.reject()
    }
  }, [user])

  return (
    <Suspense fallback={<Loader />}>
      {loading && <Loader />}
      {!loading && !user && <UnauthorizedRoutes />}
      {!loading && !error && user && user.role === USER_ROLE.BORROWER && <BorrowerRoutes />}
      {!loading && !error && user && user.role === USER_ROLE.LENDER && (
        <>
          {/* no routes  */}
          {/* <AuthorizedLenderRoutes /> */}
          <div>NO ROUTES</div>
        </>
      )}
    </Suspense>
  )
}

export default App
