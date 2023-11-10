import { create } from 'zustand'

type State = {
  spotifyAccessToken: string
  spotifyRefreshToken: string
  discogsNonce: string
  discogsAccessToken: string
  discogsRefreshToken: string
  isLoggedIn: boolean
}


type Actions = {
  setSpotifyAccessToken: (token:string) => void
  setSpotifyRefreshToken: (token:string) => void
  setDiscogsNonce: (nonce:string) => void
  setDiscogsAccessToken: (token:string) => void
  setDiscogsRefreshToken: (token:string) => void
  setIsLoggedIn: (state:boolean) => void
}


export const useStore = create<State & Actions>((set) => ({
  spotifyAccessToken: '',
  spotifyRefreshToken: '',
  discogsNonce: '',
  discogsAccessToken: '',
  discogsRefreshToken: '',
  isLoggedIn: false,
  setSpotifyAccessToken: (token) => set(() => ({spotifyAccessToken: token})),
  setSpotifyRefreshToken: (token) => set(() => ({spotifyRefreshToken: token})),
  setDiscogsNonce: (nonce) => set(() => ({discogsNonce: nonce})),
  setDiscogsAccessToken: (token) => set(() => ({discogsAccessToken: token})),
  setDiscogsRefreshToken: (token) => set(() => ({discogsRefreshToken: token})),
  setIsLoggedIn: (token) => set(() => ({isLoggedIn: token})),
}))