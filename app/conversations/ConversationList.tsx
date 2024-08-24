'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FullConversationType } from '../types';
import useConversation from '../hooks/useConversation';
import { MdOutlineGroupAdd } from 'react-icons/md';
import ConversationBox  from './ConversationBox';

import clsx from 'clsx';


interface ConversationListProps {
    initialItems: FullConversationType[]
} 
const ConversationList: React.FC<ConversationListProps> = ({initialItems}) => {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();
  const { conversationId, isOpen } = useConversation(); 
  return (
    <aside className={clsx(`hidden fixed inset-y-0 pb-20 lg:pb-0 
      lg:left-20 lg:w-80 lg:block overflow-y-auto border-r 
      border-gray-200`, isOpen ? 'hidden' : 'block w-full left-0')} >
        <div className='px-5'>
            <div className='flex justify-between items-center'>
                <div className='text-2xl font-bold text-neutral-800 py-4'>Messages</div>
                <div className='rounded-full p-2  bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition'>
                  <MdOutlineGroupAdd size={20}/>
                </div>
            </div>

            {
              items.map((item, index) => {
                return <ConversationBox data={item} key={index} selected={conversationId === item.id}/> 
              })
            }
        </div>
      </aside>
  )
}

export default ConversationList;
