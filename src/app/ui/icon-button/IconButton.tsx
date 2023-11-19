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
      className={`${classes} rounded-lg border border-main-300 bg-main-100 hover:border-main-500 hover:bg-main-300 active:border-main-400 active:bg-main-200`}
    >
      <Icon
        data-testid="icon-button-icon"
        className="m-1.5 text-main-600"
        size={size}
      />
    </button>
  );
}
