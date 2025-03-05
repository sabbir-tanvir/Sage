"use client"

import React, { useContext } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Lookup from '@/data/Lookup';
import { Button } from '../ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import { UserDetailsContext } from '@/Contex/UserDetailsContext';


function SignInDialog({openDilog , closeDialog}) {
const {userDetails, setUserDetails} = useContext(UserDetailsContext);
  
const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    console.log(tokenResponse);
    const userInfo = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: 'Bearer ' +tokenResponse?.access_token} },
    );

    console.log(userInfo);
    setUserDetails(userInfo?.data);
    closeDialog(false);
  },
  onError: errorResponse => console.log(errorResponse),
});

  return (
    <Dialog open={openDilog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <div className="flex items-center gap-2 flex-col justify-center">
              <h2 className='font-bold text-center text-2xl text-white'>{Lookup.SIGNIN_HEADING}</h2>
              <p className='mt-2 text-center'>{Lookup.SIGNIN_SUBHEADING}</p>
              <Button className="bg-blue-500 mt-3 text-white hover:bg-blue-900" onClick={googleLogin}>Sign in with Google</Button> 
              <p>{Lookup?.SIGNIN_AGREEMENT_TEXT}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;