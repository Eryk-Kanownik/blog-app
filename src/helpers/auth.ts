import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ResponseType } from "./responseStatus";

interface ILoggedUser {
  userId: string;
  username: string;
  iat: any;
}

export interface AuthRequest extends Request {
  user?: string | JwtPayload | null | ILoggedUser;
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.headers["authorization"]) {
    try {
      let token = req.headers["authorization"];
      let decoded = await jwt.verify(token.toString(), process.env.JWT_SECRET!);
      req.user = decoded;
      next();
    } catch (e) {
      return res.status(400).json({
        state: ResponseType.FALIURE,
        message: "JWT malformed",
      });
    }
  } else {
    return res.status(401).json({
      state: ResponseType.FALIURE,
      message: "Unauthorized. You have to log in.",
    });
  }
};
