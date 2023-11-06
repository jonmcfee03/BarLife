import React  from 'react';
import { useJwt } from 'react-jwt';

function HomePage({user, onSignOut} ) {
    const decodedToken = useJwt(user);
    

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
        <div className="homepage">
            <h1>Welcome</h1>
            { decodedToken.decodedToken && decodedToken.decodedToken.username !== null && decodedToken.decodedToken.username !== undefined ? (
                    <h2>Hi {decodedToken.decodedToken.username}</h2>
                ) : (
                    <h2>Hi</h2>
                )
            }            
            <form onSubmit={handleSignOut}>
            <button type="submit">Sign Out</button>
        </form>
        </div>
    )
}

export default HomePage;