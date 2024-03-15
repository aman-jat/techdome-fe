import { Suspense } from 'react'
import api from './core/api'
import { useSelector } from 'react-redux'
import Loader from './core/components/loader'
import { useAsync } from 'react-use'
import { USER_ROLE } from './core/constants/constants'
import UnauthorizedPage from './pages/unathorized-pages'
import BorrowerRoutes from './pages/borrwer'
import Layout from './core/layout'
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
      <Layout>
        {!loading && !error && user && user.role === USER_ROLE.BORROWER && <BorrowerRoutes />}
        {!loading && !error && user && user.role === USER_ROLE.LENDER && (
          <>
            {/* no routes  */}
            {/* <AuthorizedLenderRoutes /> */}
            <div>NO ROUTES</div>
          </>
        )}
        {!loading && !user && <UnauthorizedPage />}
      </Layout>
    </Suspense>
  )
}

export default App
