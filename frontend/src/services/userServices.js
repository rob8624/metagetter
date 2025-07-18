import axiosInstance from "./api.js"




class UserServices {
  static async getProfile() {
    const token = localStorage.getItem('a_t');  // Or your token source

    try {
      const response = await axiosInstance.get('/api/user-profile/', {
        headers: {
          Authorization: `Bearer ${token}`,  // 👈 manually attach token
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  static async CanUploadCheck() {
    const token = localStorage.getItem('a_t');

    try {
      const response = await axiosInstance.get('/api/can-upload', {
        headers: {
          Authorization: `Bearer ${token}`,  
        }
      });
      return response.data.can_upload
    } catch (error) {
      console.error('Error checking if user can upload', error);
      throw error;
    }
  }

}

export default UserServices;