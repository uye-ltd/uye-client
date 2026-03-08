export interface Channel {
  id: number
  tags: string
  color: string
  link: string
}

export interface ChannelCover {
  channelId: number
  layer: 1 | 2 | 3
  url: string
}

export interface NowPlaying {
  artist: string
  song_title: string
  album: string
  year: string
  label: string
  path: string
}
