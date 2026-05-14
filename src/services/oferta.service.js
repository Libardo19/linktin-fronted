import api from "../lib/axios";

export const ofertaService = {
    getAll: async (params = {}) => {
        const { data } = await api.get("/api/ofertas", { params });
        return data.data;
    },

    getById: async (id) => {
        const { data } = await api.get(`/api/ofertas/${id}`);
        return data.data;
    },

    getMisOfertas: async () => {
        const { data } = await api.get("/api/ofertas/mis-ofertas");
        return data.data;
    },

    create: async (ofertaData) => {
        const { data } = await api.post("/api/ofertas", ofertaData);
        return data.data;
    },

    update: async (id, ofertaData) => {
        const { data } = await api.put(`/api/ofertas/${id}`, ofertaData);
        return data.data;
    },

    remove: async (id) => {
        const { data } = await api.delete(`/api/ofertas/${id}`);
        return data.data;
    },

    cambiarEstado: async (id, estado) => {
        const { data } = await api.patch(`/api/ofertas/${id}/estado`, { estado });
        return data.data;
    },
};