export const horaFormateada = (date) => {
  const fecha = new Date(date);

  // Formato de fecha
  const opcionesFecha = {
    day: "2-digit", // Día del mes con dos dígitos
    month: "2-digit", // Mes con dos dígitos
    year: "numeric", // Año con cuatro dígitos
  };

  const formatoFecha = new Intl.DateTimeFormat("es-ES", opcionesFecha);
  const fechaFormateada = formatoFecha.format(fecha);

  // Formato de hora
  const opcionesHora = {
    hour: "2-digit", // Hora con dos dígitos
    minute: "2-digit", // Minutos con dos dígitos
    hour12: false, // Usar formato de 24 horas
  };

  const formatoHora = new Intl.DateTimeFormat("es-ES", opcionesHora);
  const horaFormateada = formatoHora.format(fecha);

  // Mostrar la fecha y la hora formateadas
  return `${fechaFormateada}, ${horaFormateada}`;
};
