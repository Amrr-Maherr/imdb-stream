import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function Logo() {
  return (
    <Link href="/" className="shrink-0">
      <Image
        src="/logo.svg"
        alt="IMDb"
        width={96}
        height={32}
        className="h-8 w-auto"
        priority
      />
    </Link>
  );
}
