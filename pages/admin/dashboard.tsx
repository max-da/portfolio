import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import useAuth from "../../utils/useAuth"

const dashboard = () => {
    const isLoggedIn = useAuth()
    const router = useRouter()

    return (
        <>
            {isLoggedIn.isLoggedIn ? (
                <div className="w-full flex flex-col items-center h-3/5  justify-center  mt-5">
                    <Link href={"/admin/upload/project"}>
                        <button className="text-2xl hover:bg-red-500 rounded-lg border mt-5 p-3 bg-purple text-bgWhite drop-shadow-xl">
                            Ladda upp projekt
                        </button>
                    </Link>
                    <Link href={"/admin/upload/experience"}>
                        <button className="text-2xl hover:bg-red-500 rounded-lg border p-3 bg-purple text-bgWhite drop-shadow-xl">
                            Ladda upp erfarenhet
                        </button>
                    </Link>
                </div>
            ) : (
                <p></p>
            )}</>
    )
}
export default dashboard