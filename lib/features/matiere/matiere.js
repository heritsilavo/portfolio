import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL=process.env.NEXT_PUBLIC_API_HOST

export const AddNiveauInMatiere=createAsyncThunk('matiere/addNiveauinMatiere',async function({nomMatiere,niveau},thunkAPI) {
    //modification de la ligne correspondante dans la base de données
    const {data} = await axios.get("/api/matieres")
    let matiere=null
    data.forEach((element,i) => {
        if (element.nomM===nomMatiere) {
            matiere=element
        }
    });

    matiere.niveau.push(niveau.nomN)
    await axios.put("/api/matieres/"+matiere.idMatiere,matiere)
    return {nomMatiere,niveau}
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
    const {data}=await axios.get("/api/matieres/")
    console.log(data);
    if (data.length === 0 ) NextID="M1"
    else{
        let liste=data.map(element => (parseInt(element.idMatiere.slice(1))))
        NextID="M"+( getMax(liste) +1)
    }
    return NextID
}

const calculeNextId=function(state) {
    let ids=state.map(el=>parseInt(el.idMatiere.slice(1)))
    let max=0
    ids.forEach(element => {
        if (element>max) max=element
    });
    return "M"+(max+1)
}
export const createMatiere=createAsyncThunk('matiere/create',async function({nomMatiere,niveau},thunkAPI) {
    //ajout dans la base de de donnes
    const nextId = await getNextId()
    const newMatiere={
        idMatiere:nextId,
        nomM:nomMatiere,
        niveau:[niveau.nomN]
    }
    console.log(newMatiere);
    const {data}=await axios.post("/api/matieres",newMatiere)
    return {nomMatiere,niveau}
})

export const deleteNiveauInMatiere=createAsyncThunk('matiere/delete',async function({nomMatiere,niveau},thunkAPI) {
  //delete in database
  const {data}=await axios.get("/api/matieres/")
  let matiere=null
  data.forEach(mat => {
    if (mat.nomM===nomMatiere) {
        matiere=mat
    }
  });
  let indice=-1
  matiere.niveau.forEach((n,i) => {
    if (niveau.nomN===n) {
        indice=i
    }
  });

  let a=[...matiere.niveau]
  a.splice(indice,1)
  matiere.niveau=a

  const response=await axios.put("/api/matieres/"+matiere.idMatiere,matiere)

  return {nomMatiere,niveau}
})

export const getAllMatiere=createAsyncThunk('matiere/getAll',async function(arg,thunkAPI) {
    const {data} = await axios.get("/api/matieres")
    return data
})

export const getAllMatiereByNiv=createAsyncThunk('matiere/getAllMatByNiv',async function(arg,thunkAPI) {
  const {data} = await axios.get("/api/matieres/niveau/"+arg)
  return data
})


export const insertMatiere=createAsyncThunk('matiere/insert',async function(arg,thunkAPI) {
    //ajouter toutes les matieres
    const data=[
        {
          "idMatiere": "M25",
          "nomM": "khj",
          "niveau": []
        },
        {
          "idMatiere": "M4",
          "nomM": "Algebre",
          "niveau": [
            "L2",
            "L3",
            "M1",
            "M2"
          ]
        },
        {
          "idMatiere": "M6",
          "nomM": "Algorithme",
          "niveau": [
            "L2",
            "L3"
          ]
        },
        {
          "idMatiere": "M26",
          "nomM": "JS",
          "niveau": []
        },
        {
          "idMatiere": "M22",
          "nomM": "Math Disc",
          "niveau": [
            "L1",
            "L2"
          ]
        },
        {
          "idMatiere": "M2",
          "nomM": "Electronique Analogique",
          "niveau": [
            "L1",
            "L2",
            "L3",
            "M1",
            "M2"
          ]
        },
        {
          "idMatiere": "M8",
          "nomM": "HTML&CSS",
          "niveau": [
            "L1"
          ]
        },
        {
          "idMatiere": "M5",
          "nomM": "Analyse",
          "niveau": [
            "L1",
            "L2",
            "L3",
            "M1",
            "M2"
          ]
        },
        {
          "idMatiere": "M7",
          "nomM": "Langage C",
          "niveau": [
            "L1",
            "L2"
          ]
        },
        {
          "idMatiere": "M9",
          "nomM": "Javascript",
          "niveau": [
            "L2"
          ]
        },
        {
          "idMatiere": "M10",
          "nomM": "Merise",
          "niveau": [
            "L2"
          ]
        },
        {
          "idMatiere": "M12",
          "nomM": "NodeJs",
          "niveau": [
            "L3",
            "M1",
            "M2"
          ]
        },
        {
          "idMatiere": "M14",
          "nomM": "Android",
          "niveau": [
            "L3",
            "M1",
            "M2"
          ]
        },
        {
          "idMatiere": "M13",
          "nomM": "UML",
          "niveau": [
            "L3",
            "M1",
            "M2"
          ]
        },
        {
          "idMatiere": "M15",
          "nomM": "G log",
          "niveau": [
            "L3",
            "M1",
            "M2"
          ]
        },
        {
          "idMatiere": "M16",
          "nomM": "IHM",
          "niveau": [
            "L3",
            "M1",
            "M2"
          ]
        },
        {
          "idMatiere": "M17",
          "nomM": "ReactJs",
          "niveau": [
            "L3",
            "M1",
            "M2"
          ]
        },
        {
          "idMatiere": "M18",
          "nomM": "BDA",
          "niveau": [
            "L3",
            "M1",
            "M2"
          ]
        },
        {
          "idMatiere": "M19",
          "nomM": "MERISE2",
          "niveau": [
            "L3",
            "M1",
            "M2"
          ]
        },
        {
          "idMatiere": "M11",
          "nomM": "Intro M",
          "niveau": [
            "L2"
          ]
        },
        {
          "idMatiere": "M1",
          "nomM": "Math",
          "niveau": [
            "L3",
            "M1",
            "M2"
          ]
        },
        {
          "idMatiere": "M23",
          "nomM": "Proglin",
          "niveau": [
            "L2"
          ]
        },
        {
          "idMatiere": "M24",
          "nomM": "RO",
          "niveau": [
            "M1"
          ]
        }
    ]

    data.forEach(m => {
        (async function() {
            await axios.post("/api/matieres/",m)
        })();
    });

    return true
})

export const getMatiereById=createAsyncThunk('matiere/getById',async function(arg,thunkAPI) {
    const {data} = await axios.get("/api/matieres/"+arg)
    return data
})

const matiereSlice=createSlice({
    name:"matiere",
    initialState:[],
    reducers:{
        
    },
    extraReducers:(builder)=>{
       builder.addCase(AddNiveauInMatiere.fulfilled,function (state,action) {
            const {nomMatiere,niveau}=action.payload
            console.log(action.payload);
            let index=-1    
            state.forEach((m,i) => {
                if (m.nomM===nomMatiere) index=i       
            });
            if (index!=-1) {
                let tmp=state[index]
                tmp.niveau.push(niveau.nomN)
                state[index]=tmp
            }    
       }).addCase(AddNiveauInMatiere.rejected,function (state,action) {
            console.error("Erreur pendant l'ajout du niveau dan matiere(table matiere en BD)");
       }),

       builder.addCase(createMatiere.rejected,function() {
        console.error("erreur pendant la creation de la matiere");
       }).addCase(createMatiere.fulfilled,function(state,action) {
            const {nomMatiere,niveau} = action.payload
            const nextId=calculeNextId(state)
            const newMatiere={
                idMatiere:nextId,
                nomM:nomMatiere,
                niveau:[niveau.nomN]
            }
       }),

       builder.addCase(deleteNiveauInMatiere.rejected,function() {
            console.error("Erreur pendant la suppression du niveau dan matiere");    
       }).addCase(deleteNiveauInMatiere.fulfilled,function(state,action) {
            const {nomMatiere,niveau}=action.payload
            let index=-1
            state.forEach((mat,i) => {
                if (mat.nomM === nomMatiere) {
                    index=i
                }                
            });
            let tmp=state[index]
            let indice=-1
            tmp?.niveau?.forEach((niv,i) => {
               if (niv===niveau.nomN) {
                    indice=i
               } 
            });
            tmp?.niveau?.splice(indice,1)
       }),

       builder.addCase(getAllMatiere.rejected,function () {
        console.error("Erreur pendant la suppression du niveau dan matiere");
       }).addCase(getAllMatiere.fulfilled,function (state,action) {
            action.payload.forEach(element => {
                state.push(element)
            });
       })
    }
})

export const {  } =matiereSlice.actions

export default matiereSlice.reducer