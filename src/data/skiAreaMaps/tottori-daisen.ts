import type { SkiAreaMapDefinition } from './types'

export const tottoriDaisenMap = {
  areaKey: 'tottori-daisen',
  title: '鳥取大山雪場區域圖',
  note: '以大山町、江府町與周邊交通關係示意，非精準地理比例。',
  layout: {
    collision: {
      minX: 18,
      minY: 8,
      iterations: 10,
    },
  },
  nodes: [
    {
      id: 'yonago-station',
      label: '米子站',
      kind: 'hub',
      hubId: 'yonago-station',
      location: { latitude: 35.423, longitude: 133.336 },
      nudge: { x: -3, y: 2 },
    },
    {
      id: 'ebi-station',
      label: '江尾站',
      kind: 'hub',
      hubId: 'ebi-station',
      location: { latitude: 35.284, longitude: 133.487 },
      nudge: { x: -4, y: 4 },
    },
    {
      id: 'mt-daisen',
      label: '大山',
      kind: 'zone',
      location: { latitude: 35.371, longitude: 133.546 },
      nudge: { x: 4, y: -4 },
    },
    {
      id: 'daisen-white-resort',
      label: '大山白色度假村',
      kind: 'resort',
      resortId: 'daisen-white-resort',
      location: { latitude: 35.391, longitude: 133.533 },
      nudge: { x: 5, y: -2 },
    },
    {
      id: 'okudaisen',
      label: '奧大山',
      kind: 'resort',
      resortId: 'okudaisen',
      location: { latitude: 35.352, longitude: 133.532 },
      nudge: { x: -5, y: 2 },
    },
    {
      id: 'kagamiganaru',
      label: '鏡ヶ成',
      kind: 'resort',
      resortId: 'kagamiganaru',
      location: { latitude: 35.349, longitude: 133.535 },
      nudge: { x: 7, y: 5 },
    },
  ],
} satisfies SkiAreaMapDefinition
