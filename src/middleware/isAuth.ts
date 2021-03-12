import { MiddlewareFn } from "type-graphql";
import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";

import { Context } from "../types/Context";

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
    const authHeader = context.req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split("Bearer ")[1];
        const tokenKey = process.env.TOKEN_SECRET_KEY || "";
        if (token && tokenKey) {
            try {
                const user = jwt.verify(token, tokenKey);
                if (user) {
                    return next();
                }
            } catch(err) {
                throw new AuthenticationError("Invalid or expired token");
            }
        }
        throw new Error("Authentication token must be \"Bearer [token]");
    }
    throw new Error("Authorization header must be provided");
};
