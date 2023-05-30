import { Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../entities/User";
import { isUser } from "../middleware/auth";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  @UseMiddleware([isUser])
  async getAllUser(): Promise<User[]> {
    const findUser = await User.find({
      where: { isForLogin: false, isActive: true },
    });

    return findUser;
  }
}
