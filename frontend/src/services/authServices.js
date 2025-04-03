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
                toast('Invalid username or password');
            } else if (error.response) {
                
                toast('Server Error', error.response.status);
            } else if (error.request) {
              
                toast('Server Error', error.response.status);;
            } else {
                toast('Server Error', error.response.status);;
            }
            
        }
        return false

    }

    async logout() {
        const token = localStorage.getItem('r_t'); 
        const data = {
            refresh: token
        };
        try {
             await axiosInstance.post('/api/token/blacklist/', data, {
                headers: {
                    "Content-Type": "application/json", 
                }
            });
            localStorage.removeItem('a_t');
            localStorage.removeItem('r_t');
            toast('You have been logged out');
        } catch (error) {
            console.error('token error:', error.response || error.message);
        }
    }

    async reset(email) {
        try {
            const response = await axiosInstance.post('auth/users/reset_password/', {
                email, // Make sure this matches the field name expected by Djoser
            });
    
            // Handle the response based on status
            if (response.status === 204) {
                // HTTP_204_NO_CONTENT means success with no content returned (the typical success case)
                toast('Link Sent');
            } else if (response.status === 500)  {
                // In case of some unexpected response
                toast('Multiply users with this address or server error');
            } 
    
        } catch (error) {
            // Catch any errors that occur with the request
            console.error('Request error:', error.response || error.message);
            toast('Error sending link');
        }
    }
}





const authService = new AuthService();


export default authService;