export interface IImage{
   image:{
       path:string;
   }
   
}
export interface Imodal {
    cancel: () => void;
    title:string;
    message?: string;
}
export interface Ierror{
    statusCode: number;
    errorMessage:string;
}

export interface Iprojects {
    _id:string;
    name:string;
    description:string;
    techStack:string;
    createdDate:Date;
    gitLink:string;
    liveLink:string;
    images:IImage[]
  
}
export interface IExperience extends IFormExp{
    _id:string
}
export interface IRoute{

    path:string;
}

export interface IFormProject {
    name: string;
    techStack: string;
    description: string;
    createDate: Date;
    gitLink: string;
    liveLink: string;
}

export interface IFormExp{
    name:string;
    description:string;
    startDate:Date;
    endDate?:Date | null;
  

}
export interface IDisplayObject {
    [key: string]: {
        name:string;
        displayName:string;
        required:boolean;
        date?:boolean;
      
        
    }
}

