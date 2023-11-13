import Image from "next/image";
import Link from "next/link";

export default function Logo({ classes }: { classes?: string }) {
  return (
    <Link href={"/"}>
      <Image
        src={"/logo.svg"}
        priority={true}
        alt="HireSpot logo"
        width="164"
        height="52"
        className={classes}
      />
    </Link>
  );
}
