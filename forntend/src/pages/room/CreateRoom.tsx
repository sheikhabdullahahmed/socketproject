import React, { useEffect } from "react";
import { useState } from "react";
import { Createroom } from "../../services/room.service";
import { useNavigate } from "react-router-dom";
import JoinRoom from "./JoinRoom";

type UserLocation = {
  lng: number | null;
  lat: number | null;
};

function CreateRoom() {
  const [roomId, setRoomId] = useState<string>("");
  const [location, setLocation] = useState<UserLocation>({
    lng: null,
    lat: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lng: pos.coords.longitude,
          lat: pos.coords.latitude,
        });
      },
      (err) => console.error(err)
    );
  }, []);

  const creatroom = async () => {
    setLoading(true);
    setError("");

    if (!location || location.lng === null || location.lat === null) {
      setError("location not aviable");
      return;
    }
    try {
      const { data } = await Createroom({
        location: {
          type: "Point",
          coordinates: [location.lng, location.lat], //  GeoJSON format
        },
      });
      console.log("Room created:", data);
    } catch (error) {
      setError((error as Error).message || "Something went wrong");
    }
  };
  // console.log("creatroom", creatroom)

  return (
    <div>
      <div>
        {/* <form action=""> */}
        <h2>Rooms</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="button" onClick={creatroom}>
          Create Room
        </button>
        <JoinRoom/>
        {/* </form> */}
      </div>
    </div>
  );
}

export default CreateRoom;
