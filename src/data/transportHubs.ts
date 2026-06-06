export const transportHubs = {
  echigoYuzawaStation: {
    id: 'echigo-yuzawa-station',
    label: '越後湯澤站',
    location: {
      latitude: 36.9358,
      longitude: 138.8096,
    },
  },
  hakubaStation: {
    id: 'hakuba-station',
    label: '白馬站',
    location: {
      latitude: 36.6979,
      longitude: 137.8619,
    },
  },
  happoBusTerminal: {
    id: 'happo-bus-terminal',
    label: '八方巴士總站',
    location: {
      latitude: 36.6997,
      longitude: 137.8465,
    },
  },
} as const

export type TransportHubKey = keyof typeof transportHubs
