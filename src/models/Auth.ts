import mongoose, { Schema, Document } from 'mongoose'

export interface IAuth extends Document {
  _id: string
  access_token: string
  refresh_token: string
}
const AuthSchema: Schema = new Schema({
  _id: { type: String, required: true, default: 'alescore' },
  access_token: {
    type: String,
    required: true,
    default: process.env.ACCESS_TOKEN,
  },
  refresh_token: {
    type: String,
    required: true,
    default: process.env.REFRESH_TOKEN,
  },
})

const Auth = mongoose.model<IAuth>('Auth', AuthSchema, 'auth')
export default Auth
