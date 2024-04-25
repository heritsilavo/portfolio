import profReducer from '@/lib/features/porfesseur/professeur'
import niveauReducer from '@/lib/features/niveau/niveau'
import matierRducer from '@/lib/features/matiere/matiere'
import ensReducer from '@/lib/features/enseignement/enseignement'
import salleReducer from '@/lib/features/salle/salle'
import coursReducer from '@/lib/features/cours/cours'

import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer=combineReducers({
    prof:profReducer,
    niveau:niveauReducer,
    matiere:matierRducer,
    enseignement:ensReducer,
    salle:salleReducer,
    cours:coursReducer
})

export const makeStore=()=>configureStore({
    reducer:rootReducer
})