import '@/_components/css/Acceuil.css'
import Link from 'next/link'

export default function Acceuil() {
    return <>
        <section className="d-flex align-items-center justify-content-evenly col-12" id="_sec1_">
        <div className="flex-grow-1 h-75 m-2 __acceuil_1__">
            <h1 className="__acc_txt__ _64px_">Bonjour,</h1>
            <h1 className="__acc_txt__ _64px_">Je suis Tsilavo</h1>
            <h1 className="__acc_txt__ _32px_">Developpeur web fullstack</h1>
            <button className="btn btn-success __acc_txt__">Telecharger CV</button>
        </div>
        <div className="col-0 col-md-5 h-100 __acceuil_2__"></div>
        <div className="d-none d-md-flex flex-column justify-content-between align-items-center __socials__">
            <Link href="https://www.facebook.com/her.tslav/" target="_blank"><div className="rounded m-3 __socials_item__"> <img src="/facebook.svg" alt="facebook"/> </div></Link>
            <Link href="https://www.linkedin.com/in/heritsilavo-andriantsilavina-86b4302b4/?originalSubdomain=mg" target="_blank"><div className="rounded m-3 __socials_item__"> <img src="/linkedin.svg" alt="linkedin"/> </div></Link>
            <Link href="https://github.com/heritsilavo" target="_blank"><div className="rounded m-3 __socials_item__"> <img src="/github.svg" alt="github"/> </div></Link>
        </div>
    </section>
    </>
}