import axios from 'axios'
import { create, diff, patch } from 'jsondiffpatch'
import Anime from 'src/interfaces/Anime'

import AnimeList from '../models/AnimeList'
import Auth from '../models/Auth'

/**
 * AnimeList Watcher Thread
 * @desc - Watch Alexandre animelist and detect changes in the score if they exist.
 */
export default async function startWatcherThread() {
  setInterval(async () => {
    const auth = await Auth.findById('alescore') // Hardcoded ID
    const animelist = await AnimeList.findById('alescore') // Hardcoded ID
    const res = await axios.get(
      'https://api.myanimelist.net/v2/users/AlexandreEsteves/animelist?fields=list_status&limit=1000',
      {
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      }
    )
    // Check if the JSON has changes
    if (JSON.stringify(res.data.data) !== JSON.stringify(animelist.oldList)) {
      const newList: Array<Anime> = res.data.data
      const oldList: Array<Anime> = animelist.oldList

      const oldScoreList = oldList.map((anime) => anime.list_status.score)
      const newScoreList = newList.map((anime) => anime.list_status.score)

      const listDiff = diff(oldScoreList, newScoreList)
      if (listDiff !== undefined) {
        // If score is the same, ignore otherwise continue.
        animelist.lastChanges = newList[Object.keys(listDiff)[0]] // Get the changed anime using the index of the diff.
        animelist.beforeChanges = oldList[Object.keys(listDiff)[0]] // Get the anime before the changes in oldList
        animelist.oldList = newList
        await animelist.save()
      }
    }
  }, 20000)
}
