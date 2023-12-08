import { create } from 'zustand';

type State = {
  isLoggedIn: boolean;
  spotifyAccessToken: string;
  spotifyRefreshToken: string;
  discogsAccessToken: string;
};

type Actions = {
  setIsLoggedIn: (state: boolean) => void;
  setSpotifyAccessToken: (token: string) => void;
  setSpotifyRefreshToken: (token: string) => void;
  setDiscogsAccessToken: (token: string) => void;
  reset: () => void;
};

const initialState: State = {
  isLoggedIn: false,
  spotifyAccessToken: '',
  spotifyRefreshToken: '',
  discogsAccessToken: '',
};

export const useAuthStore = create<State & Actions>(set => ({
  ...initialState,
  setSpotifyAccessToken: token => set(() => ({ spotifyAccessToken: token })),
  setSpotifyRefreshToken: token => set(() => ({ spotifyRefreshToken: token })),
  setIsLoggedIn: bool => set(() => ({ isLoggedIn: bool })),
  setDiscogsAccessToken: token => set(() => ({ discogsAccessToken: token })),
  reset: () => set(initialState),
}));

// TODO?: discogsNonce, setDiscogsRefreshToken
