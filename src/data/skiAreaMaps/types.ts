export type Coordinates = {
  latitude: number
  longitude: number
}

export type SkiAreaMapNodeKind = 'resort' | 'hub' | 'zone'

type SkiAreaMapNodeBase = {
  id: string
  label: string
  kind: SkiAreaMapNodeKind
  nudge?: {
    x?: number
    y?: number
  }
}

export type SkiAreaResortMapNode = SkiAreaMapNodeBase & {
  kind: 'resort'
  resortId: string
  location?: Coordinates
}

export type SkiAreaHubMapNode = SkiAreaMapNodeBase & {
  kind: 'hub'
  hubId: string
  location: Coordinates
}

export type SkiAreaZoneMapNode = SkiAreaMapNodeBase & {
  kind: 'zone'
  location: Coordinates
}

export type SkiAreaMapNode = SkiAreaResortMapNode | SkiAreaHubMapNode | SkiAreaZoneMapNode

export type SkiAreaMapDefinition = {
  areaKey: string
  title: string
  note: string
  layout?: {
    collision?: {
      minX?: number
      minY?: number
      iterations?: number
    }
  }
  nodes: SkiAreaMapNode[]
}
