const jwt = require('jsonwebtoken');
const generateToken = (user, type)=>{
    return jwt.sign({id: user._id, type: type}, process.env.JWT_KEY, {expiresIn: '1h'})
}
module.exports.generateToken = generateToken;