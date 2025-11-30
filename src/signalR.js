import * as signalR from "@microsoft/signalr";

let connection = null;

export async function connectToHub(userId, onNotification)
{
    connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7228/notifications")
        .withAutomaticReconnect()
        .build();

    // When backend sends notification
    connection.on("ReceiveNotification", (message) =>
    {
        console.log("Notification received:", message);
        onNotification(message);
    });

    // Start connection
    await connection.start();
    console.log("Connected:", connection.connectionId);

    // Register user with hub method
    await connection.invoke("RegisterUser", userId);
    console.log("User registered to group:", userId);
}

export function disconnectFromHub(userId)
{
    if (!connection) return;

    // Optional
    connection.invoke("UnregisterUser", userId);

    connection.stop();
}
