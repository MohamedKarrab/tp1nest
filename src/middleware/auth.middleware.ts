// src/middleware/auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    private readonly JWT_SECRET: string;

    constructor(private configService: ConfigService) {
        this.JWT_SECRET = this.configService.get<string>('JWT_SECRET');
    }

    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['auth-user'];

        if (!token) {
            return res.status(401).json({ message: 'Token manquant, accès interdit.' });
        }

        try {
            const decoded = jwt.verify(token as string, this.JWT_SECRET) as { userId: number };

            req['userId'] = decoded.userId;

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token invalide ou expiré.' });
        }
    }
}
