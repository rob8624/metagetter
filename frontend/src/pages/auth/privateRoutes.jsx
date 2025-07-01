import { Navigate, Outlet } from 'react-router-dom'
import useVerifyUser from '../../hooks/verifyUser'


export function PrivateRoutes() {
    const { isVerified, loading } = useVerifyUser()
    
    console.log('PrivateRoutes - isVerified:', isVerified, 'loading:', loading)
    
    // Show loading spinner while verification is in progress
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                {/* Or your custom loading component */}
            </div>
        )
    }

    // Only redirect after verification is complete
    return isVerified ? <Outlet /> : <Navigate to="/signin" replace />
}