import api from "../lib/axios";

export const habilidadService = {
  getAll: async (categoria) => {
    const params = categoria ? { categoria } : {};
    const { data } = await api.get("/api/habilidades", { params });
    return data.data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/api/habilidades/${id}`);
    return data.data;
  },
};