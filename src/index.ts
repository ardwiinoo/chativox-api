import express, { Application, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app: Application = express()
const port: string = process.env.APP_PORT ?? '3000'

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
