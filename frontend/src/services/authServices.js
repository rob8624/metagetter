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
            const response = await axiosInstance.post('/auth/jwt/create/', credentials)

            if (response.data.access && response.data.refresh) {
                localStorage.setItem('a_t', response.data.access)
                localStorage.setItem('r_t', response.data.refresh)
                
                return true
            }
        
        } catch(error) {
            
            if (error.response && error.response.status === 401) {
                // Unauthorized - likely invalid credentials
                toast('Invalid username or password');
            } else if (error.response) {
                
                throw new Error(error.response.data.detail || 'Login failed');
            } else if (error.request) {
              
                throw new Error('No response from server');
            } else {
                
                throw new Error('Error logging in');
            }
            
        }
        return false

    }

    async logout() {
        localStorage.removeItem('a_t')
        localStorage.removeItem('r_t')
    }
}





const authService = new AuthService();


export default authService;