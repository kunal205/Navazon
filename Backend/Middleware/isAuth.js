import jwt from 'jsonwebtoken'
const isAuth = (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
                status: "failed",
                message: "Authorization failed: No token provided."
            });
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        if (!decode) {
            return res.status(400).json({
                status: "fail",
                message: "token is not valid"
            })
        }
        req.userId = decode.userId
        next()
    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: `error ${error}`,
        })
    }
}
export default isAuth