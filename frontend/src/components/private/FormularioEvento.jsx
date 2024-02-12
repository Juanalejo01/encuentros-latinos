import { useRef, useState } from "react";
import { Button } from "../general/Button";
import { formateaFecha } from "../../services/formateaFecha";
import { FaRegImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const FormularioEvento = ({ handleForm, accion, evento, loading }) => {
  const [imagen, setImagen] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const fechaHoraInicial = accion === "Editar" ? evento?.fecha_hora : "";
  const fechaHoraFormateada = fechaHoraInicial ? formateaFecha(fechaHoraInicial) : "";

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleClick = () => {
    navigate("/dashboard/eventos");
  };

  const imagenUrl = evento ? `${import.meta.env.VITE_APP_BACKEND}/${evento.foto}` : "";

  return (
    <form className="formulario__evento" onSubmit={handleForm}>
      <div className="formulario__top">
        <div className="formulario__foto">
          <label htmlFor="imagen">
            {imagen ? (
              <img
                className="foto__formulario"
                src={URL.createObjectURL(imagen)}
                alt="Preview"
                title="Modifica esta imagen"
              />
            ) : evento ? (
              loading ? (
                <div className="spinner__editar" role="status">
                  <span className="spinner"></span>
                </div>
              ) : (
                <img
                  className="foto__formulario"
                  src={imagenUrl}
                  alt="Descarga"
                  title="Modifica esta imagen"
                />
              )
            ) : (
              <FaRegImage className="foto__label" title="Descargar imagen" />
            )}
          </label>
          <input
            id="imagen"
            type="file"
            name="imagen"
            accept=".jpg, .png, .jpeg"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <ul className="otros-datos__content">
          <li className="otros-datos__item">
            <input
              className="otros-datos__input"
              type="text"
              name="titulo"
              defaultValue={accion === "Editar" ? evento?.titulo ?? "" : ""}
              required
            />
            <label htmlFor="titulo" className="form__label">
              Título
            </label>
          </li>
          <li className="otros-datos__item">
            <input
              className="otros-datos__input"
              type="text"
              name="tematica"
              defaultValue={accion === "Editar" ? evento?.tematica ?? "" : ""}
              required
            />
            <label htmlFor="tematica" className="form__label">
              Temática
            </label>
          </li>
          <li className="otros-datos__item">
            <input
              className="otros-datos__input"
              type="text"
              name="pais"
              defaultValue={accion === "Editar" ? evento?.pais ?? "" : ""}
              required
            />
            <label htmlFor="pais" className="form__label">
              País
            </label>
          </li>
          <li className="otros-datos__item">
            <input
              className="otros-datos__input"
              type="text"
              name="ciudad"
              defaultValue={accion === "Editar" ? evento?.ciudad ?? "" : ""}
              required
            />
            <label htmlFor="ciudad" className="form__label">
              Ciudad
            </label>
          </li>
          <li className="otros-datos__item">
            <input
              className="otros-datos__input"
              type="text"
              name="localizacion"
              defaultValue={accion === "Editar" ? evento?.localizacion ?? "" : ""}
              required
            />
            <label htmlFor="localizacion" className="form__label">
              Localización
            </label>
          </li>
          <li className="otros-datos__item">
            <label htmlFor="fechaHora" className="form__label-fecha-hora">
              Fecha y Hora del evento
            </label>
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
      <div className="formulario__detalles">
        <div className="detalles__textarea">
          <label htmlFor="descripcion" className="form__label-textarea">
            Detalles del evento
          </label>
          <textarea
            className="formulario__textarea"
            name="descripcion"
            defaultValue={accion === "Editar" ? evento?.descripcion ?? "" : ""}
            required
          />
        </div>
        <div className="formulario__botones">
          <Button texto={accion} className={"formulario__btn"} />
          <Button texto={"Cancelar"} onClick={handleClick} className={"formulario__btn-cancelar"} />
        </div>
      </div>
    </form>
  );
};
