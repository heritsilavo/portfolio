import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import next from "next";
axios.defaults.baseURL=process.env.NEXT_PUBLIC_API_HOST

export const getALLens=createAsyncThunk('enseignements/getAll',async function(arg,thunkApi) {
    const {data}=await axios.get("/api/enseignements/")
    return data
})

export const deleteEnsById=createAsyncThunk('enseignements/delete',async function(idE,thunkApi) {
    const {data}=await axios.delete("/api/enseignements/"+idE)
    return idE
})

function getMax(liste){
    let max=-1
    liste.forEach(function(element) {
        if (element>max) {
            max=element
        }
    })
    return max
}

export const getNextId=async function() {
    let NextID=""
    const {data}=await axios.get("/api/enseignements/")
    if (data.length === 0 ) NextID="E1"
    else{
        let liste=data.map(element => (parseInt(element.idE.slice(1))))
        NextID="E"+( getMax(liste) +1)
    }
    console.log(NextID);
    return NextID
}

export const createEns=createAsyncThunk('enseignements/createOne',async function(enseignement,thunkAPI) {
    const {data} = await axios.post("/api/enseignements/",enseignement)
    return enseignement
})

export const getIdP=createAsyncThunk('enseignements/getIdP',async function({idM,nomN},thunkAPI) {
    const {data} = await axios.get("/api/enseignements/endeignement/"+idM+"/"+nomN)
    return data
})


const enseignementSlice=createSlice({
    name:"enseignement",
    initialState:[
        // { idNiveau: 'N1', idMatiere: 'M2', idProf: 'P1' },
    ],
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getALLens.rejected,function() {
            console.error("erreur pendant la recupereation de toutes les enseignements");
        }).addCase(getALLens.fulfilled,function(state,action) {
            action.payload.forEach(element => {
                state.push(element)
            });
        }),

        builder.addCase(deleteEnsById.rejected,function() {
            console.error("erreur pendant la suppression du ens");
        }).addCase(deleteEnsById.fulfilled,function(state,action) {
            let index=-1
            state.forEach((ens,i) => {
                if (ens.idE===action.payload) {
                    index=i
                }
            });
            state.splice(index,1)
        }),

        builder.addCase(createEns.rejected,function() {
            console.error("erreur pendant l'ajout de l'enseignement");            
        }).addCase(createEns.fulfilled,function(state,actions) {
            state.push(actions.payload)
        })
    }
})

export const {  } =enseignementSlice.actions

export default enseignementSlice.reducer