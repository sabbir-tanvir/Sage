import React from 'react';
import ChatView from '../../../../components/Custorm/ChatView';
import CodeView from '../../../../components/Custorm/CodeView';

function Workspace () {
  return (
    <div className='p-10'>
        <div className='grid gap-11 grid-cols-1 md:grid-cols-3'>
            
            <ChatView />
            
            <div className='col-span-2'>
            <CodeView />
            </div>
        </div>
      
    </div>
  );
};

export default Workspace;