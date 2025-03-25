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
}





const authService = new AuthService();


export default authService;