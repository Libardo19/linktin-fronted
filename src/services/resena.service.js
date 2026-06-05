'use client'

import api from '@/lib/axios'

const create = async (id_match, raiting, comentario = '') => {
  const { data } = await api.post('/api/resenas', { id_match, raiting, comentario })
  return data.data
}

const getMisResenas = async () => {
  const { data } = await api.get('/api/resenas/mis-resenas')
  return data.data
}

const getRecibidas = async (id_usuario) => {
  const { data } = await api.get(`/api/resenas/usuario/${id_usuario}`)
  return data.data
}

export const resenaService = { create, getMisResenas, getRecibidas }
