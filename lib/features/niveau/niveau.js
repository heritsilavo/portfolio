import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL=process.env.NEXT_PUBLIC_API_HOST

export const insertDefaultNiveau=createAsyncThunk('niveau/insertDefaultData',async function() {
    const niveaux=[
        {
            idNiveau:"N1",
            nomN:"L1"
        },{
            idNiveau:"N2",
            nomN:"L2"
        },{
            idNiveau:"N3",
            nomN:"L3"
        },{
            idNiveau:"N4",
            nomN:"M1"
        },{
            idNiveau:"N5",
            nomN:"M2"
        },
    ]
    
    for (const niv of niveaux) {
        const data=await axios.post("/api/niveaux",niv)
    }

})

const niveauSlice=createSlice({
    name:"niveau",
    initialState:[
        {
            idNiveau:"N1",
            nomN:"L1",
            matiere:[]
        },{
            idNiveau:"N2",
            nomN:"L2",
            matiere:[]
        },{
            idNiveau:"N3",
            nomN:"L3",
            matiere:[]
        },{
            idNiveau:"N4",
            nomN:"M1",
            matiere:[]
        },{
            idNiveau:"N5",
            nomN:"M2",
            matiere:[]
        },
    ],
    reducers:{
        addMatiereInNiveau(state,action){
            const {AddNiv,nomMatiere}=action.payload
            let index=-1
            state.forEach(function(niv,i) {
                if(niv.idNiveau === AddNiv.idNiveau){
                    index=i
                }                
            })
            let n = state[index]
            n.matiere.push(nomMatiere)
            state[index]=n
        },

        addMInN(state,action){
            const {nomNiveau,nomMatiere}=action.payload
            let index=-1
            state.forEach(function(niv,i) {
                if(niv.nomN === nomNiveau){
                    index=i
                }                
            })
            let n = state[index]
            n.matiere.push(nomMatiere)
            state[index]=n
        },

        deleteMatiereInNiveau(state,action){
            const {nomMatiere,index,idNiveau}=action.payload
            let indice=-1
            state.forEach((element,i) => {
                if (element.idNiveau === idNiveau) {
                    indice=i
                }
            });
            state[indice].matiere.splice(index,1)
        },
    },
    extraReducers:(builder)=>{
       
    }
})

export const { addMatiereInNiveau,deleteMatiereInNiveau,addMInN,getNiveauById } = niveauSlice.actions

export default niveauSlice.reducer