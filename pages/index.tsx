
import Link from "next/link";

import useAuth from "../utils/useAuth";



const Home = () => {

  const isLoggedIn = useAuth()

 


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
          <Link href={"/api/logout"}>
            <button className="text-2xl hover:bg-red-500 rounded-lg border p-3 bg-purple text-bgWhite drop-shadow-xl">
              Logga ut
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-center " >

            <div className=' flex mt-24  w-full flex-col align-center justify-center'>

              <h1 className=" drop-shadow-2xl text-center text-red-500 font-roboto italic text-2xl">
                front-end utvecklare

              </h1>
              <div className="w-full flex-col  flex items-center">
                <Link href={"/projects/all"}>
                  <button className="text-2xl w-2/4 max-w-sm hover:bg-red-500 rounded-lg border mt-5 p-3 bg-purple text-bgWhite drop-shadow-xl">
                    projekt
                  </button>
                </Link>
                <Link href={"/about/experiences/all"}>
                  <button className="text-2xl w-2/4 max-w-sm hover:bg-red-500 rounded-lg border mt-5 p-3 bg-purple text-bgWhite drop-shadow-xl">
                   erfarenhet
                  </button>
                </Link>
              </div>
              <div className="w-full relative min-h-[30rem] ">

   
              </div>
            </div >
          </div >
        </>
      )}



    </>
  )



}


export default Home
