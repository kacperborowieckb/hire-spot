const variants = {
  default:
    "text-main-50 bg-main-500 hover:bg-main-600 active:bg-main-700 disabled:bg-main-200 disabled:text-main-300",
  outline:
    "border bg-main-50 text-main-700 border-main-700 hover:bg-main-100 active:bg-main-200 disabled:bg-transparent disabled:border-main-300 disabled:text-main-300",
  error:
    "text-main-50 bg-red-500 hover:bg-red-600 active:bg-red-700 disabled:bg-red-300 disabled:text-main-50",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: keyof typeof variants;
};

export default function Button({
  variant,
  children,
  className,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      className={`${variants[variant]} ${className} cursor rounded-lg px-4 py-2 disabled:cursor-not-allowed`}
      {...otherProps}
    >
      {children}
    </button>
  );
}
