import Link from "next/link"

export const Navbar = () => {
    return(
        <div className="flex ">
            <ul className="flex w-screen justify-between">
                <li>
                    <Link href="/">
                        <a>Hem</a>
                    </Link>
                </li>
                <li>
                    <Link href="/projects">
                        <a>Projekt</a>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/upload">
                        <a>Upload</a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}