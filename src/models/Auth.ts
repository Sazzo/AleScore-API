import mongoose, { Schema, Document } from 'mongoose'

import defaultAuth from '../../auth.json'

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
    default: defaultAuth.access_token,
  },
  refresh_token: {
    type: String,
    required: true,
    default: defaultAuth.refresh_token,
  },
})

const Auth = mongoose.model<IAuth>('Auth', AuthSchema, 'auth')
export default Auth
