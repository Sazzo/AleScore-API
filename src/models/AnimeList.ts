import mongoose, { Schema, Document } from 'mongoose'

export interface IAnimeList extends Document {
  _id: String
  lastChanges: Object
  beforeChanges: Object
  oldList: Array<Object>
}
const AnimeListSchema: Schema = new Schema({
  _id: { type: String, required: true, default: 'alescore' },
  lastChanges: { type: Object, required: true, default: {} },
  beforeChanges: { type: Object, required: true, default: {} },
  oldList: { type: Array, required: true, default: [] },
})

const AnimeList = mongoose.model<IAnimeList>(
  'Animelist',
  AnimeListSchema,
  'animelist'
)
export default AnimeList
