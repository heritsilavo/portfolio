"use client"
import './globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useState,createContext, useEffect } from "react"
import { makeStore } from "@/lib/store";
import { useRef } from "react";
import { Provider } from "react-redux";
import { getTheme, senDtheme } from '@/lib/services/themeService';

export const themeContext=createContext();

export const darkTheme={
    value:'dark',
    b5bgColor:' bg-dark ',
    b5textColor:' text-light '
}

export const lightTheme={
    value:'light',
    b5bgColor:' bg-light ',
    b5textColor:' text-dark '
}


export default function BaqueLayout({children}) {
    const storeRef=useRef(null)
    const [theme,setTheme]=useState(darkTheme);

    useEffect(function() {
        const themeValue=getTheme()
        console.log(themeValue);
        if (themeValue) {
            if (themeValue=='dark') {
                setTheme(darkTheme)
            }else setTheme(lightTheme)
        }else setTheme(lightTheme)
    },[])

    const changeTheme=function(newTheme) {
        setTheme(newTheme)
        senDtheme(newTheme.value)
        console.log('here');
    }

    if (!storeRef.current) {
        storeRef.current=makeStore()
    }


    return <html>
                <head>
                   <meta charSet="UTF-8"/>
                   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>          
                </head>
                <body className='col-12'>
                <themeContext.Provider value={[theme,changeTheme]}>
                        <Provider store={storeRef.current}>
                        { children }
                        </Provider>     
                </themeContext.Provider>
                </body>
            </html>
}