import { useEffect, useState } from "react";
import { IImage, Iprojects } from "../utils/interfaces";
import Image from 'next/image'
import { ArrowDown, ArrowLeft, ArrowRight } from "react-feather";

interface Iprops {
    project: IImage[];
    focus: boolean;
}
export const ImageViewer = (props: Iprops) => {
    const [images, setImages] = useState<IImage[]>(props.project)
    const [imageIndex, setImageIndex] = useState(0)
    const [focus, setFocus] = useState(props.focus)
    console.log(props.project.length)
    const [arrows, setArrows] = useState(false)



    let src = "/uploads/" + props.project[imageIndex]?.image.path
    useEffect(() => {
        if(props.project.length > 1){
            setArrows(true)
        }
     }, [props.project])

    return (

        <div className="w-full flex relative flex-col items-center bg-shade ">
            <div className="w-full relative min-h-[30rem]  ">
                <Image layout="fill" sizes="50vw" objectFit="contain" src={src} />

            </div>
            {arrows ? (
                <>
                    <button onClick={() => {
                        console.log(imageIndex)
                        if (imageIndex === 0) {
                            setImageIndex(images.length - 1)
                        }
                        else {
                            setImageIndex(imageIndex - 1)
                        }
                    }} className="absolute left-0 w-1/5  h-full ">
                        <ArrowLeft className="text-purple" />
                    </button>

                    <button onClick={() => {

                        console.log(imageIndex)
                        if (imageIndex + 1 < images.length) {
                            setImageIndex(imageIndex + 1)
                        }
                        else {
                            setImageIndex(0)
                        }
                    }} className="absolute right-0 flex items-center justify-end w-1/5 h-full ">
                        <ArrowRight className="text-purple" />
                    </button>
                </>
            ) : null}

        </div>
    )

}