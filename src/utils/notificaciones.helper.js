export function formatearNotificacion(notif) {
  const payload = notif.payload || {}

  switch (notif.tipo) {
    case 'nuevo_match':
      return {
        title: 'Nueva postulación',
        description: `${payload.candidato || 'Un candidato'} aplicó a tu oferta "${payload.oferta || ''}"`,
      }

    case 'match_aceptado':
      return {
        title: 'Match aceptado',
        description: `${payload.empresa || 'La empresa'} aceptó tu postulación en "${payload.oferta || ''}"`,
      }

    case 'match_rechazado':
      return {
        title: 'Match rechazado',
        description: `${payload.empresa || 'La empresa'} rechazó tu postulación en "${payload.oferta || ''}"`,
      }

    case 'mensaje_recibido':
      return {
        title: 'Nuevo mensaje',
        description: `Tienes un mensaje de ${payload.nombre || 'un usuario'}`,
      }

    case 'nueva_oferta':
      return {
        title: 'Nueva oferta',
        description: `${payload.empresa || 'Una empresa'} publicó "${payload.oferta || 'nueva oferta'}"`,
      }

    case 'oferta_cerrada':
      return {
        title: 'Oferta cerrada',
        description: `La oferta "${payload.oferta || ''}" de ${payload.empresa || 'la empresa'} ha sido cerrada`,
      }

    case 'resena_recibida':
      return {
        title: 'Reseña recibida',
        description: `Recibiste una reseña de ${payload.de || 'un usuario'} (${payload.raiting || '?'} estrellas)`,
      }

    default:
      return {
        title: notif.mensaje || 'Notificación',
        description: notif.descripcion || '',
      }
  }
}
