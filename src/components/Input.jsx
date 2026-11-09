import "./Input.css"

export function Input({
  type = "text",
  className = '',
  placeholder = '',
  value = '',
  ...props
}) {

  return (
    <input
     {...props}
      type = {type}
      className = {`app_input ${className}`.trim()}
      placeholder={placeholder}
      value = {value}
    />
  );
}
