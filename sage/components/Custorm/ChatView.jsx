"use client";

import { MessgaesContext } from '@/Contex/MessagesContex';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation';
import React, { use, useContext, useEffect } from 'react';
import { api } from '../../convex/_generated/api';

function ChatView () {
    const {id} = useParams();
    const convex = useConvex();
    const {messages, setMessages} =useContext(MessgaesContext);

    useEffect(() => {
        id&&GetWorkspaceData();
    }, [id])

    const GetWorkspaceData=async()=>{
        const result =await convex.query(api.workspace.GetWorkspace,{
            WorkSpaceId:id});
        
        setMessages(result?.messages);
        console.log(result);
    };


  return (
    <div>
        <div>
            {messages?.map((msg, index) => (
                <div key={index}>
                    <h2>{msg.content}</h2>
                </div>
            ))}
        </div>
      
    </div>
  );
};

export default ChatView;