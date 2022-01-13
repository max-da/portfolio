import Router, { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react"
import useAuth from "../utils/useAuth"
import { AdminNav } from "./AdminNav";
import { Navbar } from "./Navbar";

interface Iprops {
    children: ReactNode
}

const Layout = (props: Iprops) => {
    const { isLoggedIn } = useAuth();
    const router = useRouter()
    const [onHome, setOnHome] = useState(false)
    useEffect(() => {
        if (router.pathname === "/") {
            setOnHome(true)
        }else{
            setOnHome(false)
        }
    }, [router.pathname])
    return (
        <>
            {onHome ? (
                <>

                </>
            ) : (
                <>
                    {isLoggedIn ? (
                        <div>
                            <AdminNav />
                        </div>
                    ) : (
                        <div>
                            <Navbar />
                        </div>
                    )}
                </>
            )}
            {props.children}
        </>
    )
}
export default Layout