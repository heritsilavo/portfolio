import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL=process.env.NEXT_PUBLIC_API_HOST

export const verifierLiberteSalle=createAsyncThunk('cours/verifierLiberteSalle',async function({heure,date,idsalle},thunkAPI) {
    const {data}=await axios.get(`/api/cours/verif_salle/${heure}/${date}/${idsalle}`)
    return data
})

export const verifierLiberteProf=createAsyncThunk('cours/verifierLiberteProf',async function({heure,date,idProf},thunkAPI) {
    const {data}=await axios.get(`/api/cours/verif_prof/${heure}/${date}/${idProf}`)
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
    const {data}=await axios.get("/api/cours")
    if (data.length === 0 ) NextID="C1"
    else{
        let liste=data.map(element => (parseInt(element.idC.slice(1))))
        NextID="C"+( getMax(liste) +1)
    }
    return NextID
}

export const deleteCoursByNiveau=createAsyncThunk('cours/delete',async function(idN,thunkAPI) {
    const {data}=await axios.delete('/api/cours/'+idN)
    return idN
})

export const createCours=createAsyncThunk('cours/create',async function(C,thunkAPI) {
    const nextId = await getNextId()
    const newCours={
        ...C,
        idC:nextId
    }
    console.log(newCours);
    const {data} =await axios.post("/api/cours",newCours)  
    return newCours
})

export const getAllCours=createAsyncThunk('cours/getAll',async function() {
    const {data} =await axios.get("/api/cours")  
    return data
})

const coursSlice=createSlice({
    name:"cours",
    initialState:[
    ],
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder.addCase(createCours.rejected,function() {
            console.error("Erreur pendant l'ajout du cours");
        }).addCase(createCours.fulfilled,function(state,action) {
            state.push(action.payload)
        }),

        builder.addCase(getAllCours.rejected,function() {
            console.error("Erreur pendant la recuperation de toutes les cours depuis la base de données");
        }).addCase(getAllCours.fulfilled,function (state,action) {
            action.payload.forEach(element => {
                state.push(element)
            });
        }),

        builder.addCase(deleteCoursByNiveau.rejected,function() {
            console.error("erreur pendant la suppression des cours par l'id niveau");
        }).addCase(deleteCoursByNiveau.fulfilled,function(state,action) {
            const indexes=[]
            
            for (let i = state.length - 1; i >= 0; i--) {
                if (state[i].niveau === action.payload) {
                    indexes.push(i)
                }
            }

            indexes.forEach(i => {
                state.splice(i,1)
            });
        })
    }
})

export const { } =coursSlice.actions

export default coursSlice.reducer