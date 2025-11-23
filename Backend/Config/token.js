import jwt from "jsonwebtoken"
const tokenGenerator = (userId) => {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1d' })
    return token
}
export default tokenGenerator;