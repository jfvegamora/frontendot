/* eslint-disable @typescript-eslint/no-explicit-any */

import jwt from "jsonwebtoken";

export const decodeToken = (token: string) => {
  try {
    const secretKey = "clavesupersecreta";
    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken;
  } catch (error: any) {
    return "token no valido";
  }
};
