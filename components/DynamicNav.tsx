
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSpring, animated, easings, useTransition, config } from 'react-spring'
import SelectedPath from '../components/SelectedPath'
import { navRoutes } from '../utils/declaritveObjects'



export interface INavRoutes {
    name: string;
    path: string;

}


type Position = React.CSSProperties['position']


interface Iprops {
    route: string;

}
export const DynamicNav = (props: Iprops) => {

    const [navigation, setNavigation] = useState<INavRoutes[]>([])
    const [index, setIndex] = useState(0)
    const router = useRouter()

    const transition = useTransition(navigation[index], {
        from: { position: "absolute" as Position, opacity: 0, y: -100 },
        enter: { opacity: 1, y: 0 },
        leave: { opacity: 0, y: 100 },

        config: config.stiff,
    })



    const incrementIndex = () => {

        if (index + 1 === navigation.length) {
            router.push(navigation[0].path)
            setIndex(0)

        }
        else {
            router.push(navigation[index + 1].path)
        }

    }
    const selection = navigation.map((route) => {
        return (
            <SelectedPath key={route.name} routes={navigation} name={route.name} current={navigation[index].name} />
        )

    })
    
    useEffect(() => {
        for (let i = 0; i < navRoutes.length; i++) {
            const element = navRoutes[i];
            if (props.route === element.path) {
                console.log(props.route)
                setIndex(i)
            }
        }
        if (props.route.includes("projects")) {
            setIndex(1)
        }


    }, [props.route])



    useEffect(() => {

        setNavigation(navRoutes)
    }, [])

    return (


        <>


            <div className='flex flex-col  sticky  bg-purple   top-0 z-50 '>
                <div className='h-1/6 w-3/5 relative drop-shadow-lg  flex flex-col justify-between max-w-lg'>


                    <div className='w-3/5 h-21  relative  drop-shadow-xl'>
                        <div className='top-1/4 relative flex justify-between bg-red-500 w-4/5 b flex-col'>
                            <h1 className='text-white text-5xl font-roboto italic  ' >max</h1>





                            <div className='h-5 relative'>
                                {transition((styleProps, item) =>
                                    item ? <animated.div style={styleProps}>
                                        <h1 className='text-5xl text-white font-roboto italic hover:cursor-pointer select-none drop-shadow-xl' onClick={incrementIndex} >

                                            {item.name}
                                        </h1>
                                    </animated.div> : ""
                                )}

                            </div>





                        </div >


                    </div >



                    <div className='flex justify-between w-5/5 h-2 mt-8'>
                        {selection}
                    </div>
                </div >
            </div >




        </>


    )



}



