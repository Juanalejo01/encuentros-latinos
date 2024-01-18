import { FaArrowRight } from "react-icons/fa";

export const Button = ({ texto, onClick, className }) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      <span className="button-text">{texto}</span>
      <span className="button-icon">
        <FaArrowRight size={14} /> {/* Ajusta el tamaño según tus preferencias */}
      </span>
    </button>
  );
};
