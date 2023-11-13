import { IconType } from "react-icons";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  Icon: IconType;
  classes?: string;
  size?: number;
};

export default function IconButton({
  Icon,
  onClick,
  classes = "",
  size = 24,
  ...otherProps
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      {...otherProps}
      className={`${classes} border-main-300 bg-main-100 hover:bg-main-300 hover:border-main-500 active:bg-main-200 active:border-main-400 rounded-lg border`}
    >
      <Icon
        data-testid="icon-button-icon"
        className="text-main-600 m-1.5"
        size={size}
      />
    </button>
  );
}
