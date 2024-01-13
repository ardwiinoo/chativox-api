import app from './app/app'

const port: string = process.env.APP_PORT ?? '3000'

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
  console.info('process id', process.pid)
})

const exitHandler = () => {
  if (server) {
    console.info('server closed...')
    process.exit(1)
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
    process.exit(1)
  }
})
