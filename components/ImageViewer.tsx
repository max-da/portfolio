import { useEffect, useState } from "react";
import { IImage } from "../utils/interfaces";
import Image from 'next/image'

 interface Iprops {
    images:IImage[];
    focus:boolean;
}
export const ImageViewer = (props:Iprops) => {  
    const [images,setImages] = useState<IImage[]>(props.images)
    const [imageIndex,setImageIndex] = useState(0)
    const [focus,setFocus] = useState(props.focus)
    const [imageSize,setImageSize] = useState({
        height:400, width:500
    })
    console.log(images)
    let src = "/uploads/" + images[imageIndex].image.path   
    console.log(props.images)

    useEffect(()=>{
        if(focus){
            if(imageIndex + 1 < images.length ) {
                setTimeout(()=>{setImageIndex(+1)}, 5000)
            }else{
                setTimeout(()=>{setImageIndex(0)}, 5000)
    
            }
        }
       
      
  
    },[imageIndex])

    useEffect(()=>{
        setFocus(props.focus)
        if(focus){
            setImageSize({height:1000, width:1000})
        }
    },[props.focus])
    return(
      
        <Image height={imageSize.height} width={imageSize.width} layout='responsive'
        objectFit="contain" className='bg-red-200' src={src} />
    )

}