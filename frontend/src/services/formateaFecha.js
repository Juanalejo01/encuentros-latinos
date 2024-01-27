export const formateaFecha = (date) => {
  const fechaHora = new Date(date);
  const year = fechaHora.getFullYear();
  const month = (fechaHora.getMonth() + 1).toString().padStart(2, "0");
  const day = fechaHora.getDate().toString().padStart(2, "0");
  const hours = fechaHora.getHours().toString().padStart(2, "0");
  const minutes = fechaHora.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
