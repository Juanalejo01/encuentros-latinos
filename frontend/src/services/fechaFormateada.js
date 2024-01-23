export const fechaFormateada = (date) => {
  const fecha = new Date(date);

  const opcionesFecha = {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: false, // Usar formato de 12 horas (true) o 24 horas (false)
  };

  const formatoFecha = new Intl.DateTimeFormat("es-ES", opcionesFecha);

  return formatoFecha.format(fecha);
};
