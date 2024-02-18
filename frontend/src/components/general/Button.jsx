export const Button = ({ texto, onClick, className }) => {
  return (
    <button className={`${className}`} onClick={onClick} type="submit">
      <span className="button-text">{texto}</span>
    </button>
  );
};
