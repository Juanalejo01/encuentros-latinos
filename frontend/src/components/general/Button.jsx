export const Button = ({ texto, onClick, className }) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      {texto}
    </button>
  );
};
