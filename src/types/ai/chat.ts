import { Provider } from "@/config/ai"

export type User = {
  uid: string
  name?: string
  avatarUrl?: string
}
export type Model = {
  id: string
  type: ModelType
  key: string
  name: string
  provider: Provider
  title: string
}
export type AuthorType = User | Model

export type MessageType = {
  id?: string
  text: string
  modelType: ModelType
  role: Role
  author: AuthorType
}

export enum ModelType {
  Chat = 1,
  Answer = 2,
  Brainstorm = 3,
  Think = 4,
  Research = 5,
}

export enum Role {
  User = 1,
  Model = 2,
}