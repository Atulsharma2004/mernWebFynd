import React, { useEffect } from 'react';
import '../components/loader/loader.css'
import { useNavigate } from 'react-router-dom';

const Intro = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate waiting for the animation to complete
        setTimeout(() => {
            navigate('/home'); // Transition to home page
        }, 4000);
    }, [navigate]);
    return (

        <div className="container">
            <div className="loader">
                <div className="ring"></div>
                <div className="ring"></div>
                <div className="ring"></div>
                <span className='loading'>Loading...</span>
            </div>
        </div>

    );
};

export default Intro;
