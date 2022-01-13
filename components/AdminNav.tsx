import Link from "next/link"
import useAuth from "../utils/useAuth"

export const AdminNav = () => {
    const {isLoggedIn} =  useAuth()
    return (
        <div className="flex ">
            <ul className="flex w-screen justify-between">
                <li>
                    <Link href="/">
                        <a>Hem</a>
                    </Link>
                </li>
                <li>
                    <Link href="/projects/all">
                        <a>Projekt</a>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/dashboard">
                        <a>Dashboard</a>
                    </Link>
                </li>

            </ul>
        </div>
    )
}