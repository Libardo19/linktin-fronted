import api from "../lib/axios";

export const storageService = {
  uploadFile: async (tipo, archivo) => {
    if (!archivo) throw new Error("No se seleccionó ningún archivo");

    const formData = new FormData();
    formData.append("archivo", archivo);

    const { data } = await api.post(`/api/storage/${tipo}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data.data;
  },

  deleteFile: async (tipo) => {
    const { data } = await api.delete(`/api/storage/${tipo}`);
    return data;
  },

  getCvUrl: async (userId) => {
    const { data } = await api.get(`/api/storage/cv/${userId}`);
    return data.data.url;
  },
};
