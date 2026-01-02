import { useMemo } from "react";

export default function Filters({
  sport,
  provider,
  onlyFav,
  onSportChange,
  onProviderChange,
  onFavoritesChange,
  onReset
}) {
  const sportsOptions = ["Cricket", "Football", "Tennis"];
  const providerOptions = ["Evolution", "Pragmatic Play"];

  const theme = useMemo(
    () => ({
      wrapper: {
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        margin: "14px 0",
        alignItems: "center"
      },

     
      select: {
        minWidth: 180,
        padding: "10px 12px",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,.18)",
        background: "rgba(255,255,255,.92)",
        color: "#000",
        fontSize: 14,
        outline: "none",
        cursor: "pointer"
      },

      checkboxWrap: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderRadius: 12,
        background: "rgba(255,255,255,.06)",
        border: "1px solid rgba(255,255,255,.12)",
        color: "#E7EAF2",
        cursor: "pointer"
      },

      checkbox: {
        width: 16,
        height: 16,
        cursor: "pointer"
      },

      resetBtn: {
        padding: "10px 14px",
        borderRadius: 12,
        border: "1px solid rgba(239,68,68,.45)",
        background: "rgba(239,68,68,.15)",
        color: "#fecaca",
        cursor: "pointer",
        fontWeight: 500
      }
    }),
    []
  );

  return (
    <div style={theme.wrapper}>
      <select
        value={sport}
        style={theme.select}
        onChange={(e) => {
          onSportChange(e.target.value);
          onProviderChange("");
        }}
      >
        <option value="">Filter by Sport</option>
        {sportsOptions.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        value={provider}
        style={theme.select}
        onChange={(e) => {
          onProviderChange(e.target.value);
          onSportChange("");
        }}
      >
        <option value="">Filter by Provider</option>
        {providerOptions.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <label style={theme.checkboxWrap}>
        <input
          type="checkbox"
          checked={onlyFav}
          onChange={(e) => onFavoritesChange(e.target.checked)}
          style={theme.checkbox}
        />
        Favorites only
      </label>

      <button style={theme.resetBtn} onClick={onReset}>
        Reset
      </button>

      
      <style>{`
        select option { color: #000; }
      `}</style>
    </div>
  );
}
