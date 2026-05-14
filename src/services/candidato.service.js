import api from "../lib/axios";

export const candidatoService = {
    getMiPerfil: async () => {
        const { data } = await api.get("/api/candidatos/me");
        return data.data;
    },

    getById: async (id) => {
        const { data } = await api.get(`/api/candidatos/${id}`);
        return data.data;
    },

    createPerfil: async (perfilData) => {
        const { data } = await api.post("/api/candidatos", perfilData);
        return data.data;
    },

    updatePerfil: async (id, perfilData) => {
        const { data } = await api.put(`/api/candidatos/${id}`, perfilData);
        return data.data;
    },

    deletePerfil: async (id) => {
        const { data } = await api.delete(`/api/candidatos/${id}`);
        return data.data;
    },

    addExperiencia: async (id, experiencia) => {
        const { data } = await api.post(`/api/candidatos/${id}/experiencia`, experiencia);
        return data.data;
    },

    updateExperiencia: async (id, expId, experiencia) => {
        const { data } = await api.put(`/api/candidatos/${id}/experiencia/${expId}`, experiencia);
        return data.data;
    },

    deleteExperiencia: async (id, expId) => {
        const { data } = await api.delete(`/api/candidatos/${id}/experiencia/${expId}`);
        return data.data;
    },

    addEducacion: async (id, educacion) => {
        const { data } = await api.post(`/api/candidatos/${id}/educacion`, educacion);
        return data.data;
    },

    updateEducacion: async (id, eduId, educacion) => {
        const { data } = await api.put(`/api/candidatos/${id}/educacion/${eduId}`, educacion);
        return data.data;
    },

    deleteEducacion: async (id, eduId) => {
        const { data } = await api.delete(`/api/candidatos/${id}/educacion/${eduId}`);
        return data.data;
    },

    addHabilidad: async (id, habilidad) => {
        const { data } = await api.post(`/api/candidatos/${id}/habilidades`, habilidad);
        return data.data;
    },

    updateHabilidad: async (id, habId, nivel) => {
        const { data } = await api.put(`/api/candidatos/${id}/habilidades/${habId}`, nivel);
        return data.data;
    },

    deleteHabilidad: async (id, habId) => {
        const { data } = await api.delete(`/api/candidatos/${id}/habilidades/${habId}`);
        return data.data;
    },
};