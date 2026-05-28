import api from "../lib/axios";

export const recommendationService = {
  getRecomendaciones: async (idUsuario) => {
    const { data } = await api.get(`/api/recommendations/${idUsuario}`);
    return data.recomendaciones ?? [];
  },
};
