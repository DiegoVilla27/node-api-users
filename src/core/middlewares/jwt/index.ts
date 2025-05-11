import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = String(process.env.JWT_SECRET!);

const authMiddleware = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.headers.authorization?.split(' ')[1]; // Suponiendo que el token esté en el encabezado Authorization como 'Bearer token'

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    jwt.verify(token, JWT_SECRET);

    return next(); // Continuamos con la siguiente middleware o controlador
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token has expired' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

export default authMiddleware;
