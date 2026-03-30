"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const router     = useRouter();

    const [form, setForm]       = useState({ email: "", password: "" });
    const [error, setError]     = useState("");
    const [cargando, setCargando] = useState(false);
    const [verPassword, setVerPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(""); // limpia el error al escribir
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError("");

        try {
        await login({ email: form.email, password: form.password });
        router.push("/dashboard"); // redirige al dashboard tras login exitoso
        } catch (err) {
        // El backend devuelve { success: false, message: "..." }
        setError(err.response?.data?.message || "Error al iniciar sesión");
        } finally {
        setCargando(false);
        }
    };

    return (
        <div style={styles.page}>
        {/* Navbar */}
        <nav style={styles.navbar}>
            <span style={styles.logo}>Linktin</span>
            <div style={styles.navLinks}>
            <a href="#" style={styles.navLink}>Find a job</a>
            <a href="#" style={styles.navLink}>People</a>
            <a href="#" style={styles.navLink}>Learning</a>
            </div>
            <div style={styles.navRight}>
            <button style={styles.languageBtn}>🌐 Language</button>
            <Link href="/register" style={styles.joinBtn}>Join now</Link>
            </div>
        </nav>

        {/* Card central */}
        <main style={styles.main}>
            <div style={styles.card}>
            {/* Logo */}
            <div style={styles.logoBox}>L</div>
            <h1 style={styles.title}>Welcome Back</h1>
            <p style={styles.subtitle}>Elevate your professional journey today.</p>

            <form onSubmit={handleSubmit} style={styles.form}>
                {/* Email */}
                <div style={styles.field}>
                <label style={styles.label}>EMAIL</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    required
                    style={styles.input}
                />
                </div>

                {/* Password */}
                <div style={styles.field}>
                <div style={styles.passwordHeader}>
                    <label style={styles.label}>PASSWORD</label>
                    <a href="#" style={styles.forgotLink}>Forgot Password?</a>
                </div>
                <div style={styles.passwordWrapper}>
                    <input
                    type={verPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    style={styles.input}
                    />
                    <button
                    type="button"
                    onClick={() => setVerPassword(!verPassword)}
                    style={styles.eyeBtn}
                    >
                    {verPassword ? "🙈" : "👁️"}
                    </button>
                </div>
                </div>

                {/* Remember me */}
                <label style={styles.checkboxLabel}>
                <input type="checkbox" style={{ marginRight: 8 }} />
                Remember me
                </label>

                {/* Error */}
                {error && <p style={styles.errorMsg}>{error}</p>}

                {/* Submit */}
                <button type="submit" disabled={cargando} style={styles.submitBtn}>
                {cargando ? "Signing in..." : "Sign In"}
                </button>
            </form>

            {/* Divider */}
            <div style={styles.divider}>
                <hr style={styles.hr} />
                <span style={styles.dividerText}>OR SIGN IN WITH</span>
                <hr style={styles.hr} />
            </div>

            {/* Social buttons */}
            <div style={styles.socialRow}>
                <button style={styles.socialBtn}>🔵 Google</button>
                <button style={styles.socialBtn}>💼 LinkedIn</button>
            </div>

            {/* Footer link */}
            <p style={styles.footerLink}>
                New to Linktin?{" "}
                <Link href="/register" style={styles.linkBlue}>Join now</Link>
            </p>
            </div>
        </main>

        {/* Footer */}
        <footer style={styles.footer}>
            <div style={styles.footerLinks}>
            <strong>Linktin</strong>
            {["Privacy Policy","User Agreement","Cookie Policy","Copyright Policy","Brand Policy","Guest Controls","Community Guidelines","Help Center"].map(item => (
                <a key={item} href="#" style={styles.footerLink2}>{item}</a>
            ))}
            </div>
            <p style={styles.copyright}>© 2024 Linktin Corporation</p>
        </footer>
        </div>
    );
    }

    const styles = {
    page:            { minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#dce6f0", fontFamily: "system-ui, sans-serif" },
    navbar:          { display: "flex", alignItems: "center", padding: "0 24px", height: 56, backgroundColor: "#fff", borderBottom: "1px solid #e0e0e0", gap: 24 },
    logo:            { fontWeight: 700, fontSize: 20, color: "#0a66c2", marginRight: 16 },
    navLinks:        { display: "flex", gap: 24, flex: 1 },
    navLink:         { fontSize: 14, color: "#333", textDecoration: "none" },
    navRight:        { display: "flex", alignItems: "center", gap: 12 },
    languageBtn:     { background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#333" },
    joinBtn:         { padding: "8px 20px", borderRadius: 24, border: "2px solid #0a66c2", color: "#0a66c2", fontWeight: 600, textDecoration: "none", fontSize: 14 },
    main:            { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 16px" },
    card:            { backgroundColor: "#fff", borderRadius: 12, padding: "40px 48px", width: "100%", maxWidth: 420, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", alignItems: "center" },
    logoBox:         { width: 48, height: 48, borderRadius: 10, backgroundColor: "#0a2540", color: "#fff", fontSize: 24, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 },
    title:           { fontSize: 26, fontWeight: 700, color: "#0a2540", margin: "0 0 6px" },
    subtitle:        { fontSize: 14, color: "#666", marginBottom: 24 },
    form:            { width: "100%", display: "flex", flexDirection: "column", gap: 16 },
    field:           { display: "flex", flexDirection: "column", gap: 6 },
    label:           { fontSize: 11, fontWeight: 600, color: "#555", letterSpacing: 1 },
    input:           { padding: "12px 14px", borderRadius: 6, border: "1px solid #ccc", fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box" },
    passwordHeader:  { display: "flex", justifyContent: "space-between", alignItems: "center" },
    passwordWrapper: { position: "relative" },
    eyeBtn:          { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16 },
    forgotLink:      { fontSize: 13, color: "#0a66c2", textDecoration: "none" },
    checkboxLabel:   { display: "flex", alignItems: "center", fontSize: 14, color: "#333", cursor: "pointer" },
    errorMsg:        { color: "#cc0000", fontSize: 13, textAlign: "center", padding: "8px", backgroundColor: "#fff0f0", borderRadius: 6 },
    submitBtn:       { padding: "14px", borderRadius: 24, backgroundColor: "#0a66c2", color: "#fff", fontWeight: 600, fontSize: 16, border: "none", cursor: "pointer", width: "100%", marginTop: 4 },
    divider:         { display: "flex", alignItems: "center", gap: 12, width: "100%", margin: "20px 0" },
    hr:              { flex: 1, border: "none", borderTop: "1px solid #ddd" },
    dividerText:     { fontSize: 11, color: "#999", whiteSpace: "nowrap", letterSpacing: 1 },
    socialRow:       { display: "flex", gap: 12, width: "100%" },
    socialBtn:       { flex: 1, padding: "12px", borderRadius: 6, border: "1px solid #ccc", background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 500 },
    footerLink:      { fontSize: 14, color: "#555", marginTop: 20 },
    linkBlue:        { color: "#0a66c2", fontWeight: 600, textDecoration: "none" },
    footer:          { backgroundColor: "#f3f2ee", padding: "24px", textAlign: "center" },
    footerLinks:     { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 20px", fontSize: 13, color: "#555", marginBottom: 12 },
    footerLink2:     { color: "#555", textDecoration: "none", fontSize: 13 },
    copyright:       { fontSize: 12, color: "#888", margin: 0 },
    };