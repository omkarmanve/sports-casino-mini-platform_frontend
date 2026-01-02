export default function GameCard({ game, isFavorite, onToggleFavorite }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
        <strong>#{game.id}</strong>
        <button onClick={() => onToggleFavorite(game.id)}>
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      {game.type === "sports" ? (
        <>
          <p><b>Sport:</b> {game.sport}</p>
          <p><b>League:</b> {game.league}</p>
          <p><b>Match:</b> {game.team_a} vs {game.team_b}</p>
          <p><b>Start:</b> {game.start_time ? new Date(game.start_time).toLocaleString() : "-"}</p>
        </>
      ) : (
        <>
          <p><b>Game:</b> {game.game_name}</p>
          <p><b>Provider:</b> {game.provider}</p>
          <p><b>Category:</b> {game.category}</p>
        </>
      )}
    </div>
  );
}
