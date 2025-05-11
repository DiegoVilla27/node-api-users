import { AuthLoginEntity } from "@auth/domain/entities/login";
import { handleError } from "@auth/infrastructure/errors";
import { di } from "@core/di";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { LoginCreateSchema } from "./schema";

const JWT_SECRET = String(process.env.JWT_SECRET!);
const JWT_EXPIRES_IN = '1d';

const loginSvc = di.auth.loginUseCase;

const loginUser = async (req: Request, res: Response) => {
  try {
    const userParsed = LoginCreateSchema.parse(req.body) as AuthLoginEntity;
    await loginSvc(userParsed);

    const token = jwt.sign({ email: userParsed.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    res.status(200).json({ token });
  } catch (error) {
    handleError(error, res, 'Error login user');
  }
};

export default loginUser;