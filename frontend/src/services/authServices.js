import { data } from "react-router-dom"
import axiosInstance from "./api.js"


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
            const response = await axiosInstance.post('jwt/create/', credentials)

            if (response.data.access && response.data.refresh) {
                localStorage.setItem('access_token', data.access)
                localStorage.setItem('refresh_token', data.refresh)
            }
        } catch(error) {
            console.log(error)
        }
    }
}





const authService = new AuthService();


export default authService;