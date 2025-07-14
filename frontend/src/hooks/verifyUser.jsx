import { useState, useEffect } from 'react';
import { UseLoggedIn } from "../context/userContext";

import axiosRaw from "../services/axiosRaw";
import authService from '../services/authServices';


const useVerifyUser = () => {
    const [isVerified, setVerified] = useState(false);
    const [loading, setLoading] = useState(true);

    const { loggedIn, setLoggedIn } = UseLoggedIn()

    useEffect(() => {
        const checkUser = async () => {
            try {
                const token = localStorage.getItem('a_t');
                const response = await axiosRaw.post('/auth/jwt/verify/', {
                    token: token
                });
                console.log('Verified successfully:', response.data);
                setVerified(true);
                console.log('ising hook')
            } catch (error) {
                console.log('Verification failed:', error.response?.data || error.message);
                setVerified(false);
                setLoggedIn(false)
                console.log(loggedIn + 'loggedin state value')
                authService.logout()
                
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, [loggedIn, setLoggedIn]);

    return { isVerified, loading };
};

export default useVerifyUser;