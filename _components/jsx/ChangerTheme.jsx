"use client"
import '@/_components/css/ChangerTheme.css'
import { SunIcon,MoonIcon } from '@radix-ui/react-icons'
import { useContext } from 'react'
import { themeContext } from '@/app/layout'
import { darkTheme,lightTheme } from '@/app/layout'

export default function ChangerTheme() {
    const [theme,setTheme]=useContext(themeContext)
    const change=function(params) {
        if ((theme.value=='dark')) setTheme(lightTheme)
        else setTheme(darkTheme)
    }
    return <button onClick={change} className={"__change_theme__ rounded border m-1 "+theme.b5bgcolor+theme.b5textColor}>
        {(!theme.value=='dark')? <MoonIcon></MoonIcon> : <SunIcon></SunIcon> }
    </button>
}