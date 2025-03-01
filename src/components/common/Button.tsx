interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const baseStyle = "rounded transition-colors text-white";

  const variants = {
    primary: "bg-primary hover:bg-accent",
    secondary: "bg-secondary hover:bg-accent",
    danger: "bg-red-500 hover:bg-red-600",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-6 py-2",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
