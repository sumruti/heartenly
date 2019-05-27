import {
  GET_USER_PROFILE_BY_ID_SUCCESS,
   EDIT_USER_PROFILE_SUCCESS,
   VERIFY_MOBILE_NO_SUCCESS,
   VERIFY_OTP_SUCCESS,
   USER_CRITERIA_SUCCESS,
   USER_WORK_SUCCESS,
   USER_EDUCATION_SUCCESS,
   USER_DOMICILE_SUCCESS,
   UPDATE_BASIC_SUCCESS,

} from "../constants/ActionTypes";

const INIT_STATE = {
  get_user_by_id: '',
  loader:false,
  profile_update:'',
  user_img:'',
  verify_mobile:'',
  OTP:'',
  criteria:'',
  user_work:'',
  user_education:'',
  Domicile:'',
  basicInfo:'',
 
};


export default (state = INIT_STATE, action) => {
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
      return {
        ...state,
        loader: false,
        verify_mobile: action.payload,
     
      }
    }
    case VERIFY_OTP_SUCCESS: {
   
      return {
        ...state,
        loader: false,
        OTP: action.payload,
     
      }
    }
    case USER_CRITERIA_SUCCESS: {
   
      return {
        ...state,
        loader: false,
        criteria: action.payload,
     
      }
    }
    case USER_WORK_SUCCESS: {
   
      return {
        ...state,
        loader: false,
        user_work: action.payload,
     
      }
    }
   case USER_EDUCATION_SUCCESS: {
   
      return {
        ...state,
        loader: false,
        user_education: action.payload,
     
      }
    }
    case USER_DOMICILE_SUCCESS: {
   
      return {
        ...state,
        loader: false,
        Domicile: action.payload,
     
      }
    }
    case UPDATE_BASIC_SUCCESS: {
   
      return {
        ...state,
        loader: false,
        basicInfo: action.payload,
     
      }
    }
   
    default:
      return state;
  }
}
