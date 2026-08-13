import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput, Alert } from "flowbite-react";
import { useApi } from "../api";
import { ROUTES } from "../routes";

export default function LoginPage() {
  const nav = useNavigate();
  const { login } = useApi();
  const [f, setF] = useState({ u: "", p: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setErr("");
    try {
      await login(f.u, f.p);
      nav(ROUTES.ADMIN_DASHBOARD);
    } catch {
      setErr("Invalid credentials. Only staff and CEO accounts can log in here.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16">
      <div className="text-center mb-8">
        <div className="inline-flex h-16 w-16 rounded-full items-center justify-center text-3xl mb-3 shadow-lg"
             style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>🐾</div>
        <h1 className="text-3xl font-black text-gray-900">Staff Login</h1>
        <p className="text-gray-500 mt-1">Pawfect Companions — Admin Portal</p>
      </div>

      <form onSubmit={submit} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-5">
        {err && <Alert color="failure">{err}</Alert>}
        <div>
          <Label htmlFor="u" value="Username / Email" className="mb-1 block font-semibold" />
          <TextInput id="u" sizing="lg" required value={f.u} onChange={e => setF({ ...f, u: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="p" value="Password" className="mb-1 block font-semibold" />
          <TextInput id="p" type="password" sizing="lg" required value={f.p} onChange={e => setF({ ...f, p: e.target.value })} />
        </div>
        <Button type="submit" size="lg" disabled={loading} className="w-full font-black py-3 text-white"
                style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", border: "none" }}>
          {loading ? "Signing in..." : "🔐 Sign In to Portal"}
        </Button>
        <p className="text-xs text-center text-gray-500">
          🔒 This portal is for authorized Pawfect Companions staff only.
          <br/>All activity is logged and audited.
        </p>
      </form>
    </div>
  );
}