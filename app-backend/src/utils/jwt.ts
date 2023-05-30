import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant";
import { IJwtInput } from "../types";

export const signJwt = (arg0: IJwtInput) => {
  return jwt.sign(arg0, JWT_SECRET, { expiresIn: "30d" });
};
