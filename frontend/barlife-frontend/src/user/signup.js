import React, { useState } from 'react';
import axios from 'axios';

function SignUpForm({ onSignUp }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/api/user/signup', { 
                username: username,
                email: email, 
                password: password });

            if (res.data.success == false) {
                //ADD LOGIN ERROR MESSAGE TO SCREEN
                console.log('Sign-up failed. Email is already taken.');
            }
            else {
                const userJWT = res.data.accessToken;
                onSignUp(userJWT);
            }
            console.log("Signup response:", res.data);

        } catch (error) { 
            console.error('Signup error: ', error);
        }
    };

    return (
        <form onSubmit={handleSignUp}>
            <h1>Sign Up</h1>
            <label>Username</label>
            <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUpForm;