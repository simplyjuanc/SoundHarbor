import { create } from 'zustand'

type State = {
  isLoggedIn: boolean
  spotifyAccessToken: string
  spotifyRefreshToken: string
  // discogsNonce: string
  // discogsAccessToken: string
  // discogsRefreshToken: string
}


type Actions = {
  setIsLoggedIn: (state:boolean) => void
  setSpotifyAccessToken: (token:string) => void
  setSpotifyRefreshToken: (token:string) => void
  // setDiscogsNonce: (nonce:string) => void
  // setDiscogsAccessToken: (token:string) => void
  // setDiscogsRefreshToken: (token:string) => void
  reset: () => void
}

const initialState:State = {
  isLoggedIn: false,
  spotifyAccessToken: '',
  spotifyRefreshToken: '',
  // discogsNonce: '',
  // discogsAccessToken: '',
  // discogsRefreshToken: '',
}

export const useAuthStore = create<State & Actions>((set) => ({
  ...initialState,
  setSpotifyAccessToken: (token) => set(() => ({spotifyAccessToken: token})),
  setSpotifyRefreshToken: (token) => set(() => ({spotifyRefreshToken: token})),
  setIsLoggedIn: (bool) => set(() => ({isLoggedIn: bool})),
  // setDiscogsNonce: (nonce) => set(() => ({discogsNonce: nonce})),
  // setDiscogsAccessToken: (token) => set(() => ({discogsAccessToken: token})),
  // setDiscogsRefreshToken: (token) => set(() => ({discogsRefreshToken: token})),
  reset: () => {
    set(initialState)
  },
}))