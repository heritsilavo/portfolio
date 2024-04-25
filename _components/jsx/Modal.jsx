import '@/_components/css/Modal.css'
import { ExitIcon,Cross1Icon } from '@radix-ui/react-icons'
import { animated, useSpring, useTransition } from '@react-spring/web'

export default function Modal({children,titre,show,setShow,noHeader,noFooter,setConfirm,closeAction}){
    

    const trans = useTransition([1], {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
      })

    return <>
        {
            show && (
                <div className="d-flex align-items-start justify-content-center" id="__modal__container">
                    <div className="mt-3 col-4 rounded" id="__modal__">
                        {(!noHeader) && (
                            <div className="p-1 col-12 d-flex align-items-center " id="__modal_header">
                                <h5>{titre?titre:""}</h5>
                                <span onClick={(closeAction ? (closeAction) : ()=>{setShow(false)})} id='__close_btn_'> <Cross1Icon></Cross1Icon> </span>
                            </div>
                        )}

                        {
                            trans((style, item) => item && <animated.div style={style} className="p-1 col-12 text-wrap" id="__modal_content">
                                    {children}
                                </animated.div>
                            )
                        }
                        {
                            (!noFooter) && (
                                <div className="d-flex align-item-center justify-content-between col-12 mt-2 p-1" id="__modal_footer">
                                    <button id='__btns__' onClick={(closeAction ? (closeAction) : ()=>{setShow(false)})} className='btn btn-danger p-1 rounded m-2 mt-0 mb-0'>Annuler</button>
                                    <button id='__btns__' onClick={()=>{setConfirm(true);setShow(false)}} className='btn btn-primary p-1 rounded m-2 mt-0 mb-0'>Confirmer</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            )
        }
    </>
}