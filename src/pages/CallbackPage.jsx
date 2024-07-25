import React, { useState } from 'react';
import { getToken } from "../config/authApi.js";
import {useNavigate} from "react-router-dom";

const CallbackPage = () => {
    const [token, setToken] = useState(null);

    const navigate = useNavigate();
    // 페이지 로드 시 한 번만 실행
    window.onload = async () => {
        const code = new URLSearchParams(window.location.search).get('code');
        if (!code) {
            console.error('No code found in URL');
            return;
        }

        try {
            console.log('Fetching token...');
            const res = await getToken(code);
            if (res.status === 200) {
                console.log('Token fetched successfully:', res.data);
                setToken(res.data);
                localStorage.setItem('access_token', res.data);
                navigate("/signup");
            } else {
                console.error('Failed to fetch token, status code:', res.status);
            }
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };

    return (
        <div>
            <div>Loading...</div>
        </div>
    );
};

export default CallbackPage;