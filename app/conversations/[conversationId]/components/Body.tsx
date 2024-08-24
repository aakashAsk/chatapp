'use client';

import React, { useEffect, useRef, useState } from "react";
import { FullMessageType } from "../../../types";
import useConversation from "../../../hooks/useConversation";
import MessageBox from './MessageBox';
import { pusherClient } from "../../../libs/pusher";
import { id } from "date-fns/locale";
import { find } from "lodash";
import axios from "axios";
interface BodyProps {
    initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({initialMessages}) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);
    const { conversationId } = useConversation();

    useEffect(() => {
        pusherClient.subscribe(conversationId);
        bottomRef?.current?.scrollIntoView();
        messageHandler(messages[messages.length - 1]);
        
    
        const updateMessageHandler = (newMessage: FullMessageType) => {
            setMessages((current) => current?.map((currentMessage) => {
                if (currentMessage?.id === newMessage?.id) {
                    return newMessage;
                }
                return currentMessage;
            }))
        }

        pusherClient.bind('message:new', messageHandler);
        pusherClient.bind('message:update', updateMessageHandler);

        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind('message:new', messageHandler);
        }
    }, [conversationId]);

    const messageHandler = (message: FullMessageType) => {
        axios.post(`/api/conversations/${conversationId}/seen`);
        setMessages((current) => {
            if(find(current, { id: message.id })){
                return current;
            }
            return [...current, message];
        })
    }
    

    return (
        <div className="flex-1 overflow-y-auto">
            {
                messages?.map((message, i) => {
                    return <MessageBox key={message.id} isLast={i === messages.length - 1} data={message}/>
                })
            }
        </div>
    )
}

export default Body;