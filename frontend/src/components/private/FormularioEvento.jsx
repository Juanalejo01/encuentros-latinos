import { useRef } from "react";
import { FaCameraRetro } from "react-icons/fa";
import { Button } from "../general/Button";

export const FormularioEvento = ({ handleForm, accion }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    // Aquí puedes manejar el cambio de la imagen
    // Por ejemplo, puedes mostrar la imagen seleccionada o procesarla de alguna manera
    console.log("Archivo seleccionado:", e.target.files[0]);
  };

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
            ref={fileInputRef} // Asocia la referencia al input
            style={{ display: "none" }}
            onChange={handleFileChange} // Maneja el cambio de archivo
          />
        </div>
        <div className="formulario__otros-datos">
          <ul className="otros-datos__content">
            <li className="otros-datos__item">
              <input
                className="otros-datos__input"
                type="text"
                name="titulo"
                placeholder="Título del evento"
                required
              />
            </li>
            <li className="otros-datos__item">
              <input
                className="otros-datos__input"
                type="text"
                name="tematica"
                placeholder="Temática"
                required
              />
            </li>
            <li className="otros-datos__item">
              <input
                className="otros-datos__input"
                type="text"
                name="pais"
                placeholder="País"
                required
              />
            </li>
            <li className="otros-datos__item">
              <input
                className="otros-datos__input"
                type="text"
                name="ciudad"
                placeholder="Ciudad"
                required
              />
            </li>
            <li className="otros-datos__item">
              <input
                className="otros-datos__input"
                type="text"
                name="localizacion"
                placeholder="Localización"
                required
              />
            </li>
            <li className="otros-datos__item">
              <input
                className="otros-datos__input"
                type="datetime-local"
                name="fechaHora"
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
          required
        />
        <div className="formulario__boton">
          <Button texto={accion} className={"formulario__btn"} />
        </div>
      </div>
    </form>
  );
};
