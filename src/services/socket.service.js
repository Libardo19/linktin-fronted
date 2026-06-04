import { io } from "socket.io-client";
import Cookies from "js-cookie";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

let socket = null;

export const getSocket = () => socket;

export const connectSocket = () => {
  if (socket?.connected) return socket;

  const token = Cookies.get("linktin_token");
  if (!token) return null;

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ["websocket", "polling"],
  });

  socket.on("connect", () => {});

  socket.on("connect_error", (err) => {
    console.error("Socket error:", err.message);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const joinConversacion = (conversacionId) => {
  if (socket?.connected) {
    socket.emit("unirse_conversacion", conversacionId);
  }
};

export const sendMessage = (conversacionId, contenido) => {
  if (socket?.connected) {
    socket.emit("enviar_mensaje", { conversacionId, contenido });
  }
};

export const emitTyping = (conversacionId) => {
  if (socket?.connected) {
    socket.emit("escribiendo", { conversacionId });
  }
};

export const emitStopTyping = (conversacionId) => {
  if (socket?.connected) {
    socket.emit("dejo_de_escribir", { conversacionId });
  }
};
