import React, { useState } from 'react';
import axios from 'axios';

function SignUpForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post('http://localhost:5000/api/user/signup', { 
                username: username,
                email: email, 
                password: password });

            console.log("Signup response:", response.data);

        } catch (error) {
            console.error('Signup error: ', error);
        }
    };

    return (
        <form onSubmit={handleSignUp}>
            <label>Username</label>
            <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button type="submit">Sign In</button>
        </form>
    );
}

export default SignUpForm;