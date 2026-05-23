import api from "../lib/axios";

export const adminService = {
  getStats: async () => {
    const { data } = await api.get("/api/admin/stats");
    return data.data;
  },

  getMetricas: async () => {
    const { data } = await api.get("/api/admin/metricas");
    return data.data;
  },

  getUsuarios: async () => {
    const { data } = await api.get("/api/admin/usuarios");
    return data.data;
  },

  getCandidatos: async () => {
    const { data } = await api.get("/api/admin/candidatos");
    return data.data;
  },

  getEmpresas: async () => {
    const { data } = await api.get("/api/admin/empresas");
    return data.data;
  },

  getOfertas: async () => {
    const { data } = await api.get("/api/admin/ofertas");
    return data.data;
  },

  getMatches: async () => {
    const { data } = await api.get("/api/admin/matches");
    return data.data;
  },

  suspenderUsuario: async (id) => {
    const { data } = await api.patch(`/api/admin/usuarios/${id}/suspender`);
    return data.data;
  },

  activarUsuario: async (id) => {
    const { data } = await api.patch(`/api/admin/usuarios/${id}/activar`);
    return data.data;
  },

  cambiarEstadoOferta: async (id, estado) => {
    const { data } = await api.patch(`/api/admin/ofertas/${id}/estado`, { estado });
    return data.data;
  },
};