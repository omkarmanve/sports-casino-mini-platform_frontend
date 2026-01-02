import { api } from "./client";

export const getGamesApi = ({ token, sport, provider, favorites }) => {
  const params = new URLSearchParams();
  if (sport) params.set("sport", sport);
  if (provider) params.set("provider", provider);
  if (favorites) params.set("favorites", "true");

  const qs = params.toString() ? `?${params.toString()}` : "";
  return api(`/games${qs}`, { token });
};
