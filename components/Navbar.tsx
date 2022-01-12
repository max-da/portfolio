import Link from "next/link"
import useAuth from "../utils/useAuth"

export const Navbar = () => {
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
                        <a>Upload</a>
                    </Link>
                </li>

                <li>
        
                    {isLoggedIn ? (
                        <Link href="/admin/login">
                            <a>trye</a>
                        </Link>
                    ) : (
                        <Link href="/admin/login">
                            <a>falz</a>
                        </Link>
                    )}

                </li>
            </ul>
        </div>
    )
}