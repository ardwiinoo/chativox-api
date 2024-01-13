import express, { Application, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import createHttpError from 'http-errors'
import expressMongoSanitize from 'express-mongo-sanitize'
import fileUpload from 'express-fileupload'
import { routes } from '../routes'

dotenv.config()

const app: Application = express()

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.use(helmet())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// i don't trus my users
app.use(expressMongoSanitize())
app.use(cookieParser())
app.use(compression())

// upload files (req.files)
app.use(
  fileUpload({
    useTempFiles: true,
  })
)

app.use(cors())
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

routes(app)

app.use((req: Request, res: Response, next: NextFunction) => {
  throw createHttpError.NotFound('Route does not exist')
})

app.use((err: createHttpError.HttpError, req: Request, res: Response) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

export default app
