import _ from "lodash";

export const PORT = _.toNumber(process.env.PORT || 5000);
export const JWT_SECRET = _.toString(process.env.JWT_SECRET || "9694367189");
