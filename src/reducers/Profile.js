import {
  GET_USER_PROFILE_BY_ID_SUCCESS,
   EDIT_USER_PROFILE_SUCCESS,
   VERIFY_MOBILE_NO_SUCCESS,
   VERIFY_OTP_SUCCESS

} from "../constants/ActionTypes";

const INIT_STATE = {
  get_user_by_id: '',
  loader:false,
  profile_update:'',
  user_img:'',
  verify_mobile:'',
  OTP:''
 
};


export default (state = INIT_STATE, action) => {
  console.log(action.type)
  switch (action.type) {
    case GET_USER_PROFILE_BY_ID_SUCCESS: {
   
      return {
        ...state,
        loader: false,
        get_user_by_id: action.payload.data,
        
     
      }
    }case EDIT_USER_PROFILE_SUCCESS: {
     // console.log(action.payload)
   
      return {
        ...state,
        loader: false,
        profile_update: action.payload.message,
     
      }
    }case VERIFY_MOBILE_NO_SUCCESS: {
      console.log(action.payload,'action.payload.status')
      return {
        ...state,
        loader: false,
        verify_mobile: action.payload,
     
      }
    }
    case VERIFY_OTP_SUCCESS: {
     console.log(action.payload,'00000')
   
      return {
        ...state,
        loader: false,
        OTP: action.payload,
     
      }
    }
   
    default:
      return state;
  }
}
