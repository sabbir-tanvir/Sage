import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Lookup from '@/data/Lookup';
import { Button } from '../ui/button';


function SignInDialog({openDilog , closeDialog}) {
  return (
    
      <Dialog open={openDilog} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription >
            <div className="flex items-center gap-2 flex-col justify-center">
            <h2 className='font-bold text-center text-2xl text-white'>{Lookup.SIGNIN_HEADING}</h2>
            <p className='mt-2 text-center'>{Lookup.SIGNIN_SUBHEADING}</p>
            <Button className="bg-blue-500 mt-3 text-white hover:bg-blue-900">Sign in with Google </Button> 
            <p>{Lookup?.SIGNIn_AGREEMENT_TEXT}</p>
            
            
            
            
            </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

  );
};

export default SignInDialog;