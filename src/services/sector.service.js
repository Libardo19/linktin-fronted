import api from "../lib/axios";

export const sectorService = {
  getAll: async () => {
    const { data } = await api.get("/api/sectores");
    return data.data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/api/sectores/${id}`);
    return data.data;
  },
};