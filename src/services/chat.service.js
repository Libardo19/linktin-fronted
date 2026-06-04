import api from "../lib/axios";

export const chatService = {
  getConversaciones: async () => {
    const { data } = await api.get("/api/chat/conversaciones");
    return data.data;
  },

  crearObtenerConversacion: async (otroUsuarioId) => {
    const { data } = await api.post("/api/chat/conversacion", { otroUsuarioId });
    return data.data;
  },
};
