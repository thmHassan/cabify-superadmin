import { Navigate, Outlet } from 'react-router-dom'
// import appConfig from '../configs/app.config'
import useAuth from '../../utils/hooks/useAuth'
import { REDIRECT_URL_KEY } from '../../constants/app.constant'
import { SIGN_IN_PATH } from '../../constants/routes.path.constant/auth.route.path.constant'

// const { unAuthenticatedEntryPath } = appConfig

const ProtectedRoute = () => {
    const { authenticated } = useAuth()
    // const location = useLocation()

    if (!authenticated) {
        return (
            <Navigate
                replace
                to={SIGN_IN_PATH}
            />
        )
    }

    return <Outlet />
}

export default ProtectedRoute
