"use client";

import React from 'react'
import { ThemeProvider as NextThemesProvidor } from 'next-themes';
import Header from '@/components/Custorm/Header';

function Providor ({children}) {
    return (
        <div>
            <NextThemesProvidor
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            >
            <Header/>
            {children}
            </NextThemesProvidor>
        </div>
    )
}

export default Providor;