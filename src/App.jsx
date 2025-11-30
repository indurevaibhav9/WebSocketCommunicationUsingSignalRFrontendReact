import { useState } from "react";
import { connectToHub, disconnectFromHub } from "./signalR";

function App()
{
  const [userId, setUserId] = useState("");
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const start = async () =>
  {
    if (!userId) return alert("Please enter userId");

    await connectToHub(userId, (msg) =>
    {
      setNotifications((prev) => [msg, ...prev]);
    });

    setConnected(true);
  };

  const stop = () =>
  {
    disconnectFromHub(userId);
    setConnected(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>🔔 Notification Client (User-Specific)</h2>

      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ padding: 10, marginRight: 10 }}
      />

      {!connected ? (
        <button onClick={start}>Connect</button>
      ) : (
        <button onClick={stop}>Disconnect</button>
      )}

      <h3>Notifications:</h3>

      {notifications.map((n, i) => (
        <div key={i} style={{ padding: 15, border: "1px solid #ccc", marginBottom: 10 }}>
          <strong>{n.title}</strong>
          <p>{n.message}</p>
          <small>{n.type}</small>
        </div>
      ))}
    </div>
  );
}

export default App;
