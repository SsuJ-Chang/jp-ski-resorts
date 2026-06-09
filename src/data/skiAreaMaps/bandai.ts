import type { SkiAreaMapDefinition } from './types'

export const bandaiMap = {
  areaKey: 'bandai',
  title: '磐梯山雪場區域圖',
  note: '以磐梯山、裏磐梯與豬苗代周邊交通關係示意，非精準地理比例。',
  layout: {
    collision: {
      minX: 18,
      minY: 8,
      iterations: 10,
    },
  },
  nodes: [
    {
      id: 'koriyama-station',
      label: '郡山站',
      kind: 'hub',
      hubId: 'koriyama-station',
      location: { latitude: 37.398, longitude: 140.389 },
      nudge: { x: 2, y: 2 },
    },
    {
      id: 'inawashiro-station',
      label: '豬苗代站',
      kind: 'hub',
      hubId: 'inawashiro-station',
      location: { latitude: 37.557, longitude: 140.104 },
      nudge: { x: -3, y: 6 },
    },
    {
      id: 'urabandai',
      label: '裏磐梯',
      kind: 'zone',
      location: { latitude: 37.662, longitude: 140.092 },
      nudge: { x: -4, y: -2 },
    },
    {
      id: 'necoma-mountain',
      label: 'Necoma Mountain',
      kind: 'resort',
      resortId: 'necoma-mountain',
      location: { latitude: 37.602, longitude: 140.032 },
      nudge: { x: -8, y: -4 },
    },
    {
      id: 'inawashiro',
      label: '豬苗代',
      kind: 'resort',
      resortId: 'inawashiro',
      location: { latitude: 37.565, longitude: 140.118 },
      nudge: { x: 4, y: 2 },
    },
    {
      id: 'grandeco',
      label: 'Grandeco',
      kind: 'resort',
      resortId: 'grandeco',
      location: { latitude: 37.688, longitude: 140.085 },
      nudge: { x: 4, y: -3 },
    },
    {
      id: 'minowa',
      label: 'Minowa',
      kind: 'resort',
      resortId: 'minowa',
      location: { latitude: 37.656, longitude: 140.29 },
      nudge: { x: 3, y: 0 },
    },
  ],
} satisfies SkiAreaMapDefinition
