import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET || "default_secrret";
    return jwt.sign(payload, secret, {expiresIn: "7d"});
};
