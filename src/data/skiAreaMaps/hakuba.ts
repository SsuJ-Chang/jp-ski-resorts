import { transportHubs } from '../transportHubs'
import type { SkiAreaMapDefinition } from './types'

export const hakubaMap = {
  areaKey: 'hakuba',
  title: '白馬區域圖',
  note: '依經緯度正規化後的大致相對位置，非精準比例地圖。',
  nodes: [
    {
      id: 'hakuba-cortina',
      label: '白馬Cortina',
      kind: 'resort',
      resortId: 'hakuba-cortina',
    },
    {
      id: 'hakuba-norikura-onsen',
      label: '白馬乘鞍溫泉',
      kind: 'resort',
      resortId: 'hakuba-norikura-onsen',
      nudge: { x: -2 },
    },
    {
      id: 'tsugaike-kogen',
      label: '栂池高原',
      kind: 'resort',
      resortId: 'tsugaike-kogen',
      nudge: { x: 2 },
    },
    {
      id: 'hakuba-iwatake',
      label: '白馬岩岳',
      kind: 'resort',
      resortId: 'hakuba-iwatake',
      nudge: { x: -2 },
    },
    {
      id: 'hakuba-happo-one',
      label: '白馬八方尾根',
      kind: 'resort',
      resortId: 'hakuba-happo-one',
      nudge: { x: -2, y: -1 },
    },
    {
      ...transportHubs.hakubaStation,
      kind: 'hub',
      hubId: 'hakubaStation',
      nudge: { x: 4 },
    },
    {
      ...transportHubs.happoBusTerminal,
      kind: 'hub',
      hubId: 'happoBusTerminal',
      nudge: { x: -5, y: 4 },
    },
    {
      id: 'hakuba-goryu',
      label: '白馬五龍',
      kind: 'resort',
      resortId: 'hakuba-goryu',
      nudge: { x: -3 },
    },
    {
      id: 'hakuba47',
      label: 'Hakuba 47',
      kind: 'resort',
      resortId: 'hakuba47',
      nudge: { x: -4, y: -2 },
    },
    {
      id: 'hakuba-sanosaka',
      label: '白馬佐野坂',
      kind: 'resort',
      resortId: 'hakuba-sanosaka',
    },
    {
      id: 'kashimayari',
      label: '鹿島槍',
      kind: 'resort',
      resortId: 'kashimayari',
      nudge: { x: -2 },
    },
    {
      id: 'jiigatake',
      label: '爺岳',
      kind: 'resort',
      resortId: 'jiigatake',
      nudge: { x: 2 },
    },
  ],
} as const satisfies SkiAreaMapDefinition
