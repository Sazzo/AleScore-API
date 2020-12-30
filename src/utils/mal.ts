import axios from 'axios'
import qs from 'querystring'
import AnimeList from '../models/AnimeList'
import Auth from '../models/Auth'

export default {
  /**
   * Get the Access Token and the Refresh Token and refresh.
   */
  async getTokenAndRefresh() {
    try {
      const auth = await Auth.findById('alescore')
      const reqData = {
        grant_type: 'refresh_token',
        refresh_token: auth.refresh_token,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }
      const res = await axios({
        url: 'https://myanimelist.net/v1/oauth2/token',
        method: 'POST',
        data: qs.stringify(reqData),
      })
      auth.access_token = res.data.access_token
      auth.refresh_token = res.data.refresh_token
      await auth.save()
    } catch (e) {
      console.log(e)
    }
  },
  /**
   * Get the actual AlexandreEsteves animelist.
   */
  async getActualAnimeList() {
    try {
      const auth = await Auth.findById('alescore')
      const res = await axios.get(
        'https://api.myanimelist.net/v2/users/AmazingSazz/animelist?fields=list_status&limit=1000',
        {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        }
      )

      let animelist = await AnimeList.findById('alescore')
      animelist.oldList = res.data.data
      animelist.save()
    } catch (e) {
      console.log(e)
    }
  },
}
