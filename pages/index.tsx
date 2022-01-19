import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { connect } from "../utils/dbConnect";
import { Iprojects } from "../utils/interfaces";


const Home = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [chosenNumber, setChosenNumber] = useState(0)
  const [loading, setLoading] = useState<null | boolean>(null)
  const [parsedProjects, setParsedProjects] = useState<Iprojects[]>([])
  let src = "/uploads/" + parsedProjects[chosenNumber]?.images[0].image.path
  useEffect(() => {
    setLoading(false)
    const parsed = JSON.parse(projects)
    setParsedProjects(parsed)
    const random = Math.floor(Math.random() * parsed.length)
    setChosenNumber(random)
    console.log()

  }, [])


  return (
    <>

      <div className="flex justify-center " >
        <div className=' flex mt-24  flex-col align-center justify-center'>
          <h1 className=" drop-shadow-2xl text-red-500 font-roboto italic text-2xl">
            front-end utvecklare,entreprenör,geni
          </h1>
       
           <Image  height={500} width={500} src={src} layout="responsive"/>
       
        </div>
      </div>




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
