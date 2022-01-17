import { useEffect, useState } from "react";
import { IImage } from "../utils/interfaces";
import Image from 'next/image'
import { ArrowDown, ArrowLeft, ArrowRight } from "react-feather";

interface Iprops {
    images: IImage[];
    focus: boolean;
}
export const ImageViewer = (props: Iprops) => {
    const [images, setImages] = useState<IImage[]>(props.images)
    const [imageIndex, setImageIndex] = useState(0)
    const [focus, setFocus] = useState(props.focus)
    const [clicked, setClicked] = useState(false)
    const [imageSize, setImageSize] = useState({
        height: 700, width: 700
    })
    console.log(images)
    let src = "/uploads/" + images[imageIndex].image.path

    console.log(props.images)

  

    

    useEffect(() => {
        setFocus(props.focus)
        if (focus) {
            setImageSize({ height: 1500, width: 1000 })
        }
    }, [props.focus])
    return (

        <div className="flex relative justify-center ">
            <button onClick={() => {
                console.log(imageIndex)
                if (imageIndex === 0) {
                    setImageIndex(images.length - 1)
                }
                else {
                    setImageIndex(imageIndex - 1)
                }
            }} className="">
                <ArrowLeft className="h-10" />
            </button>
            {/* DEnna ger horizontel */}
            <div className="block w-4/5  h-full">

                <Image height={imageSize.height} width={imageSize.width} layout='responsive'
                    objectFit="contain" src={src} />

            </div>
            <button onClick={() => {
           
                console.log(imageIndex)
                if (imageIndex + 1 < images.length) {
                    setImageIndex(imageIndex + 1)
                }
                else {
                    setImageIndex(0)
                }
            }} className="">
                <ArrowRight />
            </button>

        </div>
    )

}