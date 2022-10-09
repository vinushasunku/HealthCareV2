import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/login';
import  {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import thunk from 'redux-thunk'
import Asyncstorage  from '@react-native-async-storage/async-storage'
const reducers=combineReducers({
    loginId: loginReducer
})
const persistConfig={
    key:'root',
    storage:Asyncstorage
};
const rootReducer=(state:any,action:any)=>{
    return reducers(state,action)
};
const persistedReducer=persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware:[thunk]
});

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
export default store;
