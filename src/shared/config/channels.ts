export interface ChannelConfig {
  id: number
  color: string
  streamPath: string
  tags: string[]
  sidebarTags: string
}

export const CHANNELS: ChannelConfig[] = [
  {
    id: 1,
    color: '#2563eb',
    streamPath: '/traumprinz',
    tags: [
      'traumprinz',
      'lost house',
      'planet uterus',
      'dj metatron',
      'dj healer',
      'endless chill',
      'working environment',
      'prime minister of doom',
      'essential giegling',
      'home/club listening',
    ],
    sidebarTags: 'traumprinz, lost house, planet uterus, dj metatron, dj healer',
  },
  {
    id: 2,
    color: '#dc2626',
    streamPath: '/yurets',
    tags: [
      'yurets collection',
      'random selection',
      'best of',
      'literally anything',
      'musical encyclopedia',
      'nobrow mashup',
      'deep (re)search',
      'egalitarism',
      'librarian punk',
      'experiments on freedom',
      'jingles and jungles',
      'answer from above',
      'time waste',
      'cryptoacoustic',
      'sonic artefacts',
      'great archive of human civilization',
      'slice of eternity',
      'blood and milk',
    ],
    sidebarTags: 'yurets, random, full collection, musical encyclopedia, literally anything',
  },
  {
    id: 3,
    color: '#16a34a',
    streamPath: '/channel3',
    tags: ['yurets', 'random', 'full collection', 'musical encyclopedia', 'literally anything'],
    sidebarTags: 'yurets, random, full collection, musical encyclopedia, literally anything',
  },
  {
    id: 4,
    color: '#9333ea',
    streamPath: '/channel4',
    tags: ['4AD', 'discography', '1980-2000', 'post-punk', 'cocteau twins'],
    sidebarTags: '4AD, discography, 1980-2000, post-punk, cocteau twins',
  },
  {
    id: 5,
    color: '#ea580c',
    streamPath: '/channel5',
    tags: ['traumprinz', 'prince of denmark', 'planet uterus', 'dj metatron', 'lost house'],
    sidebarTags: 'traumprinz, prince of denmark, planet uterus, dj metatron, lost house',
  },
  {
    id: 6,
    color: '#0891b2',
    streamPath: '/channel6',
    tags: ['4AD', 'discography', '1980-2000', 'post-punk', 'cocteau twins'],
    sidebarTags: '4AD, discography, 1980-2000, post-punk, cocteau twins',
  },
  {
    id: 7,
    color: '#ca8a04',
    streamPath: '/channel7',
    tags: ['yurets', 'random', 'full collection', 'musical encyclopedia', 'literally anything'],
    sidebarTags: 'yurets, random, full collection, musical encyclopedia, literally anything',
  },
  {
    id: 8,
    color: '#db2777',
    streamPath: '/channel8',
    tags: ['traumprinz', 'prince of denmark', 'planet uterus', 'dj metatron', 'lost house'],
    sidebarTags: 'traumprinz, prince of denmark, planet uterus, dj metatron, lost house',
  },
  {
    id: 9,
    color: '#4f46e5',
    streamPath: '/channel9',
    tags: ['4AD', 'discography', '1980-2000', 'post-punk', 'cocteau twins'],
    sidebarTags: '4AD, discography, 1980-2000, post-punk, cocteau twins',
  },
]

export function getRandomTags(channel: ChannelConfig, count = 6): string {
  const shuffled = [...channel.tags].sort(() => Math.random() - 0.5)
  let result = shuffled.slice(0, count).join(', ')
  while (result.length > 140 && count > 2) {
    count--
    result = shuffled.slice(0, count).join(', ')
  }
  return result
}
