import { FaArrowRight } from "react-icons/fa";

export const Button = ({ texto, onClick, className }) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      {texto} <FaArrowRight />
    </button>
  );
};
