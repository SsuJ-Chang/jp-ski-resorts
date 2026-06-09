import type { SkiAreaMapDefinition } from './types'

export const myokoKogenMap = {
  areaKey: 'myoko-kogen',
  title: '妙高高原雪場區域圖',
  note: '以妙高高原、赤倉與新井周邊的交通與雪場相對位置示意，非精準地理比例。',
  layout: {
    collision: {
      minX: 17,
      minY: 8,
      iterations: 10,
    },
  },
  nodes: [
    {
      id: 'myoko-kogen-station',
      label: '妙高高原站',
      kind: 'hub',
      hubId: 'myoko-kogen-station',
      location: { latitude: 36.8725, longitude: 138.1743 },
      nudge: { x: -5, y: 5 },
    },
    {
      id: 'joetsumyoko-station',
      label: '上越妙高站',
      kind: 'hub',
      hubId: 'joetsumyoko-station',
      location: { latitude: 37.081, longitude: 138.248 },
      nudge: { x: 3, y: -2 },
    },
    {
      id: 'akakura-onsen-town',
      label: '赤倉溫泉街',
      kind: 'zone',
      location: { latitude: 36.893, longitude: 138.18 },
      nudge: { x: 8, y: 3 },
    },
    {
      id: 'myoko-suginohara',
      label: '杉之原',
      kind: 'resort',
      resortId: 'myoko-suginohara',
      location: { latitude: 36.8646, longitude: 138.1441 },
      nudge: { x: -6, y: -2 },
    },
    {
      id: 'ikenotaira-onsen',
      label: '池之平',
      kind: 'resort',
      resortId: 'ikenotaira-onsen',
      location: { latitude: 36.8799, longitude: 138.1781 },
      nudge: { x: 0, y: 6 },
    },
    {
      id: 'akakura-onsen',
      label: '赤倉溫泉',
      kind: 'resort',
      resortId: 'akakura-onsen',
      location: { latitude: 36.8933, longitude: 138.1783 },
      nudge: { x: 2, y: -5 },
    },
    {
      id: 'akakura-kanko',
      label: '赤倉觀光',
      kind: 'resort',
      resortId: 'akakura-kanko',
      location: { latitude: 36.8877, longitude: 138.1846 },
      nudge: { x: 9, y: 1 },
    },
    {
      id: 'lotte-arai',
      label: '樂天新井',
      kind: 'resort',
      resortId: 'lotte-arai',
      location: { latitude: 36.9854, longitude: 138.2278 },
      nudge: { x: -3, y: 0 },
    },
  ],
} satisfies SkiAreaMapDefinition
