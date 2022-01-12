import Link from "next/link"

const dashboard = ()=> {
    return(
        <div>
            <Link href={"/admin/upload/project"}>
                ladda upp nytt projekt
            </Link>
            <Link href={"/admin/upload/experience"}>
                ladda upp nytt erfarenhet
            </Link>
        </div>
    )
}
export default dashboard