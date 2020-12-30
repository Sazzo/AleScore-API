import express from 'express'
import cors from 'cors'
import router from './routes'
import startWatcherThread from './utils/startWatcherThread'
import { config } from 'dotenv'
import mal from './utils/mal'
import connectMongo from './db'
import AnimeList from './models/AnimeList'
import Auth from './models/Auth'

config()
const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

if (!process.env.ACCESS_TOKEN || !process.env.REFRESH_TOKEN)
  throw new Error('Invalid Default MAL Auth')

connectMongo(process.env.MONGODB_URI) // Connect to the MongoDB
async function addCollections() {
  const animelist = await AnimeList.findById('alescore')
  const auth = await Auth.findById('alescore')

  if (!auth) {
    new Auth().save()
  }
  if (!animelist) {
    new AnimeList().save()
  }
}

app.listen(7575, async () => {
  console.log("Onee-chan! I'm running at 7575!")

  await addCollections() // Add required collections to the MongoDB.

  await mal.getTokenAndRefresh() // Get MyAnimeList Token
  await mal.getActualAnimeList() // Get Actual Anime List
})

startWatcherThread() // Start AlexandreEsteves stalker (aka watcher)
