import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL=process.env.NEXT_PUBLIC_API_HOST

export const getAllSalle=createAsyncThunk('salle/getAll',async function(arg,thunkApi) {
    const {data}=await axios.get("/api/salles/")
    return data
})

/**
 * 
 * @param {Array} liste 
 */
function getMax(liste){
    let max=-1
    liste.forEach(function(element) {
        if (element>max) {
            max=element
        }
    })
    return max
}

const getNextId=async function() {
    let NextID=""
    const {data}=await axios.get("/api/salles")
    if (data.length === 0 ) NextID="S1"
    else{
        let liste=data.map(element => (parseInt(element.idSalle.slice(1))))
        NextID="S"+( getMax(liste) +1)
    }
    return NextID
}
export const ajouterSalle=createAsyncThunk('salle/create',async function (salle,thunkApi) {
    const nextId=await getNextId()
    const newSalle={
        ...salle,
        idSalle:nextId
    }
    console.log(newSalle);
    const {data}=await axios.post("/api/salles/",newSalle)
    return newSalle
})

export const deleteSalle=createAsyncThunk("salle/delete",async function (idSalle,thunkApi) {
    const {data}=await axios.delete("/api/salles/"+idSalle)
    return idSalle
})

const salleSlice=createSlice({
    name:"salle",
    initialState:[
    ],
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllSalle.rejected,function(state,action) {
            console.error("erreur pendant la recuperation des salles");
        }).addCase(getAllSalle.fulfilled,function(state,action) {
            action.payload.forEach(element => {
                state.push(element)
            });
        }),

        builder.addCase(ajouterSalle.rejected,function() {
            console.error("erreur pendant l'ajout de la salle");
        }).addCase(ajouterSalle.fulfilled,function(state,action) {
            state.push(action.payload)            
        }),


        builder.addCase(deleteSalle.rejected,function() {
            console.error("erreur pendant la suppression de la salle");
        }).addCase(deleteSalle.fulfilled,function(state,action) {
            let index=-1
            state.forEach((salle,i) => {
                if (salle.idSalle==action.payload) {
                    index=i
                }
            });
            state.splice(index,1)
        })
    }
})

export const { } =salleSlice.actions

export default salleSlice.reducer