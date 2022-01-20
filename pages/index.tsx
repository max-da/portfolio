import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { connect } from "../utils/dbConnect";
import { Iprojects } from "../utils/interfaces";
import useAuth from "../utils/useAuth";
import { animated, useTrail, interpolate } from "react-spring"


const Home = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [chosenNumber, setChosenNumber] = useState(0)
  const [chosenNumbers, setChosenNumbers] = useState([0])
  const [loading, setLoading] = useState<null | boolean>(true)
  const isLoggedIn = useAuth()
  const [open, setOpen] = useState(true)
  const [parsedProjects, setParsedProjects] = useState<Iprojects[]>([])
  const [randomImgs, setRandomImgs] = useState<string[]>([])
  let src = "/uploads/" + parsedProjects[chosenNumber]?.images[0].image.path
  useEffect(() => {
    setLoading(true)
    const parsed = JSON.parse(projects)
    setParsedProjects(parsed)
    console.log(parsed)


  }, [])
  useEffect(() => {
    let imgs: string[] = []
    for (let i = 0; i < 3; i++) {
      const random = Math.floor(Math.random() * parsedProjects.length)
      console.log(random)
      imgs.push("/uploads/" + parsedProjects[random]?.images[0].image.path)
    }
    setRandomImgs(imgs)
    console.log(imgs)
    console.log(randomImgs[0])
  }, [parsedProjects])
  useEffect(() => {
    if (randomImgs.length > 0) {
      setLoading(false)
    }
  }, [randomImgs])
  const Trail = () => {
    const items = [0.5, 0.3, 0.2, 0.7, 1];
    const [on, toggle] = useState(false);
    const trail = useTrail(3, {
      opacity: on ? 0 : 1,
      transform: on ? 'scale(0.3)' : 'scale(1)',
      config: {
        duration: 1500
      }

    });

    return (
      <div className="boxes-grid">
        <button onClick={() => toggle(on => !on)}>Toggle</button>
        {trail.map((animation, idx) => <animated.div key={idx} className="w-screen h-24 " style={animation} >
          <Image src={randomImgs[idx]} layout="fill" sizes="50vw" objectFit="contain" /> {idx}
        </animated.div>)}
      </div>
    );
  };

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

                {/*  {!loading ? (
                  <Trail />
                ) : null} */}

                <button onClick={() => { console.log(open), setOpen(open => !open) }}></button>
              </div>
            </div >
          </div >
        </>
      )}



    </>
  )



}
export async function getStaticProps() {


  const { Project } = await connect();

  let temp: Iprojects[] = await Project.find({});
  let projects = JSON.stringify(temp)

  return {
    props: {
      projects
    }
  }

}

export default Home
