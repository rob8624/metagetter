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
}

export default UserServices;