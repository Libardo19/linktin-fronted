import api from "../lib/axios";

export const matchService = {
    // Para candidato
    darLike: async (ofertaId, scoreMatch) => {
        const { data } = await api.post(`/api/matches/like/${ofertaId}`, { score_match: scoreMatch ?? null });
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
    getCandidatosEmpresa: async () => {
        const { data } = await api.get("/api/matches/empresa/candidatos");
        return data.data;
    },

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