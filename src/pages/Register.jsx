import { useMemo, useState } from "react";
import { registerApi } from "../api/auth.api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [focus, setFocus] = useState({ name: false, email: false, password: false });

  const theme = useMemo(
    () => ({
      page: {
        minHeight: "100vh",
        background:
          "radial-gradient(1200px 600px at 10% 10%, rgba(99,102,241,.25), transparent 60%), radial-gradient(900px 500px at 90% 20%, rgba(34,197,94,.18), transparent 55%), radial-gradient(900px 500px at 30% 90%, rgba(236,72,153,.18), transparent 55%), #0B1020",
        color: "#E7EAF2",
        padding: "32px 16px",
        display: "grid",
        placeItems: "center"
      },
      card: {
        width: "100%",
        maxWidth: 440,
        background: "linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.04))",
        border: "1px solid rgba(255,255,255,.12)",
        borderRadius: 18,
        padding: 18,
        boxShadow: "0 18px 50px rgba(0,0,0,.45)",
        backdropFilter: "blur(10px)"
      },
      header: { marginBottom: 12 },
      title: { margin: 0, fontSize: 22, letterSpacing: 0.2 },
      subtitle: { margin: "6px 0 0", color: "rgba(231,234,242,.7)", fontSize: 13 },

      label: {
        display: "block",
        fontSize: 12,
        color: "rgba(231,234,242,.65)",
        margin: "10px 0 6px"
      },

      // ✅ Light inputs + BLACK typed text (as requested)
      inputBase: {
        width: "100%",
        boxSizing: "border-box",
        padding: "12px 12px",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,.14)",
        background: "rgba(255,255,255,.92)",
        color: "#000",
        caretColor: "#000",
        outline: "none",
        fontSize: 14,
        lineHeight: "20px",
        transition: "border-color .2s ease, background .2s ease, box-shadow .2s ease",
        WebkitTextFillColor: "#000"
      },
      inputFocus: {
        borderColor: "rgba(99,102,241,.65)",
        background: "#fff",
        boxShadow: "0 0 0 4px rgba(99,102,241,.18)"
      },

      btn: {
        width: "100%",
        marginTop: 14,
        padding: "12px 14px",
        borderRadius: 14,
        border: "1px solid rgba(99,102,241,.45)",
        background: "linear-gradient(180deg, rgba(99,102,241,.35), rgba(99,102,241,.18))",
        color: "#E7EAF2",
        cursor: "pointer",
        fontWeight: 600,
        letterSpacing: 0.2,
        boxShadow: "0 12px 30px rgba(0,0,0,.35)",
        transition: "filter .2s ease, border-color .2s ease, transform .08s ease"
      },
      btnHover: { filter: "brightness(1.08)", borderColor: "rgba(99,102,241,.65)" },
      btnDisabled: { cursor: "not-allowed", opacity: 0.65 },

      error: {
        marginTop: 12,
        background: "rgba(239,68,68,.10)",
        border: "1px solid rgba(239,68,68,.35)",
        color: "#fecaca",
        padding: "10px 12px",
        borderRadius: 12
      },

      footer: { marginTop: 14, fontSize: 13, color: "rgba(231,234,242,.75)" },
      link: {
        color: "#c7d2fe",
        textDecoration: "none",
        borderBottom: "1px dashed rgba(199,210,254,.45)"
      }
    }),
    []
  );

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await registerApi(form);
      nav("/login");
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={theme.page}>
      <div style={theme.card}>
        <div style={theme.header}>
          <h2 style={theme.title}>Register</h2>
          <p style={theme.subtitle}>Create your account to get started</p>
        </div>

        <form onSubmit={onSubmit}>
          <label style={theme.label} htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={onChange}
            autoComplete="name"
            style={{ ...theme.inputBase, ...(focus.name ? theme.inputFocus : {}) }}
            onFocus={() => setFocus((p) => ({ ...p, name: true }))}
            onBlur={() => setFocus((p) => ({ ...p, name: false }))}
          />

          <label style={theme.label} htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={onChange}
            autoComplete="email"
            style={{ ...theme.inputBase, ...(focus.email ? theme.inputFocus : {}) }}
            onFocus={() => setFocus((p) => ({ ...p, email: true }))}
            onBlur={() => setFocus((p) => ({ ...p, email: false }))}
          />

          <label style={theme.label} htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={onChange}
            autoComplete="new-password"
            style={{ ...theme.inputBase, ...(focus.password ? theme.inputFocus : {}) }}
            onFocus={() => setFocus((p) => ({ ...p, password: true }))}
            onBlur={() => setFocus((p) => ({ ...p, password: false }))}
          />

          <button
            disabled={loading}
            style={{ ...theme.btn, ...(loading ? theme.btnDisabled : {}) }}
            onMouseEnter={(e) => {
              if (!loading) Object.assign(e.currentTarget.style, theme.btnHover);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, { ...theme.btn, ...(loading ? theme.btnDisabled : {}) });
            }}
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        {err && <div style={theme.error}>{err}</div>}

        <p style={theme.footer}>
          Already have an account?{" "}
          <Link to="/login" style={theme.link}>Login</Link>
        </p>
      </div>

      <style>{`
        input::placeholder { color: rgba(0,0,0,.45); }
      `}</style>
    </div>
  );
}
