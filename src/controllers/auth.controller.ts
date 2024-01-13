import { NextFunction, Request, Response } from 'express'
import AuthService from '../services/auth.service'

class AuthController {
  private readonly authService: AuthService

  constructor(authService: AuthService) {
    this.authService = authService
  }

  public register = (req: Request, res: Response, next: NextFunction) => {
    res.send('register')
  }
}

export default AuthController
