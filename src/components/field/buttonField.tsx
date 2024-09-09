interface ButtonFieldProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const ButtonField: React.FC<ButtonFieldProps> = ({
  type,
  className,
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default ButtonField;