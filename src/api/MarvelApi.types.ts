
export interface Character {
  id: string
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
  events: ItemList
  series: ItemList
  urls: Array<any>
}

export interface ItemList {
  items: Array<{ name: string }>
}
