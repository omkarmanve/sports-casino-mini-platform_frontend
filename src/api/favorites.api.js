import { api } from "./client";

export const getFavoritesApi = (token) => api("/favorites", { token });
export const addFavoriteApi = ({ token, gameId }) => api(`/favorites/${gameId}`, { method: "POST", token });
export const removeFavoriteApi = ({ token, gameId }) => api(`/favorites/${gameId}`, { method: "DELETE", token });
