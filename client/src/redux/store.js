import  {combineReducers, configureStore,getDefaultMiddleware} from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({user:userReducer}) // we need to combine the redicers first in order to persist them- store the values of the reducers in the local storage 

// as we are using the currentUser which stores the current user upon reloading the state of the reducer become reset to initalstate, so to store the values in local storage we use redux-persist library


const persistConfig = {
    key:'root',
    storage, // this determines where the data will be saved, here it will be browser's local storage in react and asyncStorage in React-Native
    version:1,
}
const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store =  configureStore({
    reducer:persistedReducer,
    // reducer:{ user: userReducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false,
    }), // to prevent errors in bowser
})

export const persistor =  persistStore(store) // this will make the store persist 