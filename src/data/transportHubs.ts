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
  yudanakaStation: {
    id: 'yudanaka-station',
    label: '湯田中站',
    location: {
      latitude: 36.741684,
      longitude: 138.41464,
    },
  },
  shigaKogenYamanoeki: {
    id: 'shiga-kogen-yamanoeki',
    label: '志賀高原山之站',
    location: {
      latitude: 36.7198,
      longitude: 138.4922,
    },
  },
  kutchanStation: {
    id: 'kutchan-station',
    label: '倶知安站',
    location: {
      latitude: 42.9011,
      longitude: 140.7456,
    },
  },
  nisekoStation: {
    id: 'niseko-station',
    label: 'Niseko 站',
    location: {
      latitude: 42.8087,
      longitude: 140.6865,
    },
  },
} as const

export type TransportHubKey = keyof typeof transportHubs
