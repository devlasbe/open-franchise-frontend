import Image from "next/image";
import Menu from "./menu/Menu";
import Link from "next/link";

export default async function Header() {
  return (
    <header className="z-10 fixed top-0 left-0 flex items-center gap-8 w-full h-16 px-4 sm:px-16 bg-white bg-opacity-50 backdrop-blur-sm shadow-md">
      <Link href={"/"} className="relative">
        <Image className="object-cover" width={144} height={36} src={"/open-franchise-logo-v.png"} alt="logo" />
      </Link>
      <Menu />
    </header>
  );
}
