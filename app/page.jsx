"use client"
import Acceuil from "@/_components/jsx/Acceuil"
import Nav from "@/_components/jsx/Nav"
import { useRouter } from "next/navigation"

export default function Page() {
    const router=useRouter()
    
    return <>
        <Nav showNav={true}></Nav>
        <Acceuil></Acceuil>
    </>
}