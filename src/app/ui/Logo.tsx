import Image from "next/image";

export default function Logo({ classes }: { classes?: string }) {
  return (
    <Image
      src={"/logo.svg"}
      priority={true}
      alt="HireSpot logo"
      width="164"
      height="52"
      className={classes}
    />
  );
}
