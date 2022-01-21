import { ChangeEvent } from "react"

/* Edit field används för att rendera input/content beroende på "editmode" dvs om användare tryckt på edit */
interface Iprops {
    editMode: boolean;
    content: string;
    name:string;
    date?: boolean;
    description?: boolean;
    onChange: (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;



}
export const EditField = (props: Iprops) => {

    const onChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.onChange(e)
    }
    return (
        <>
            {props.editMode ? (
                <>

                    {props.description ? (
                        <textarea name={props.name} rows={12} cols={40} className="w-full  h-full bg-transparent" defaultValue={props.content} onChange={onChange} >

                        </textarea>
                    ) : (
                        
                        <input name={props.name} placeholder={props.name} className="underline bg-transparent " type={`${props.date ? "Date" : "text"}`} defaultValue={props.content}  onChange={onChange} />

                    
                    )}
                </>
            ) : (
              <>
                
                {props.content}
          
                
                  
              </>
            )}
        </>

    )
}