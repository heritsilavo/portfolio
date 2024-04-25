import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL=process.env.NEXT_PUBLIC_API_HOST

const getNextId=async function() {
    let NextID=""
    const {data}=await axios.get("/api/profs/")
    if (data.length === 0 ) NextID="P1"
    else{
        let last=parseInt(data[data.length-1].idProf.slice(1))
        NextID="P"+(last+1)
    }
    return NextID
}

export const getALlProfs=createAsyncThunk('prof/getAll',async function(arg,thunkApi) {
    const {data}=await axios.get("/api/profs/")
    return data
})

export const createProf=createAsyncThunk('prof/create',async function(newProf,thunkApi) {
    const NextID=await getNextId()
    const {data}=await axios.post("/api/profs/",{
        ...newProf,
        idProf:NextID
    })
    
    return data
})

export const modifProf=createAsyncThunk('prof/modif',async function(newProf,thunkApi) {
    const {data}=await axios.put("/api/profs/"+newProf.idProf,newProf)
    return newProf
})

export const deleteProf=createAsyncThunk('prof/delete',async function(prof,thunkApi) {
    const {data}=await axios.delete("/api/profs/"+prof.idProf)
    return prof
})

const profSlice=createSlice({
    name:"professeur",
    initialState:[
    ],
    reducers:{
        getProfById(state,action){
            let prof=null
            state.forEach(element => {
                if (element.idProf===action.payload) {
                    prof=element
                }                
            });
            return prof
        }
    },
    extraReducers:(builder)=>{
        //select all
        builder.addCase(getALlProfs.fulfilled,function(state,action) {
            action.payload.forEach(function(prof) {
                state.push(prof)
            })
        }).addCase(getALlProfs.rejected,function (state,action) {
            console.error("Erreur pendant la requete select de toutes les empoyee");
        })
        //modif
        ,builder.addCase(modifProf.fulfilled,function(state,action){
            let index=-1
            state.forEach(function(prof,i) {
                if (prof.idProf === action.payload.idProf) {
                    index=i           
                }
            })
            state[index]=action.payload    
        }).addCase(modifProf.rejected,function (state,action) {
            console.error("Erreur pendant la modification");
        }),
        //create one
        builder.addCase(createProf.rejected,function() {
            console.error("erreur pendant la creation d'un nouveau prof");
        }).addCase(createProf.fulfilled,function (state,action) {
            state.push(action.payload)
        }),
        //delete one
        builder.addCase(deleteProf.rejected,function() {
            console.error("erreurpendant la suppresion d'un prof");
        }).addCase(deleteProf.fulfilled,function(state,action) {
            let index=-1
            state.forEach(function(prof,i) {
                if (prof.idProf === action.payload.idP) {
                    index=i           
                }
            })
            state.splice(index,1)
        })
    }
})

export const { getProfById } =profSlice.actions

export default profSlice.reducer