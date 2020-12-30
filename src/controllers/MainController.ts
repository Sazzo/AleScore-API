import { Request, Response } from 'express'
import AnimeList from '../models/AnimeList'

export default {
  async getChanges(req: Request, res: Response) {
    const anime = await AnimeList.findById('alescore').select('-oldList')
    return res.json({
      lastChanges: anime.lastChanges,
      beforeChanges: anime.beforeChanges,
    })
  },
}
