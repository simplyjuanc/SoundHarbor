import { create } from 'zustand';

type State = {
  isLoggedIn: boolean;
  userId: string;
  spotifyAccessToken: string;
  spotifyRefreshToken: string;
  discogsAccessToken: string;
};

type Actions = {
  setIsLoggedIn: (state: boolean) => void;
  setUserId: (token: string) => void;
  setSpotifyAccessToken: (token: string) => void;
  setSpotifyRefreshToken: (token: string) => void;
  setDiscogsAccessToken: (token: string) => void;
  reset: () => void;
};

const initialState: State = {
  isLoggedIn: false,
  userId: ',',
  spotifyAccessToken: '',
  spotifyRefreshToken: '',
  discogsAccessToken: '',
};

export const useAuthStore = create<State & Actions>(set => ({
  ...initialState,
  setUserId: token => set(() => ({ userId: token })),
  setSpotifyAccessToken: token => set(() => ({ spotifyAccessToken: token })),
  setSpotifyRefreshToken: token => set(() => ({ spotifyRefreshToken: token })),
  setIsLoggedIn: bool => set(() => ({ isLoggedIn: bool })),
  setDiscogsAccessToken: token => set(() => ({ discogsAccessToken: token })),
  reset: () => set(initialState),
}));

// TODO?: discogsNonce, setDiscogsRefreshToken
