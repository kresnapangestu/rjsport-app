import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHelper } from "../services/FetchHelper";
// import { useAuth } from "../auth/AuthContext";
import { useAuth } from "../contexts/AuthContexts";

function LoginPage() {
  const [satker, setSatker] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userData = await fetchHelper(
        "https://api.rokeubmn-pa.id/auth/login",
        "POST",
        { "biro_code" : satker, password }
      );
      //   const userData = await fakeLogin(email, password);
      login(userData);
      navigate("/dashboard");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="No Satker"
          value={satker}
          onChange={(e) => setSatker(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
