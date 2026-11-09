import "./Button.css";

export function Button({
  type = "button",
  children,
  label,
  onClick,
  disabled = false,
  className = "app_button",
  ...props
}) {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children ?? label}
    </button>
  );
}
