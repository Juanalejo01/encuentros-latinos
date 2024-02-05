import { FaArrowRight } from "react-icons/fa";

export const Button = ({ texto, onClick, className }) => {
  return (
    <button className={`${className}`} onClick={onClick} type="submit">
      <span className="button-text">{texto}</span>
      <span className="button-icon">
        <FaArrowRight size={14} />
      </span>
    </button>
  );
};
