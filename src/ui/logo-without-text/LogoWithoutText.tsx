import Image from "next/image";
import Link from "next/link";
// TODO

export default function LogoWithoutText({ classes }: { classes?: string }) {
  return (
    <Link href={"/"}>
      <Image
        src={"/logo-without-name.svg"}
        priority={true}
        alt="HireSpot logo"
        width="42"
        height="42"
        className={classes}
      />
    </Link>
  );
}
