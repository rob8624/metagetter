
import axiosInstance from "./api.js"
import { toast } from "sonner"


class AuthService {
    async register(userData) {
        try{
            const response = await axiosInstance.post('/auth/users/', userData)
            return response.data
        } catch(error){
          throw error.response.data  
        }
    }

    async login(credentials) {
        try{
            const response = await axiosInstance.post('api/token/', credentials)

            if (response.data.access && response.data.refresh) {
                console.log(response.data)
                localStorage.setItem('access_token', response.data.access)
                localStorage.setItem('refresh_token', response.data.refresh)
                return true
            }
            

        } catch(error) {
            // Check for specific 401 status
            if (error.response && error.response.status === 401) {
                // Unauthorized - likely invalid credentials
                toast('Invalid username or password');
            } else if (error.response) {
                // Other error responses
                throw new Error(error.response.data.detail || 'Login failed');
            } else if (error.request) {
                // Request made but no response received
                throw new Error('No response from server');
            } else {
                // Something else went wrong
                throw new Error('Error logging in');
            }
            
        }
        return false

    }
}





const authService = new AuthService();


export default authService;