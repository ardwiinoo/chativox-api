import app from './app/app'
import { initDB, closeDB } from './configs/db'

const port: string = process.env.APP_PORT ?? '3000'

void initDB()

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
  console.info('process id', process.pid)
})

const exitHandler = () => {
  if (server) {
    console.info('server closed...')
    void closeDB()
  }
}

const unexpectedErrorHandler = (err: any) => {
  console.error(err)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

// SIGTERM
process.on('SIGTERM', () => {
  if (server) {
    console.info('server closed...')
    void closeDB()
  }
})
