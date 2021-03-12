import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";

import { isAuth } from "../../../../middleware/isAuth";
import { User, UserModel } from "../../../entities/User";

@Resolver()
export class UserQueryResolvers {

    @Query(() => User, { nullable: true })
    @UseMiddleware(isAuth)
    public async getUserByName(
        @Arg("name") name: string
    ): Promise<User | null> {
        const foundUser = await UserModel.findOne({name});
        return foundUser;
    }

    @Query(() => [User])
    @UseMiddleware(isAuth)
    public async getUsers(): Promise<Array<User>> {
        const users = await UserModel.find();
        return users;
    }
}
