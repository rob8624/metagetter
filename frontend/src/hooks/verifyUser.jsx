import { useState, useEffect } from 'react';
import axiosInstance from "../services/api.js"// adjust import path

const useVerifyUser = () => {
    const [isVerified, setVerified] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const token = localStorage.getItem('a_t');
                const response = await axiosInstance.post('/auth/jwt/verify/', {
                    token: token
                });
                console.log('Verified successfully:', response.data);
                setVerified(true);
                console.log('ising hook')
            } catch (error) {
                console.log('Verification failed:', error.response?.data || error.message);
                setVerified(false);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    return { isVerified, loading };
};

export default useVerifyUser;