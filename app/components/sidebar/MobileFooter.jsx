'use client';
import React, { useEffect } from 'react';
import useRoutes from '../../hooks/useRoutes';
import MobileFooterItem from './MobileFooterItem';

export default function MobileFooter() {
    let routes = useRoutes();
  return (
    <div 
        className='fixed justify-center w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden'
    >
        {
            routes.map((item, index) => {
                return <MobileFooterItem label={item.label} icon={item.icon} href={item.href} active={item.active || false} onClick={() => item.onClick}  key={index}/>
            })
        }
    </div>
  )
}
