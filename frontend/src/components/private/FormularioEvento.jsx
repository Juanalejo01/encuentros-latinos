import { useRef, useState } from "react";
import { FaCameraRetro } from "react-icons/fa";
import { Button } from "../general/Button";
import { formateaFecha } from "../../services/formateaFecha";
import { Imagenes } from "../general/Imagenes";

export const FormularioEvento = ({ handleForm, accion, evento }) => {
  const [imagen, setImagen] = useState("");
  const fileInputRef = useRef(null);
  const fechaHoraInicial = accion === "Editar" ? evento?.fecha_hora : "";
  const fechaHoraFormateada = fechaHoraInicial ? formateaFecha(fechaHoraInicial) : "";

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const imagenUrl = evento ? `${import.meta.env.VITE_APP_BACKEND}/${evento.foto}` : "";

  return (
    <form className="formulario__evento" onSubmit={handleForm}>
      <div className="formulario__top">
        <div className="formulario__foto">
          <label htmlFor="imagen">
            <FaCameraRetro className="foto__icono" title="Descargar Foto" />
          </label>
          <input
            id="imagen"
            type="file"
            name="imagen"
            accept=".jpg, .png, .jpeg"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange} // Maneja el cambio de archivo
          />
          {imagen ? (
            <img src={URL.createObjectURL(imagen)} alt="Preview" />
          ) : evento ? (
            <img src={imagenUrl} alt="Descarga" />
          ) : (
            <img src={Imagenes().descarga} alt="Descarga" />
          )}
        </div>
        <div className="formulario__otros-datos">
          <ul className="otros-datos__content">
            <li className="otros-datos__item">
              <input
                className="otros-datos__input"
                type="text"
                name="titulo"
                placeholder="Título del evento"
                defaultValue={accion === "Editar" ? evento?.titulo ?? "" : ""}
                required
              />
            </li>
            <li className="otros-datos__item">
              <input
                className="otros-datos__input"
                type="text"
                name="tematica"
                placeholder="Temática"
                defaultValue={accion === "Editar" ? evento?.tematica ?? "" : ""}
                required
              />
            </li>
            <li className="otros-datos__item">
              <input
                className="otros-datos__input"
                type="text"
                name="pais"
                placeholder="País"
                defaultValue={accion === "Editar" ? evento?.pais ?? "" : ""}
                required
              />
            </li>
            <li className="otros-datos__item">
              <input
                className="otros-datos__input"
                type="text"
                name="ciudad"
                placeholder="Ciudad"
                defaultValue={accion === "Editar" ? evento?.ciudad ?? "" : ""}
                required
              />
            </li>
            <li className="otros-datos__item">
              <input
                className="otros-datos__input"
                type="text"
                name="localizacion"
                placeholder="Localización"
                defaultValue={accion === "Editar" ? evento?.localizacion ?? "" : ""}
                required
              />
            </li>
            <li className="otros-datos__item">
              <input
                className="otros-datos__input"
                type="datetime-local"
                name="fechaHora"
                defaultValue={accion === "Editar" ? fechaHoraFormateada : ""}
                required
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="formulario__detalles">
        <textarea
          className="formulario__textarea"
          name="descripcion"
          placeholder="Escribe aquí los detalles de tu evento"
          defaultValue={accion === "Editar" ? evento?.descripcion ?? "" : ""}
          required
        />
        <div className="formulario__boton">
          <Button texto={accion} className={"formulario__btn"} />
        </div>
      </div>
    </form>
  );
};
