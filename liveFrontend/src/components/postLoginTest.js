import React, { useState } from 'react';
import '../styles/navbar.css';

export const Postlogintest = () => {
    const [formData, setFormData] = useState({ userName: '', loginPIN: '' });

    const handleChange = async (event) => {
        event.preventDefault(); // Prevent the form from submitting normally

        try {
            const response = await fetch(`http://192.168.0.113:8012/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer loginSuccessful'
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Login successful!');
                // Reset the form fields
                setFormData({ userName: '', loginPIN: '' });
            } else {
                console.error('Error uploading data');
                alert('Error uploading data!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="navbar">
            <h2>Login Form</h2>
            <form onSubmit={handleChange}>
                Name:
                <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} />
                Pin:
                <input type="text" name="loginPIN" value={formData.loginPIN} onChange={handleInputChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
