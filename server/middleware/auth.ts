import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config.js'

export interface AuthRequest extends Request {
  admin?: boolean
}

export function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  const token = req.cookies?.admin_token
  if (!token) {
    res.status(401).json({ error: 'Não autenticado.' })
    return
  }
  try {
    jwt.verify(token, config.jwtSecret)
    req.admin = true
    next()
  } catch {
    res.status(401).json({ error: 'Sessão expirada.' })
  }
}
