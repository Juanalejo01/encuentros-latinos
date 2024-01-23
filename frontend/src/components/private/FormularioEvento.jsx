import { useRef } from "react";
import { FaCameraRetro } from "react-icons/fa";

export const FormularioEvento = () => {
  const fileInputRef = useRef(null);
  return (
    <form className="formulario__evento">
      <div className="formulario__top">
        <div className="formulario__foto">
          <label htmlFor="fileInput">
            <FaCameraRetro className="foto__icono" title="Descargar Foto" />
          </label>
          <input
            id="fileInput"
            type="file"
            name="foto"
            accept=".jpg, .png, .jpeg"
            ref={fileInputRef} // Asocia la referencia al input
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
                name="fecha_hora"
                required
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="formulario__detalles">
        <textarea
          className="otros-datos__textarea"
          name="detalles"
          placeholder="Escribe aquí los detalles de tu evento"
        />
      </div>
    </form>
  );
};
