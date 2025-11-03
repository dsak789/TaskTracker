interface BtnProps {
  label: string;
  icon?: JSX.Element;
  onClick?: (e: any) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant: "primary" | "secondary" | "error" | "warning";
}

const Button = (ops: BtnProps): JSX.Element => {
  return (
    <button
      disabled={ops.disabled}
      className={`btn btn-` + ops.variant}
      onClick={ops.onClick}
      type={ops.type}
    >
      {ops.icon}
      {ops.label}
    </button>
  );
};

export default Button;
