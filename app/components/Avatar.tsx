import { User } from '@prisma/client'
import React from 'react';
import Image from 'next/image';

interface avatarProps {
    user?: User
}
const Avatar: React.FC<avatarProps> = ({ user }) => {
  return (
    <div className='relative flex'>
        <div className='relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11'>
            <Image alt="Avatar" src={user?.image || "/images/user.png"} fill />
        </div>
        <span className='absolute block rounded-full bg-green-500 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3'></span>
    </div>
  )
}

export default Avatar;
