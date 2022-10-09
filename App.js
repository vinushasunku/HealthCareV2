import React,{useEffect} from "react";
import { StyleSheet, Text, View,Avatar } from 'react-native';
import { LogBox } from "react-native";
import {MainNav} from './src/navigation/mannav'
import HomeConsultation from './src/components/HomeConsultation/HomeConsultation';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/components/redux/store';
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import Asyncstorage  from '@react-native-async-storage/async-storage'


export default () => {

  const clearAllData=()=>{
    Asyncstorage.getAllKeys()
    .then(keys => Asyncstorage.multiRemove(keys))
    .then(()=>{});
  }
  useEffect(() =>{
    clearAllData()
  },[])
  let  persistor= persistStore(store);
  return (
    // <MainNav />
    <Provider  store={store}>
         <PersistGate loading={null} persistor={persistor}>
           <MainNav />
         </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
