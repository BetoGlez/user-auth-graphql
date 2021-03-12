import jwt from "jsonwebtoken";
import { User } from "../graphql/entities/User";

const SECRET_KEY = process.env.TOKEN_SECRET_KEY || "";

export const generateToken = (user: User) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name
    }, SECRET_KEY, { expiresIn: "1h" });
};