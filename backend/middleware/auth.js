import jwt from 'jsonwebtoken';


function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return req.sendStatus(403);
        req.user = user;
        next();
    })
};

function decodeJWT(jwtToken) {
    const decodedToken = jwt.decode(jwtToken);

    return decodedToken;
}

export { authToken, decodeJWT };