export interface IImage{
   image:{
       path:string;
   }
   
}


export interface Iprojects {
    id:string;
    name:string;
    techStack:string[];
    createdDate:Date;
    gitLink:string;
    liveLink:string;
    images:IImage[]
  
}
