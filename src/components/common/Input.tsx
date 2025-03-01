interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

const Input = ({ className = "", fullWidth = false, ...props }: InputProps) => {
  const baseStyle =
    "px-4 py-2 rounded-md border border-neutral-300 focus:outline-none focus:border-primary";

  return (
    <input
      className={`${baseStyle} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    />
  );
};

export default Input;
