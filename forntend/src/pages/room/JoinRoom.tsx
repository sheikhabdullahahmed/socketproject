import React, { useEffect, useState } from "react";
import { Joinroom } from "../../services/room.service";
import { data, useFetcher, useNavigate } from "react-router-dom";
import { socket } from "../socket/socket";

function JoinRoom() {
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);
    const [joinedRoomId, setJoinedRoomId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    if (!joinedRoomId) return;

    socket.emit("join-room", {
      roomId: joinedRoomId,
    });

    return () => {
      socket.emit("leave-room", joinedRoomId);
    };
  }, [joinedRoomId]);

  const joinRoomHandler = async () => {
    if (!roomId) {
      setError("Room ID required");
      return;
    }
    try {
      const { data } = await Joinroom( roomId );
      // console.log("Joined Room", data);
    //   masla kiaho raha ha ta may routes sahi defien kar raha ha ta is lia room id wagarakay error arhay tay 

      navigate(`/room/${data.room.roomId}`);
    } catch (error) {
      setError((error as Error).message || "masla ha kuch");
    }

  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={roomId}
          placeholder="Enter Room ID"
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button type="button" onClick={joinRoomHandler}>
          JoinRoom
        </button>
        <p>{error}</p>
      </div>
    </div>
  );
}

export default JoinRoom;
