import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth.service";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await loginUser({
        email: form.email,
        password: form.password,
      });
      console.log("user Login ", data);
      navigate("/dashboard");
    } catch (error) {
      // console.error("err", err.message);
      setError((error as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          name="email"
          id=""
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          id=""
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
