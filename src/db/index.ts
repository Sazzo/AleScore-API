import mongoose from 'mongoose'

/**
 * Connect to the MongoDB
 * @param {String} db - MongoDB Connection URL
 */
export default (db: string) => {
  const connect = () => {
    mongoose
      .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return console.log(`[Database] Successfully connected to ${db}`)
      })
      .catch((error) => {
        console.log('[Database] Error connecting to database: ', error)
        return process.exit(1)
      })
  }
  connect()

  mongoose.connection.on('disconnected', connect)
}
