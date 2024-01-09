import { generateError } from "../libs/helpers.js";
import jwpt from "jsonwebtoken";



export const authRequired = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw generateError("Autorización denegada", 401)
  };
  
  jwpt.verify(authorization, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      throw generateError("Token no valido!", 401);
    };

    req.userId = user.id;
    next();
  });
};
