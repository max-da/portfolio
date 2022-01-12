import { IDisplayObject } from "./interfaces";

export const uploadProject: IDisplayObject = {
    name:{
        name:"name",
        displayName:"Projekt namn",
        required:true
    },
    techStack:{
        name:"techStack",
        displayName:"Tech stack",
        required:true
    },
    description:{
        name:"description",
        displayName:"Beskrivning",
        required:true
    },
    createdDate:{
        name:"createdDate",
        displayName:"Datum",
        required:false,
        date:true,
    },
    gitLink:{
        name:"description",
        displayName:"Länk till git",
        required:false
    },
    liveLink:{
        name:"liveLink",
        displayName:"Länk",
        required:false
    }
}

export const uploadExperience: IDisplayObject = {
    name:{
        name:"name",
        displayName:"Namn",
        required:true
    },
    description:{
        name:"description",
        displayName:"Beskrivning",
        required:true
    },
    startDate:{
        name:"startDate",
        displayName:"Startdatum",
        required:true,
        date:true
    },
    endDate:{
        name:"endDate",
        displayName:"Slutdatum",
        required:false,
        date:true
    },
    current:{
        name:"current",
        displayName:"Håller på just nu",
        required:false,
       
    },
   
  
}