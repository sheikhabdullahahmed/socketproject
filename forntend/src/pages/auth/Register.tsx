import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../services/auth.service";
import { socket } from "../socket/socket";

// formate sahi ho phalay longitude pher latitude asa ho ga
// waran error i ga

interface FormState {
  name: string;
  email: string;
  password: string;
  lng: number | null;
  lat: number | null;
}

interface Id {
  _id: string;
}

export const Register = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    lng: null,
    lat: null,
  });
  const [user, setUser] = useState<Id>({
    _id: "",
  });

  const [loading, setLoading] = useState(false);
  // const [location, setLocation] = useState<{ lng: number; lat: number } | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Auto get location on load
  // ya hamari browser say direct location get kar lay ga
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({
          ...prev,
          lng: pos.coords.longitude,
          lat: pos.coords.latitude,
        }));
      },
      (err) => {
        console.error("Location error", err);
      }
    );
  }, []);

  useEffect(() => {
    if (user) {
      socket.emit("register-user", user._id);
    }
  }, [user]);

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // band araha ha ta coordinate : {form.lat!, form.lng!} asa mana kar raha ha ta
    if (form.lng === null || form.lat === null) {
      return setError("location are required");
    }

    try {
      const { data } = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        location: {
          type: "Point",
          coordinates: [Number(form.lng), Number(form.lat)], // 🔑 lng first, lat second
        },
      });

      // console.log("user register ", data);
      navigate("/login");
    } catch (error) {
      // console.error(error as Error);
      setError((error as Error).message || "Something weng worong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          name="name"
          id=""
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">refister</button>
      </form>
    </div>
  );
};

export default Register;
