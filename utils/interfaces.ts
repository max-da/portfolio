export interface IImage{
   image:{
       path:string;
   }
   
}


export interface Iprojects {
    _id:string;
    name:string;
    description:string;
    techStack:string[];
    createdDate:Date;
    gitLink:string;
    liveLink:string;
    images:IImage[]
  
}
