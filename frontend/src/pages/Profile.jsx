import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API, { errorMessage } from "../services/api";
import { getUser } from "../services/auth";

function Profile() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });

  useEffect(() => {
    let cancelled = false;
    API.get("/users/profile")
      .then((res) => {
        if (!cancelled) {
          setForm({ name: res.data.user.name, email: res.data.user.email, password: "" });
        }
      })
      .catch((err) => {
        if (!cancelled) setStatus({ type: "error", text: errorMessage(err) });
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: "", text: "" });
    try {
      const body = { name: form.name, email: form.email };
      if (form.password) body.password = form.password;
      const res = await API.put("/users/profile", body);
      localStorage.setItem("user", JSON.stringify({ ...getUser(), ...res.data.user }));
      setForm((f) => ({ ...f, password: "" }));
      setStatus({ type: "success", text: "Profile updated." });
    } catch (err) {
      setStatus({ type: "error", text: errorMessage(err, "Update failed.") });
    } finally {
      setSaving(false);
    }
  };

  const input = "w-full border rounded-lg px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-[#dc6b43]/40";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#fdf6ed] px-6 py-10">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-8">
          <h1 className="text-2xl font-bold mb-6">Profile</h1>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label className="text-sm text-gray-600">Name</label>
              <input name="name" value={form.name} onChange={handleChange} className={input} required />

              <label className="text-sm text-gray-600">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} className={input} required />

              <label className="text-sm text-gray-600">New password (optional)</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                minLength={6}
                placeholder="Leave blank to keep current"
                className={input}
              />

              {status.text && (
                <p className={`text-sm mb-3 ${status.type === "error" ? "text-red-600" : "text-green-600"}`}>
                  {status.text}
                </p>
              )}

              <button
                disabled={saving}
                className="bg-[#dc6b43] hover:bg-[#c45a35] text-white px-6 py-2 rounded-full disabled:opacity-50 cursor-pointer"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
