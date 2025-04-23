import axiosInstance from "./api.js"



class UserServices{
 static async getProfile() {
    try {
        const response = await axiosInstance.get('api/user-profile/');
        return response.data
    }
    catch(error) {
        console.log(error)
        throw error
    }

 }
}


export default UserServices;