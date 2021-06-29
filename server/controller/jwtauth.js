import jwt from 'jsonwebtoken'

export const generateAccessToken = (username) => {
    return jwt.sign({ username: username }, process.env.TOKEN_SECRET, { expiresIn: 1800 });
}

export const authenticatetoken = (req, res, next) => {
    const token = req.headers['authorization']
    if (token == null) return res.status(401).json("token null")
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.status(403).json("token error")
    else req.user = user;
    next();
    })
}