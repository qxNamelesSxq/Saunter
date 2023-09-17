import {combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setDistanceReducer } from './setDistance/setDistance';
import { setOpenModalReducer } from './setOpenModal/setOpenModal';
import { setMarkersArrayReducer } from './setMarkersArray/setMarkersArray';
import { setUpdateReducer } from './setUpdate/setUpdate';
import { setIdReducer } from './setId/setId';
import { setShowRouteInfoReducer } from './setShowRouteInfo/setShowRouteInfo';
import { fetchReducer } from './fetchData/reducer';


const reducer = combineReducers({
    setDistanceReducer, setOpenModalReducer, setMarkersArrayReducer, setUpdateReducer, setIdReducer, setShowRouteInfoReducer, fetchReducer
})

const middleware = getDefaultMiddleware({
    immutableCheck:false,
    thunk:true,
})

export const store = configureStore({reducer, middleware})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;