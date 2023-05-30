import jwt from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql/dist/interfaces/Middleware";
import { JWT_SECRET } from "../constant";
import { User } from "../entities/User";
import { IJwtInput, MyContext } from "../types";

export const isUser: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const {
    req: {
      headers: { authorization },
    },
    res,
  } = context;

  if (!authorization || !authorization.includes("Bearer ")) {
    throw Error("AUTH_ERROR");
  }

  try {
    const token = jwt.verify(
      authorization.split("Bearer ")[1],
      JWT_SECRET
    ) as IJwtInput;

    const user = await User.findOneOrFail({
      where: { id: token.id, isActive: true },
    });

    if (user) {
      context.user = user;
      return next();
    } else {
      throw Error("AUTH_ERROR");
    }
  } catch (err) {
    throw Error("AUTH_ERROR");
  }
};
