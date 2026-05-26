import api from "../lib/axios";

export const empresaService = {
    getMiPerfil: async () => {
        const { data } = await api.get("/api/empresas/me");
        return data.data;
    },

    getById: async (id) => {
        const { data } = await api.get(`/api/empresas/${id}`);
        return data.data;
    },

    getAll: async () => {
        const { data } = await api.get("/api/empresas");
        return data.data;
    },

    create: async (empresaData) => {
        const { data } = await api.post("/api/empresas", empresaData);
        return data.data;
    },

    update: async (id, empresaData) => {
        const { data } = await api.put(`/api/empresas/${id}`, empresaData);
        return data.data;
    },

    remove: async (id) => {
        const { data } = await api.delete(`/api/empresas/${id}`);
        return data.data;
    },
};