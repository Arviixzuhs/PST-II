import * as jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class MyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    try {
      const token = req.headers.authorization

      if (!token) return res.status(401).json({ message: 'No token, authorization denied' })

      jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
        if (error) {
          return res.status(401).json({ message: 'Token is not valid' })
        }
        next()
      })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
