'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { IconType } from 'react-icons';

interface Props {
  label: string;
  icon: IconType;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

function DesktopItem({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}: Props) {
  return (
    <li onClick={onClick}>
      <Link href={href} className={clsx(`group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100`, active && 'bg-gray-100 text-black')}>
        <Icon className="w-6 h-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}

export default DesktopItem;