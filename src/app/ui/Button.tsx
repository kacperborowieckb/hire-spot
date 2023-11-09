const variants = {
  default:
    "text-main-50 bg-main-500 hover:bg-main-600 active:bg-main-700 disabled:bg-main-200 disabled:text-main-300",
  outline:
    "border bg-transparent text-main-700 border-main-700 hover:bg-main-100 active:bg-main-200 disabled:bg-transparent disabled:border-main-300 disabled:text-main-300",
  gradient: "",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: keyof typeof variants;
};

export default function Button({
  variant,
  children,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      className={`${variants[variant]} cursor rounded-lg px-4 py-2 disabled:cursor-not-allowed`}
      {...otherProps}
    >
      {children}
    </button>
  );
}
