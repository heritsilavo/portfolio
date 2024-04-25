import "@/_components/css/Nav.css"
import { useState } from "react"
import Link from "next/link"

export default function Nav({showNav}) {
    const [showvNav,setShowVnav]=useState(false)

    const handleVNav=function() {
        setShowVnav(()=>!showvNav)
    }
    
    return <>
        <div className={'col-12 d-flex align-items-center justify-content-between __nav_container__ '+( showNav ? '':'__hide_nav__' )}>
            <div className="__logo__">HERITSILAVO</div>
            <img onClick={handleVNav} className="d-inline-block d-md-none __bars__" src="/barswhite.svg" alt="bars"/>

            <div className={'col-11  __v_nav_ '+(showvNav?'':' _not_show_ ')}>
                <ul className="m-0">
                    <li className="m-2 col-4"><Link className="col-12"  href="/#_sec1_">Acceuil</Link> </li>
                    <li className="m-2 col-4"><Link className="col-12"  href="/#_sec2_">A propos</Link> </li>
                    <li className="m-2 col-4"><Link className="col-12"  href="/#_sec3_">Mes Projets</Link></li>
                    <li className="m-2 col-4"><Link className="col-12"  href="/#_sec4_">Mes services</Link></li>
                    <li className="col-10 mb-2">
                        <Link href="/proposer"><button className="btn btn-success">Proposer un projet</button></Link>
                    </li>
                </ul>
            </div>

            <ul className="d-none d-md-inline-block m-0">
                <li><Link  href="/#_sec1_">Acceuil</Link> </li>
                <li><Link  href="/#_sec2_">A propos</Link> </li>
                <li><Link  href="/#_sec3_">Mes Projets</Link></li>
                <li><Link  href="/#_sec4_">Mes services</Link></li>
            </ul>
            <Link className="d-none d-md-inline-block"href="/proposer"><button className="btn btn-success">Proposer un projet</button></Link>
        </div>
    <div>
        <div className="__after_nav__"></div>
    </div>
    </>
}