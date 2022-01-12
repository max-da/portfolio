import Link from "next/link"

const dashboard = ()=> {
    return(
        <div>
            <Link href={"/admin/upload"}>
                ladda upp nytt projekt
            </Link>
            <Link href={"/admin/upload"}>
                ladda upp nytt projekt
            </Link>
        </div>
    )
}
export default dashboard