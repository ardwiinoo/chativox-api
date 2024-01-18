import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const initDB = async () => {
  const { MONGODB_URI, NODE_ENV } = process.env

  if (!MONGODB_URI) {
    console.error('[MongoDB] MONGODB_URI is not defined')
    process.exit(1)
  }

  try {
    await mongoose.connect(MONGODB_URI)

    if (NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }

    console.log('[MongoDB] Connected...')
  } catch (error) {
    console.error('Error while connecting to MongoDB:', error)
    process.exit(1)
  }

  mongoose.connection.on('error', (err) => {
    console.log(`[MongoDB] Err Connection ${err}`)
    process.exit(1)
  })
}

const closeDB = async () => {
  try {
    await mongoose.connection.close()
    console.log('[MongoDB] Connection closed.')
    process.exit(0)
  } catch (err) {
    console.error('Failed to close the MongoDB connection:', err)
    process.exit(1)
  }
}

export { initDB, closeDB }
