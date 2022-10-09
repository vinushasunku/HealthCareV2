import {InitialState} from '@react-navigation/native'
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const loginSlice = createSlice({
  name: "loginId",
  initialState: {
    loginId: undefined,
    signupsuccessmessage:true,
    type:'Consultation',
    doctorId:undefined,
    doctorName:undefined,
    experience:undefined,
    selectedSlot:undefined,
    selectedDate:undefined,
    fee:undefined,
    orderId:undefined,
    labId:undefined,
    myState:0,
    update:false,
    orderstatus:undefined,
    imageurl:undefined,
  },
  reducers: {
    setLoginId(state, action: PayloadAction<any>) {
      state.loginId = action.payload
    },
    setsignupsuccessmessage(state, action: PayloadAction<any>) {
      state.signupsuccessmessage = action.payload
    },
    setType(state, action: PayloadAction<any>) {
      state.type = action.payload
    },
    setDoctorId(state, action: PayloadAction<any>) {
      state.doctorId = action.payload
    },
    setSelectDoctorName(state, action: PayloadAction<any>) {
      state.doctorName = action.payload
    },
    setDoctorExperience(state, action: PayloadAction<any>) {
      state.experience = action.payload
    },
    setSelectselectedSlot(state, action: PayloadAction<any>) {
      state.selectedSlot = action.payload
    },
    setSelectselectedDate(state, action: PayloadAction<any>) {
      state.selectedDate = action.payload
    },
    setfee(state, action: PayloadAction<any>) {
      state.fee = action.payload
    },
    setorderId(state, action: PayloadAction<any>) {
      state.orderId = action.payload
    },
    setLabId(state, action: PayloadAction<any>) {
      state.labId = action.payload
    },
    setStateId(state, action: PayloadAction<any>) {
      state.myState = action.payload
    },
    setUpdate(state, action: PayloadAction<any>) {
      state.update = action.payload
    },
    setOrderStatus(state, action: PayloadAction<any>) {
      state.orderstatus = action.payload
    },

    setImageUrl(state, action: PayloadAction<any>) {
      state.orderstatus = action.payload
    },
  }
})

export const { setLoginId,setsignupsuccessmessage,setType,
  setDoctorId,setSelectDoctorName,setDoctorExperience,setSelectselectedSlot,
  setSelectselectedDate,setfee,setorderId,setLabId,setStateId ,setUpdate,setOrderStatus,setImageUrl} = loginSlice.actions
export default loginSlice.reducer

