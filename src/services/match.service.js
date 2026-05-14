import api from "../lib/axios";

export const matchService = {
    // Para candidato
    darLike: async (ofertaId) => {
        const { data } = await api.post(`/api/matches/like/${ofertaId}`);
        return data.data;
    },

    retirarLike: async (matchId) => {
        const { data } = await api.patch(`/api/matches/${matchId}/retirar`);
        return data.data;
    },

    feedCandidato: async () => {
        const { data } = await api.get("/api/matches/mis-postulaciones");
        return data.data;
    },

    misMatches: async () => {
        const { data } = await api.get("/api/matches/mis_matches");
        return data.data;
    },

    // Para empresa
    feedEmpresa: async (ofertaId) => {
        const { data } = await api.get(`/api/matches/oferta/${ofertaId}/candidatos`);
        return data.data;
    },

    aceptar: async (matchId) => {
        const { data } = await api.patch(`/api/matches/${matchId}/aceptar`);
        return data.data;
    },

    rechazar: async (matchId) => {
        const { data } = await api.patch(`/api/matches/${matchId}/rechazar`);
        return data.data;
    },
};