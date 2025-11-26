export type ModelType = 1 | 2 | 3 | 4 | 5
export type RoleType = 1 | 2
export type User = {
  uid: string
  name?: string
  avatarUrl?: string
}
export type Model = {
  id: string
  type: ModelType
  name: string
  provider: string
  title: string
}
export type AuthorType = User | Model

export type MessageType = {
  id?: string
  text: string
  modelType: ModelType
  role: RoleType
  author: AuthorType
}