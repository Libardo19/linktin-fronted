import api from "../lib/axios";

export const notificacionesService = {
    getMisNotificaciones: async () => {
        const { data } = await api.get("/api/notificaciones");
        return data.data;
    },

    marcarLeida: async (id) => {
        const { data } = await api.patch(`/api/notificaciones/${id}/leer`);
        return data.data;
    },

    marcarTodasLeidas: async () => {
        const { data } = await api.patch("/api/notificaciones/leer-todas");
        return data.data;
    },

    limpiarLeidas: async () => {
        const { data } = await api.delete("/api/notificaciones/limpiar");
        return data.data;
    },
};