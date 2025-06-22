import { useState, useEffect } from 'react'
import axiosInstance from "../services/api.js"
import axios from 'axios'



const VerifyUser = () => {
    const [isVerified, setVerified] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const token = localStorage.getItem('a_t');
                const response = await axiosInstance.post('/auth/jwt/verify/', {
                    token: token
                });
                console.log('Verified successfully:', response.data);
                setVerified(true);
            } catch (error) {
                console.log('Verification failed:', error.response?.data || error.message);
            }
        };

        checkUser();
    }, []); // dependency array to run once on mount

    return null;
};

export default VerifyUser;