"use client";

import React, { use, useState } from 'react'
import { ThemeProvider as NextThemesProvidor } from 'next-themes';
import Header from '@/components/Custorm/Header';
import { MessgaesContext } from '@/Contex/MessagesContex';
import { UserDetailsContext } from '@/Contex/UserDetailsContext';


function Providor({ children }) {

    const [messages, setMessages] = useState();
    const [userDetails, setUserDetails] = useState();
    return (
        <div>
            <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
            <MessgaesContext.Provider value={{ messages, setMessages }}>
                <NextThemesProvidor
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header />
                    {children}
                </NextThemesProvidor>
            </MessgaesContext.Provider>
            </UserDetailsContext.Provider>
        </div>
    )
}

export default Providor;