"use client";

import React, { use, useState, useEffect } from 'react'
import { ThemeProvider as NextThemesProvidor } from 'next-themes';
import Header from '../components/Custorm/Header';
import { MessgaesContext } from '../Contex/MessagesContex';
import { UserDetailsContext } from '../Contex/UserDetailsContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignInDialog from '../components/Custorm/SignInDialog';
import { useConvex } from 'convex/react';
import { api } from '../convex/_generated/api';

// Create a context for the dialog state
export const DialogContext = React.createContext();

function Providor({ children }) {
    const [mounted, setMounted] = useState(false);
    const [messages, setMessages] = useState();
    const [userDetails, setUserDetails] = useState();
    const [openDialog, setOpenDialog] = useState(false);
    const convex=useConvex();


    useEffect(() => {
        // Check if the user is already authenticated
        IsAuthenticated();
    }, []);

    const IsAuthenticated=async()=>{
        if(typeof window !== 'undefined')
            {
                const user = JSON.parse(localStorage.getItem('user'));
                const result = await convex.query(api.user.GetUser,{email:user.email});
                setUserDetails(result);
                console.log(result);
        }
    }


    useEffect(() => {
        setMounted(true);
        // Debug log to check if environment variable is loaded
        console.log('Google Client ID:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    }, []);

    if (!mounted) {
        return null;
    }

    // If no client ID is available, render without Google OAuth
    if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
        console.warn('Missing Google OAuth Client ID. Google Sign In will not work.');
        return (
            <div>
                <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
                <MessgaesContext.Provider value={{ messages, setMessages }}>
                    <DialogContext.Provider value={{ openDialog, setOpenDialog }}>
                        <NextThemesProvidor
                            attribute="class"
                            defaultTheme="dark"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <Header />
                            {children}
                        </NextThemesProvidor>
                    </DialogContext.Provider>
                </MessgaesContext.Provider>
                </UserDetailsContext.Provider>
            </div>
        );
    }

    return (
        <div>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
                <MessgaesContext.Provider value={{ messages, setMessages }}>
                    <DialogContext.Provider value={{ openDialog, setOpenDialog }}>
                        <NextThemesProvidor
                            attribute="class"
                            defaultTheme="dark"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <Header />
                            {children}
                            <SignInDialog 
                                openDilog={openDialog} 
                                closeDialog={(v) => setOpenDialog(v)} 
                            />
                        </NextThemesProvidor>
                    </DialogContext.Provider>
                </MessgaesContext.Provider>
                </UserDetailsContext.Provider>
            </GoogleOAuthProvider>
        </div>
    )
}

export default Providor;