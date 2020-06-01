const config = require('config');
const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token

    jwt.verify(token, config.jwt.secret, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next(); // pass the execution off to whatever request the client intended
    })
}

exports.generateAccessToken = function(username) {
    // expires after half and hour (1800 seconds = 30 minutes)
    return jwt.sign(username, config.jwt.secret, { expiresIn: config.jwt.expiresIn + 's' });
}
