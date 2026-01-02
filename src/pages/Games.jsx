import { useEffect, useMemo, useState } from "react";
import { getGamesApi } from "../api/games.api";
import {
  addFavoriteApi,
  removeFavoriteApi,
  getFavoritesApi
} from "../api/favorites.api";
import Filters from "../components/Filters";

export default function Games() {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [items, setItems] = useState([]);
  const [favIds, setFavIds] = useState(new Set());

  const [sport, setSport] = useState("");
  const [provider, setProvider] = useState("");
  const [onlyFav, setOnlyFav] = useState(false);

  const isFavorite = (id) => favIds.has(id);

  const theme = useMemo(
    () => ({
      page: {
        minHeight: "100vh",
        background:
          "radial-gradient(1200px 600px at 10% 10%, rgba(99,102,241,.25), transparent 60%), radial-gradient(900px 500px at 90% 20%, rgba(34,197,94,.18), transparent 55%), radial-gradient(900px 500px at 30% 90%, rgba(236,72,153,.18), transparent 55%), #0B1020",
        color: "#E7EAF2",
        padding: "32px 16px"
      },
      container: {
        maxWidth: 950,
        margin: "0 auto"
      },
      topbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        marginBottom: 18
      },
      titleWrap: {
        display: "flex",
        flexDirection: "column",
        gap: 4
      },
      title: {
        margin: 0,
        fontSize: 22,
        letterSpacing: 0.2
      },
      subtitle: {
        margin: 0,
        color: "rgba(231,234,242,.7)",
        fontSize: 13
      },
      btn: {
        background: "rgba(255,255,255,.06)",
        color: "#E7EAF2",
        border: "1px solid rgba(255,255,255,.12)",
        borderRadius: 12,
        padding: "10px 14px",
        cursor: "pointer",
        transition: "transform .08s ease, background .2s ease, border-color .2s ease"
      },
      btnDanger: {
        background: "rgba(239,68,68,.12)",
        border: "1px solid rgba(239,68,68,.35)"
      },
      btnHover: {
        background: "rgba(255,255,255,.10)",
        borderColor: "rgba(255,255,255,.20)"
      },
      panel: {
        background: "rgba(255,255,255,.06)",
        border: "1px solid rgba(255,255,255,.12)",
        borderRadius: 16,
        padding: 14,
        marginBottom: 16,
        backdropFilter: "blur(10px)"
      },
      error: {
        background: "rgba(239,68,68,.10)",
        border: "1px solid rgba(239,68,68,.35)",
        color: "#fecaca",
        padding: "10px 12px",
        borderRadius: 12,
        margin: "10px 0 14px"
      },
      empty: {
        color: "rgba(231,234,242,.75)",
        marginTop: 8
      },
      grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 14
      },
      card: {
        background:
          "linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.04))",
        border: "1px solid rgba(255,255,255,.12)",
        borderRadius: 16,
        padding: 14,
        boxShadow: "0 10px 30px rgba(0,0,0,.35)",
        transition: "transform .12s ease, border-color .2s ease, background .2s ease"
      },
      cardHover: {
        transform: "translateY(-2px)",
        borderColor: "rgba(255,255,255,.20)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.05))"
      },
      cardTop: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        marginBottom: 10
      },
      badge: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8
      },
      idPill: {
        fontSize: 12,
        padding: "6px 10px",
        borderRadius: 999,
        background: "rgba(99,102,241,.18)",
        border: "1px solid rgba(99,102,241,.35)",
        color: "#c7d2fe"
      },
      typePill: {
        fontSize: 12,
        padding: "6px 10px",
        borderRadius: 999,
        background: "rgba(34,197,94,.14)",
        border: "1px solid rgba(34,197,94,.30)",
        color: "#bbf7d0"
      },
      favBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,.12)",
        background: "rgba(255,255,255,.06)",
        color: "#E7EAF2",
        cursor: "pointer",
        display: "grid",
        placeItems: "center",
        transition: "transform .08s ease, background .2s ease, border-color .2s ease"
      },
      favActive: {
        background: "rgba(250,204,21,.15)",
        border: "1px solid rgba(250,204,21,.35)",
        color: "#fde68a"
      },
      line: {
        height: 1,
        background: "rgba(255,255,255,.10)",
        margin: "10px 0 12px"
      },
      kv: {
        margin: "8px 0",
        color: "rgba(231,234,242,.85)",
        fontSize: 14
      },
      label: {
        color: "rgba(231,234,242,.6)"
      }
    }),
    []
  );

  const fetchAll = async () => {
    setErr("");
    setLoading(true);
    try {
      const [gamesRes, favRes] = await Promise.all([
        getGamesApi({
          token,
          sport: sport || null,
          provider: provider || null,
          favorites: onlyFav
        }),
        getFavoritesApi(token)
      ]);

      setItems(gamesRes.items || []);
      setFavIds(new Set((favRes.items || []).map((g) => g.id)));
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [sport, provider, onlyFav]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const toggleFavorite = async (gameId) => {
    setErr("");
    try {
      if (isFavorite(gameId)) {
        await removeFavoriteApi({ token, gameId });
        setFavIds((prev) => {
          const next = new Set(prev);
          next.delete(gameId);
          return next;
        });
      } else {
        await addFavoriteApi({ token, gameId });
        setFavIds((prev) => new Set(prev).add(gameId));
      }
    } catch (e) {
      setErr(e.message);
    }
  };

  if (loading) {
    return (
      <div style={theme.page}>
        <div style={theme.container}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={theme.page}>
      <div style={theme.container}>
        <div style={theme.topbar}>
          <div style={theme.titleWrap}>
            <h2 style={theme.title}>Games / Matches</h2>
            <p style={theme.subtitle}>Filter, browse, and star your favorites</p>
          </div>

          <button
            onClick={logout}
            style={{ ...theme.btn, ...theme.btnDanger }}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, theme.btnHover);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, { ...theme.btn, ...theme.btnDanger });
            }}
          >
            Logout
          </button>
        </div>

        <div style={theme.panel}>
          <Filters
            sport={sport}
            provider={provider}
            onlyFav={onlyFav}
            onSportChange={setSport}
            onProviderChange={setProvider}
            onFavoritesChange={setOnlyFav}
            onReset={() => {
              setSport("");
              setProvider("");
              setOnlyFav(false);
            }}
          />
        </div>

        {err && <div style={theme.error}>{err}</div>}
        {!items.length && <p style={theme.empty}>No games found.</p>}

        <div style={theme.grid}>
          {items.map((g) => {
            const fav = isFavorite(g.id);

            return (
              <div
                key={g.id}
                style={theme.card}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, theme.cardHover)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, theme.card)}
              >
                <div style={theme.cardTop}>
                  <div style={theme.badge}>
                    <span style={theme.idPill}>#{g.id}</span>
                    <span style={theme.typePill}>{g.type}</span>
                  </div>

                  <button
                    onClick={() => toggleFavorite(g.id)}
                    style={{
                      ...theme.favBtn,
                      ...(fav ? theme.favActive : {})
                    }}
                    title={fav ? "Remove from favorites" : "Add to favorites"}
                  >
                    {fav ? "★" : "☆"}
                  </button>
                </div>

                <div style={theme.line} />

                {g.type === "sports" ? (
                  <>
                    <p style={theme.kv}>
                      <span style={theme.label}>Sport:</span> {g.sport}
                    </p>
                    <p style={theme.kv}>
                      <span style={theme.label}>League:</span> {g.league}
                    </p>
                    <p style={theme.kv}>
                      <span style={theme.label}>Match:</span> {g.team_a} vs {g.team_b}
                    </p>
                    <p style={theme.kv}>
                      <span style={theme.label}>Start:</span>{" "}
                      {g.start_time ? new Date(g.start_time).toLocaleString() : "-"}
                    </p>
                  </>
                ) : (
                  <>
                    <p style={theme.kv}>
                      <span style={theme.label}>Game:</span> {g.game_name}
                    </p>
                    <p style={theme.kv}>
                      <span style={theme.label}>Provider:</span> {g.provider}
                    </p>
                    <p style={theme.kv}>
                      <span style={theme.label}>Category:</span> {g.category}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
