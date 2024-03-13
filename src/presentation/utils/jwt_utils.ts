/* eslint-disable @typescript-eslint/no-explicit-any */

import jwt from "jsonwebtoken";

export const decodeToken = (token: string) => {
  try {
    const secretKey = "clavesupersecreta";
    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken;
  } catch (error: any) {
    console.log(error);
    return "token no valido";
  }
};




export const handleError = (error:string) => {
    console.log(error)
}
