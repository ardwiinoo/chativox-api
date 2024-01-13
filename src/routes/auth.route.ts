import { Router } from 'express'
import AuthController from '../controllers/auth.controller'
import AuthService from './../services/auth.service'

const AuthRouter: Router = Router()
const authService = new AuthService()
const authController = new AuthController(authService)

AuthRouter.post('/register', authController.register)

export default AuthRouter
