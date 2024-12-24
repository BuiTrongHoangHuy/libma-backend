import jwt from "jsonwebtoken"

require("dotenv").config()

const createJWT = (payload) => {
    let key = process.env.JWT_ACCESS_KEY;
    let token = null;
    try {
        token = jwt.sign(payload, key);
    } catch (e) {
        console.log(e)
    }
    return token
}

const verifyJWT = (token) => {
    let key = process.env.JWT_ACCESS_KEY
    let data = null
    try {
        data = jwt.verify(token, key)
    } catch (err) {
        console.log(err)
    }
    return data

}

const checkUserJWT = (req, res, next) => {
    try {
        const nonSecurePaths = ['/', '/register', '/login'];
        if (nonSecurePaths.includes(req.path)) {
            next();
        }
        // let cookies = req.cookies;
        let token = extractToken(req)
        if (!token) {
            return res.status(401).send({
                msg: 'Authorization header is required',
                code: 401,
            })
        }

        jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                return {
                    msg: 'Invalid token. You need to login first',
                    code: 401,
                }
            }
            req.user = user
            next();
        })
    } catch (e) {
        next(e)
    }

}
const checkUserLogin = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
}
const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1]
    }
    return null
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
}

module.exports = {createJWT, verifyJWT, checkUserJWT}