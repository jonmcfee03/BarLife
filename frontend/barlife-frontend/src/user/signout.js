import React from 'react';

function SignOutForm({ onSignOut }) {
    
    const handleSignOut = async (e) => {
        e.preventDefault();
        console.log("signout")
        try {
            onSignOut();

        } catch (error) {
            console.error('Signout error: ', error);
        }
    };

    return (
        <form onSubmit={handleSignOut}>

        <button type="submit">Sign Out</button>
        </form>
    );
}

export default SignOutForm;