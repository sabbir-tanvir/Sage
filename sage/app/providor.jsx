"use client";

import React, { use, useState } from 'react'
import { ThemeProvider as NextThemesProvidor } from 'next-themes';
import Header from '@/components/Custorm/Header';
import { MessgaesContext } from '@/Contex/MessagesContex';


function Providor({ children }) {

    const [messages, setMessages] = useState();
    return (
        <div>
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
        </div>
    )
}

export default Providor;