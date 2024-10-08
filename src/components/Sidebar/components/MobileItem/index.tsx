'use client';

import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

interface Props {
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

function MobileItem({
  href,
  icon: Icon,
  active,
  onClick,
}: Props) {
  return (
    <Link
      onClick={onClick}
      href={href}
      className={clsx(`group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100`, active && "bg-gray-100 text-black")}
    >
      <Icon className="w-6 h-6" />
    </Link>
  );
}

export default MobileItem;