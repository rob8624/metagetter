import axiosInstance from "./api.js"




class UserServices {
  static async getProfile() {
    

    try {
      const response = await axiosInstance.get('/api/user-profile/')
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  static async CanUploadCheck() {
    

    try {
      const response = await axiosInstance.get('/api/can-upload');
      return response.data.can_upload
    } catch (error) {
      console.error('Error checking if user can upload', error);
      throw error;
    }
  }

}

export default UserServices;