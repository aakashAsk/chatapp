
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react'

interface desktopItemProps {
    label: string;
    href: string;
    icon: any;
    active: boolean;
    onClick?: () => void;
}
const DesktopItem : React.FC<desktopItemProps> = ({
    label,
    href,
    icon: Icon,
    active,
    onClick
}: desktopItemProps) => {

    const handleClick = () => {
        console.log('handleClick');
        if(onClick) {
            onClick();
        }
    }

    return (
        <li onClick={handleClick}>
            <Link href={href}
                className={clsx(`group flex gap-x-3 rounded-md p-3 
                    text-sm leading-6 font-semibold text-gray-500 hover:text-black
                    hover:bg-grey-100`, active && 'bg-gray-100 text-black') }
            >
                <Icon className="h-6 w-6 shrink-0" />
                <span className='sr-only'>{label}</span>
            </Link>
        </li>
    )
}

export default DesktopItem;