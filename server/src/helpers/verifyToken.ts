import { NextFunction, Request, Response } from "express";
import Joi from 'joi';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
  email: string;
}

export const verifyToken =  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader ? authHeader.split(' ')[1].trim() : undefined;

      if (!token) {
        return res.status(401).json({ status: 'error', error: 'Missing token' });
      }

      const secretKey: Secret = process.env.JWT_SECRET_KEY || '';

      const decoded = jwt.verify(token, secretKey) as DecodedToken;
      const email = decoded.email;
      next();
    } catch (error) {
      res.status(401).json({ status: 'error', error: 'Invalid token' });
    }
}