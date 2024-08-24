import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface MobileFooterItem {
    label: string;
    href: string;
    icon: any;
    active: boolean;
    onClick: () => void;
}

const MobileFooterItem: React.FC<MobileFooterItem> = ({
    label,
    href,
    icon: Icon,
    active,
    onClick
}: MobileFooterItem) => {
    const handleClick = () => {
        if(onClick) {
            return onClick();
        }
    }

  return (
    <Link href={href} onClick={handleClick}
        className={clsx(`group flex gap-x-3 text-sm p-4
            leading-6 w-full font-semibold justify-center text-gray-500 hover:text-black
            hover:bg-grey-100`, active && 'bg-gray-100 text-black') }
    >
        <Icon className="h-6 w-6" />
        <span className='sr-only'>{label}</span>
    </Link>
  )
}

export default MobileFooterItem;
