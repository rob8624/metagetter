import axiosInstance from "./api.js"
import { toast } from "sonner"



function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))

}

class AuthService {
    async register(userData) {
        try{
            const response = await axiosInstance.post('/auth/users/', userData)
            return response.data
        } catch(error){
          throw error;
        }
    }

    async login(credentials) {
    
        try{
            const response = await axiosInstance.post('/auth/jwt/create/', credentials)

            if (response.data.access && response.data.refresh) {
                localStorage.setItem('a_t', response.data.access)
                localStorage.setItem('r_t', response.data.refresh)
                saveToLocalStorage("loggedin", true)
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
            localStorage.removeItem('loggedin');
            toast('You have been logged out');
        } catch (error) {
            console.error('token error:', error.response || error.message);
        }
    }

    async reset(email) {
        try {
            const response = await axiosInstance.post('auth/users/reset_password/', {
                email, 
            });
    
           
            if (response.status === 204) {
                toast('Link Sent if email is registered');
            } 
            } catch (error) {
            toast('Error sending link');
        }
    }

    async confirmReset(uid, token, new_password) {
       try {
        
             const response = await axiosInstance.post('auth/users/reset_password_confirm/', {
                uid, token, new_password
       })
       return response
       }
       catch(error) {
        console.log(error)
        throw error;
       }
    }
}





const authService = new AuthService();


export default authService;