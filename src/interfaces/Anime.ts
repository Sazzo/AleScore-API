export default interface Anime {
  node: {
    id: string
    title: string
    main_picture: {
      medium: string
      large: string
    }
  }
  list_status: {
    status: 'completed' | 'dropped' | 'on_hold' | 'plan_to_watch'
    score: number
    num_episodes_watched: number
    is_rewatching: boolean
    updated_at: string
  }
}
